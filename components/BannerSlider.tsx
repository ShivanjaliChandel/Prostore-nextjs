'use client'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import Image from 'next/image'
import { useEffect } from 'react'

export default function BannerSlider() {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
  })

  const banners = [
    {
      src: '/banner-1.jpg',
      heading: 'Welcome to Our Store',
      subheading: 'Discover the latest arrivals tailored just for you.',
      href: '/shop',
    },
    {
      src: '/banner-2.jpg',
      heading: 'Summer Collection 2025',
      subheading: 'Fresh styles for the season. Don’t miss out.',
      href: '/summer',
    },
  ]

  // ✅ Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      instanceRef.current?.next()
    }, 4000)

    return () => clearInterval(interval)
  }, [instanceRef])

  return (
    <div ref={sliderRef} className="keen-slider relative w-full h-[300px] md:h-[500px] overflow-hidden">
      {banners.map((banner, index) => (
        <div className="keen-slider__slide relative" key={index}>
          {/* Banner Image */}
          <Image
            src={banner.src}
            alt={`Slide ${index + 1}`}
            fill
            priority={index === 0}
            className="object-cover"
          />

          {/* Text Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center bg-black/40 px-4">
            <h1 className="text-2xl md:text-5xl font-bold mb-3">{banner.heading}</h1>
            <p className="text-sm md:text-lg mb-5 max-w-xl">{banner.subheading}</p>
            <a
              href={banner.href}
              className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition"
            >
              Shop Now
            </a>
          </div>
        </div>
      ))}
    </div>
  )
}
