'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { addItemToCart } from '@/lib/actions/cart.actions';
import { toast } from 'sonner';

export default function CollectionPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('https://fakestoreapi.com/products/category/jewelery');
      const data = await res.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (product: Product) => {
    try {
      const cartItem = {
        productId: product.id,
        name: product.name,
        slug: product.slug,
        qty: 1,
        image: product.images[0],
        price: product.price.toString()
      };

      const result = await addItemToCart(cartItem);
      
      if (result.success) {
        toast.success(`${product.name} added to cart!`);
        router.push('/cart');
      } else {
        toast.error("Failed to add to cart.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <section className="p-6">
      <h1 className="text-3xl font-bold mb-6">Our Collection</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-2xl shadow p-4 hover:shadow-lg transition cursor-pointer">
            <Link href={`/products/${product.id}`}>
              <Image
                src={product.images[0]}
                alt={product.name}
                width={300}
                height={160}
                className="w-full h-40 object-contain mb-4"
              />
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-600">${product.price}</p>
            </Link>
            <button
              onClick={() => handleAddToCart(product)}
              className="px-4 py-2 mt-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
