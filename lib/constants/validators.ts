import {z} from 'zod';
// import { formatNumberWithDecimal } from '../utils';
const currency = z
    .string()
    // .refine((value)=>/^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
// 'price must have exactly two decimal places')

//schema for inserting products 
export const insertProductSchema = z.object({
    name: z.string().min(3, 'Name must be atleast 3 characterstics'),
    slug: z.string().min(3, 'Name must be atleast 3 characterstics'),
    images:z.array(z.string()).min(1, 'product must have aleast one image'),
    isFeatured: z.boolean(),
    price:currency,
});

//schema for signing user in 

export const signInFormSchema = z.object({
    email: z.string().email('Invalid emial address'),
    password:z.string().min(6,'password must be atleast 6 characters'),
})

//schema for signing up in user 
export const signUpFormSchema = z.object({
    name: z.string().min(3,'Name mustbe atleast 3 characters'),
    email: z.string().email('Invalid emial address'),
    password:z.string().min(6,'password must be atleast 6 characters'),
    confirmPassword:z.string().min(6,'confirmpassword must be atleast 6 characters'),
}).refine((data)=>data.password === data.confirmPassword,{
    message:"password dont match",
    path:['confirmPassword'],
});

//cart schema
export const cartItemSchema = z.object({
    productId:z.string().min(1,'product is required'),
    name:z.string().min(1,'Name is required is required'),
    slug:z.string().min(1,'Slug is required is required'),
   qty:z.number().int().nonnegative('Quantity must be a positive'),
   image:z.string().min(1,'image is required'),
   price:currency
});

export const insertcartSchema = z.object({
    items:z.array(cartItemSchema),
    itemsprice:currency,
    totalPrice:currency,
    shippingPrice:currency,
    taxPrice:currency,
    sessionCartId:z.string().min(1,'Session cart id is required'),
    userId:z.string().optional().nullable(),

})


// schemaa for the shipping address
export const shippingAddressSchema = z.object({
    fullName:z.string().min(1,'Full name is required'),
    address:z.string().min(1,'Address is required'),
    city:z.string().min(1,'City is required'),
    postalCode:z.string().min(1,'Postal code is required'),
    country:z.string().min(1,'Country is required'),
})