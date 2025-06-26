'use client'

import Image from 'next/image'

export default function Banner() {
  return (
    <section className="relative w-full h-[300px] md:h-[500px] overflow-hidden">
      <Image
        src="/banner-1.jpg" // ✅ Make sure this matches your image name in public/
        alt="Main Banner"
        fill
        priority
        className="object-cover"
      />
      {/* Optional Overlay Text */}
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 text-white text-2xl md:text-4xl font-bold">
        Welcome to Our Store
      </div>
    </section>
  )
}

