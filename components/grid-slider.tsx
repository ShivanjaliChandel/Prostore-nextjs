'use client';

import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export default function Gridslider() {
  const [products, setProducts] = useState<Product[]>([]);
const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
  loop: true,
  mode: 'snap',
  renderMode: 'performance',
  rubberband: false,
  dragSpeed: 1,
  defaultAnimation: {
    duration: 60,
    easing: (t) => t * (2 - t), // smooth ease-out
  },
  slides: { perView: 5, spacing: 10 },
  breakpoints: {
    '(max-width: 768px)': {
      slides: { perView: 1 },
    },
  },
});


  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data: Product[]) => {
        setProducts(data);
        setTimeout(() => {
          slider.current?.update();
        }, 100);
      });
  }, [slider]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Featured Products</h1>

      <div className="relative">
        {/* Arrows */}
        <button
          onClick={() => slider.current?.prev()}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => slider.current?.next()}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100"
        >
          <ChevronRight />
        </button>

        {/* Slider */}
        <div ref={sliderRef} className="keen-slider">
          {products.map((product) => (
            <div
              key={product.id}
              className="keen-slider__slide border p-4 rounded-lg shadow hover:shadow-md transition bg-white"
            >
              <div className="w-full h-48 flex items-center justify-center mb-4">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={150}
                  height={150}
                  className="object-contain h-full w-auto"
                />
              </div>
              <h2 className="text-lg font-semibold mb-1">{product.title}</h2>
              <p className="text-gray-600 font-medium">${product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
