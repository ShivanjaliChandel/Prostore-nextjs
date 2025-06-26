// app/products/[id]/page.tsx
'use client';
import { notFound } from 'next/navigation';
import { useCart } from '@/app/context/cartContext';
import { useEffect, useState } from 'react';
import { useParams , useRouter } from 'next/navigation';
import Link from 'next/link';
import { DeleteIcon } from 'lucide-react';

interface Product {
  id: number;
  title: string; 
  price: number;
  description: string;
  category: string;
  image: string;
}
export default function ProductPage() {
  const { id } = useParams();
    const router = useRouter(); 
  const { cart,addToCart ,removeFromCart  } = useCart();
  const [product, setProduct] = useState<Product | null>(null);


  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) return <p className="p-6">Loading...</p>;

    const isInCart = cart.some(item => item.id === product.id);
  const handleAddToCart = () => {
    addToCart(product);
    router.push('/cart'); // ← Navigate to cart page
  };
const handleRemoveFromCart = () => {
  removeFromCart(product.id);
};
    

  return (
    <section className="p-6">
      <div className="max-w-3xl mx-auto border rounded-2xl shadow p-6">
        <img src={product.image} alt={product.title} className="w-full h-60 object-contain mb-4" />
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-600 text-xl mb-2">${product.price}</p>
          <p className="text-gray-500 mb-4">{product.description}</p>
       <button
            onClick={handleAddToCart}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
         <DeleteIcon onClick = {handleRemoveFromCart} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-red-700 transition"></DeleteIcon>
            
        
        </div>
      </div>
    </section>
  );
}



