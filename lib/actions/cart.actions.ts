'use server';
import { cookies } from 'next/headers';
import { formatError, convertToPlainObject } from '../utils';
import { auth } from '@/app/(root)/auth';
import { CartItem } from '@/types';
import { cartItemSchema , insertcartSchema} from '../constants/validators';
import { prisma } from '@/db/prisma';
import { revalidatePath } from 'next/cache';

// Helper function to round to 2 decimal places
const round2 = (num: number) => Math.round(num * 100) / 100;

//calculate cart prices
const calcPrice = (items: CartItem[]) => {
    const itemsPrice = round2(items.reduce((total, item) => total + Number(item.price) * item.qty, 0)),
     shippingPrice = round2(itemsPrice > 100 ? 0 : 10),
     taxPrice = round2(itemsPrice * 0.15),
     totalPrice = round2(itemsPrice + shippingPrice + taxPrice);
    return {
        itemsprice: itemsPrice.toFixed(2), 
        shippingPrice: shippingPrice.toFixed(2), 
        taxPrice: taxPrice.toFixed(2), 
        totalPrice: totalPrice.toFixed(2)
    }
}

export async function addItemToCart(data: CartItem) {
    try {
        const sessionCartId = (await cookies()).get('sessionCartId')?.value;
        if (!sessionCartId) throw new Error('cart session not found');

        //get session user id
        const session = await auth();
        const userId = session?.user?.id ? (session?.user.id as string) : undefined;

        // parse and validate item
        const item = cartItemSchema.parse(data);

        //find product in database
        const product = await prisma.product.findFirst({
            where: { id: item.productId },
        })
        if(!product) throw new Error('product not found');

        //get user cart from database
        let cart = await prisma.cart.findFirst({
            where: userId ? { userId: userId } : { sessionCartId: sessionCartId }
        });

        if (!cart) {
            // create new cart if it doesn't exist
            const prices = calcPrice([item]);
            
            const newCart = insertcartSchema.parse({
                userId: userId,
                items: [item],
                sessionCartId: sessionCartId,
                ...prices,
            });

            cart = await prisma.cart.create({
                data: {
                    userId: newCart.userId,
                    sessionCartId: newCart.sessionCartId,
                    Items: newCart.items,
                    ItemsPrice: newCart.itemsprice,
                    totalPrice: newCart.totalPrice,
                    shippingPrice: newCart.shippingPrice,
                    taxPrice: newCart.taxPrice,
                }
            });

            // revalidate product page 
            revalidatePath(`/products/${product.slug}`);
            
            return {
                success: true,
                message: `${product.name} added to cart`,
                cart: convertToPlainObject(cart)
            };
        } else {
            // Update existing cart
            //ceck if iyem is alreday in cart
            const existingItems = cart.Items as CartItem[];
            const existingItemIndex = existingItems.findIndex(
                (existingItem) => existingItem.productId === item.productId
            );

            if (existingItemIndex > -1) {
                // Update quantity if item already exists
                existingItems[existingItemIndex].qty += item.qty;
            } else {
                // Add new item
                existingItems.push(item);
            }

            const prices = calcPrice(existingItems);

            cart = await prisma.cart.update({
                where: { id: cart.id },
                data: {
                    Items: existingItems,
                    ItemsPrice: prices.itemsprice,
                    totalPrice: prices.totalPrice,
                    shippingPrice: prices.shippingPrice,
                    taxPrice: prices.taxPrice,
                }
            });

            // revalidate product page 
            revalidatePath(`/products/${product.slug}`);
            
            return {
                success: true,
                message: 'Item added to cart',
                cart: convertToPlainObject(cart)
            };
        }
    } catch (error) {
        return {
            success: false,
            message: formatError(error),
        }
    }
}

export async function getMycart() {
    try {
        const sessionCartId = (await cookies()).get('sessionCartId')?.value;
        if (!sessionCartId) throw new Error('cart session not found');

        //get session and user id
        const session = await auth();
        const userId = session?.user?.id ? (session?.user.id as string) : undefined;

        // get user cart from database 
        const cart = await prisma.cart.findFirst({
            where: userId ? { userId: userId } : { sessionCartId: sessionCartId }
        });
        
        if (!cart) return undefined;

        //convert decimal and return
        return convertToPlainObject({
            ...cart,
            Items: cart.Items as CartItem[],
            ItemsPrice: cart.ItemsPrice.toString(),
            totalPrice: cart.totalPrice.toString(),
            shippingPrice: cart.shippingPrice.toString(),
            taxPrice: cart.taxPrice.toString(),
        });
    } catch (error) {
        console.error('Error getting cart:', error);
        return undefined;
    }
}


export async function removeItemFromCart(itemId:string){
    try{
        const sessionCartId = (await cookies()).get('sessionCartId')?.value;
        if(!sessionCartId) throw new Error('cart session not found');
        
        //get session user id
        const session = await auth();
        const userId = session?.user?.id ? (session?.user.id as string) : undefined;

        //get user cart from database
        const cart = await prisma.cart.findFirst({
            where: userId ? { userId: userId } : { sessionCartId: sessionCartId }
        });
        if(!cart) throw new Error('cart not found');
        
        //remove item from cart
        const existingItems = cart.Items as CartItem[];
        const deletedItem = existingItems.find((item)=>item.productId === itemId);
        const updatedItems = existingItems.filter((item)=>item.productId !== itemId);

        if (!deletedItem) throw new Error('item not found in cart');

        const prices = calcPrice(updatedItems);

        await prisma.cart.update({
            where:{id:cart.id},
            data:{
                Items:updatedItems,
                ItemsPrice: prices.itemsprice,
                totalPrice: prices.totalPrice,
                shippingPrice: prices.shippingPrice,
                taxPrice: prices.taxPrice,
            }
        });
        
        // revalidate cart page 
        revalidatePath(`/cart`);
            
        return {
            success:true,
            message:`${deletedItem.name} removed from cart`,
            cart: convertToPlainObject({
                ...cart,
                Items: updatedItems,
                ItemsPrice: prices.itemsprice,
                totalPrice: prices.totalPrice,
                shippingPrice: prices.shippingPrice,
                taxPrice: prices.taxPrice,
            })
        }

    } catch (error){
        return {
            success:false,
            message:formatError(error)
        }
    }
}

export async function updateItemQuantity(itemId: string, newQty: number) {
    try {
        const sessionCartId = (await cookies()).get('sessionCartId')?.value;
        if (!sessionCartId) throw new Error('cart session not found');

        //get session user id
        const session = await auth();
        const userId = session?.user?.id ? (session?.user.id as string) : undefined;

        // Validate quantity
        if (newQty <= 0) {
            return await removeItemFromCart(itemId);
        }

        //get user cart from database
        const cart = await prisma.cart.findFirst({
            where: userId ? { userId: userId } : { sessionCartId: sessionCartId }
        });

        if (!cart) throw new Error('cart not found');

        // Update item quantity
        const existingItems = cart.Items as CartItem[];
        const itemIndex = existingItems.findIndex(
            (item) => item.productId === itemId
        );

        if (itemIndex === -1) throw new Error('item not found in cart');

        existingItems[itemIndex].qty = newQty;

        // Update cart with new prices
        const prices = calcPrice(existingItems);

        const updatedCart = await prisma.cart.update({
            where: { id: cart.id },
            data: {
                Items: existingItems,
                ItemsPrice: prices.itemsprice,
                totalPrice: prices.totalPrice,
                shippingPrice: prices.shippingPrice,
                taxPrice: prices.taxPrice,
            }
        });

        // revalidate cart page
        revalidatePath('/cart');
        revalidatePath('/products');

        return {
            success: true,
            message: 'Quantity updated',
            cart: convertToPlainObject(updatedCart)
        };
    } catch (error) {
        return {
            success: false,
            message: formatError(error),
        }
    }
}

export async function decreaseItemQuantity(itemId: string) {
    try {
        const sessionCartId = (await cookies()).get('sessionCartId')?.value;
        if (!sessionCartId) throw new Error('cart session not found');

        //get session user id
        const session = await auth();
        const userId = session?.user?.id ? (session?.user.id as string) : undefined;

        //get user cart from database
        const cart = await prisma.cart.findFirst({
            where: userId ? { userId: userId } : { sessionCartId: sessionCartId }
        });

        if (!cart) throw new Error('cart not found');

        // Find and decrease item quantity
        const existingItems = cart.Items as CartItem[];
        const itemIndex = existingItems.findIndex(
            (item) => item.productId === itemId
        );

        if (itemIndex === -1) throw new Error('item not found in cart');

        const currentQty = existingItems[itemIndex].qty;
        
        if (currentQty <= 1) {
            // Remove item if quantity would be 0 or less
            return await removeItemFromCart(itemId);
        }

        existingItems[itemIndex].qty = currentQty - 1;

        // Update cart with new prices
        const prices = calcPrice(existingItems);

        const updatedCart = await prisma.cart.update({
            where: { id: cart.id },
            data: {
                Items: existingItems,
                ItemsPrice: prices.itemsprice,
                totalPrice: prices.totalPrice,
                shippingPrice: prices.shippingPrice,
                taxPrice: prices.taxPrice,
            }
        });

        // revalidate cart page
        revalidatePath('/cart');
        revalidatePath('/products');

        return {
            success: true,
            message: 'Quantity decreased',
            cart: convertToPlainObject(updatedCart)
        };
    } catch (error) {
        return {
            success: false,
            message: formatError(error),
        }
    }
}

export default addItemToCart;