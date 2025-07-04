'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShippingAddress } from "@/types";
import { shippingAddressSchema } from "@/lib/constants/validators";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { saveShippingAddress } from "@/lib/actions/user.actions";
import { useSession } from "next-auth/react";

interface ShippingAddressFormProps {
  address?: ShippingAddress;
  onSubmit?: (data: ShippingAddress) => void;
}

const ShippingAddressForm = ({ address, onSubmit }: ShippingAddressFormProps) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ShippingAddress>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: address || {
      fullName: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
      lat: null,
      lng: null,
    },
  });

  const handleSubmit = async (data: ShippingAddress) => {
    try {
      setIsSubmitting(true);
      
      if (onSubmit) {
        await onSubmit(data);
      } else {
        // Save to database if user is authenticated
        if (session?.user?.id) {
          const result = await saveShippingAddress(session.user.id, data);
          if (result.success) {
            toast.success("Shipping address saved successfully!");
            router.push('/cart'); // Redirect to cart or checkout
          } else {
            toast.error(result.error || "Failed to save shipping address");
          }
        } else {
          // Fallback to localStorage for unauthenticated users
          localStorage.setItem('shippingAddress', JSON.stringify(data));
          toast.success("Shipping address saved successfully!");
          router.push('/cart');
        }
      }
    } catch (error) {
      toast.error("Failed to save shipping address. Please try again.");
      console.error('Error saving shipping address:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Shipping Address</h1>
        <p className="text-gray-600">Please provide your shipping address for delivery.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter your full name" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter your street address" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your city" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal Code</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter postal code" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter your country" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4 pt-4">
            <Button 
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="flex-1"
            >
              Back
            </Button>
            <Button 
              type="submit"
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? "Saving..." : "Save Address"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ShippingAddressForm;