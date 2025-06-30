'use client';
import { Button } from "@/components/button";
import { useRouter } from "next/navigation";
import { Cart, CartItem } from "@/types";
import { Plus, Minus } from "lucide-react";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { toast } from "sonner";

interface AddToCartProps {
  item: CartItem;
  cart?: any; // Using any for now since the cart structure from getMycart doesn't match the Cart type exactly
  isInCart: boolean;
}

const AddToCart = ({ item, cart, isInCart }: AddToCartProps) => {
  const router = useRouter();

  const handleAddToCart = async () => {
    try {
      const res = await addItemToCart(item);

      if (res.success) {
        toast.success(`${item.name} added to cart!`);
        router.refresh();
      } else {
        toast.error("Failed to add to cart.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    }
  };

  const handleRemoveFromCart = async () => {
    try {
      const res = await removeItemFromCart(item.productId);
      if (res.success) {
        toast.success(`${item.name} removed from cart!`);
        router.refresh();
      } else {
        toast.error("Failed to remove from cart.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    }
  };

  // Find existing item in cart - using Items since that's what getMycart returns
  const existingItem = cart?.Items?.find((cartItem: any) => cartItem.productId === item.productId);

  return existingItem ? (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="icon" onClick={handleRemoveFromCart}>
        <Minus />
      </Button>
      <span>{existingItem.qty}</span>
      <Button variant="outline" size="icon" onClick={handleAddToCart}>
        <Plus />
      </Button>
    </div>
  ) : (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      <Plus /> Add to Cart
    </Button>
  );
};

export default AddToCart;