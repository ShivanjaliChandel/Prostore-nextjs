'use client';
import { useRouter } from "next/router";
import { ShippingAddress } from "@/types";

const ShippingAddressForm = ({address}:{address:ShippingAddress}) => {

    const router = useRouter();
    const toast = useToast();
    return (
        <div>
            <h1>Shipping Address Form</h1>
        </div>
    )
}

export default ShippingAddressForm;