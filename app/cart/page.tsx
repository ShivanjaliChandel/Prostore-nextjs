import CartTable from "./cart-table";
import { getMycart } from "@/lib/actions/cart.actions";
import { Cart } from "@/types";

const CartPage = async () => {
  const cartData = await getMycart();
  
  // Transform the cart data to match the expected Cart type
  const cart: Cart | undefined = cartData ? {
    items: cartData.Items,
    itemsprice: cartData.ItemsPrice,
    totalPrice: cartData.totalPrice,
    shippingPrice: cartData.shippingPrice,
    taxPrice: cartData.taxPrice,
    sessionCartId: cartData.sessionCartId,
    userId: cartData.userId,
  } : undefined;
  
  return (
    <section className="p-6">
      <div className="max-w-4xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        
        {cart ? (
          <CartTable cart={cart} />
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">Your cart is empty</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default CartPage;

