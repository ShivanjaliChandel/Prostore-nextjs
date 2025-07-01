import { auth } from "../auth";
import { getMycart } from "@/lib/actions/cart.actions";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { ShippingAddress } from "@/types";
import { getUserById } from "@/lib/actions/user.actions";
import ShippingAddressForm from "./shipping-address-form";


export const metadata:Metadata = {
    title:'Shipping Address',
    description:'Shipping Address',
}

const shippingAddressPage = async () => {
    const session = await auth();
    if(!session?.user) redirect('/sign-in');

    const cart = await getMycart();
    if(!cart) redirect('/cart');
    const userId = session?.user.id;
    
    if(!userId) redirect('/sign-in');

    const user = await getUserById(userId);
    
    return (
        <ShippingAddressForm address={user.address as ShippingAddress} />
    )
}

export default shippingAddressPage;