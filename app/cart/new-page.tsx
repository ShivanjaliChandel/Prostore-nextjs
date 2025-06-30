'use client';
// import { useCart } from '@/app/context/cartContext';
import { useCart } from "../context/cartContext";
import Image from "next/image";
import CartTable from "./cart-table";

export default function CartPage() {
  const { cart , removeFromCart } = useCart();

  if (cart.length === 0) {
    return <p className="p-6">Your cart is empty.</p>;
  }
  

  return (
    <section className="p-6">
      <div className="max-w-4xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

       {cart.map(item => (
          <div key={item.id} className="border p-4 rounded shadow flex gap-4 items-center">
            <Image 
              src={item.image} 
              alt={item.title} 
              width={80}
              height={80}
              className="object-contain" 
            />
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-gray-600">${item.price} × {item.quantity}</p>
               
               <button
                onClick={() => removeFromCart(item.id)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
             remove         
              </button>


              <p className="text-gray-900 font-bold">
                Total: ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))} 
      </div>
    </section>
  );
}
