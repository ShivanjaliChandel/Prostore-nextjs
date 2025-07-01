// app/products/[id]/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Product, CartItem } from '@/types';
import AddToCart from '../add-to-cart';
import { getMycart } from '@/lib/actions/cart.actions';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch product from your API instead of fakestoreapi
        const productRes = await fetch(`/api/products/${id}`);
        if (productRes.ok) {
          const productData = await productRes.json();
          setProduct(productData);
        }
        
        // Fetch cart
        const cartData = await getMycart();
        setCart(cartData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!product) return <p className="p-6">Product not found</p>;

  // Check if item is in cart
  const isInCart = cart?.Items?.some((item: CartItem) => item.productId === product.id);

  return (
    <section className="p-6">
      <div className="max-w-3xl mx-auto border rounded-2xl shadow p-6">
        <Image 
          src={product.images[0] || '/images/placeholder.jpg'} 
          alt={product.name} 
          width={600}
          height={240}
          className="w-full h-60 object-contain mb-4" 
        />
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 text-xl mb-2">${product.price}</p>
          <p className="text-gray-500 mb-4">Product details</p>
          
          <AddToCart 
            item={{
              productId: product.id,
              name: product.name,
              slug: product.slug,
              qty: 1,
              image: product.images[0] || '',
              price: product.price.toString()
            }}
            cart={cart}
            isInCart={isInCart}
          />
        </div>
      </div>
    </section>
  );
}



