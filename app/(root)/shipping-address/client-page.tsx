"use client";
import { SessionProvider } from "next-auth/react";
import ShippingAddressForm from "./shipping-address-form";

export default function ShippingAddressClientPage({ address }: { address: any }) {
  return (
    <SessionProvider>
      <ShippingAddressForm address={address} />
    </SessionProvider>
  );
} 