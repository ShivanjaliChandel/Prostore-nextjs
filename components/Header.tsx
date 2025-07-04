// components/Header.tsx
// 'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, UserIcon } from 'lucide-react'
import UserButton from './shared/header/user-button'

export default function Header() {
  return (
    <header className="w-full px-6 py-4 bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-l mx-auto flex items-center justify-between">
        {/* ✅ Logo with Image */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.svg"         // ✅ logo file in public/
            alt="My Logo"
            width={40}              // ✅ change size as needed
            height={40}
            className="mr-2"
            priority                // ✅ optional for faster load
          />
        </Link>

        {/* Center Navigation */}
        <nav className="space-x-6 text-gray-700 font-medium">
          <Link href="/">Home</Link>
          <Link href="/collection">Collection</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        {/* Cart Icon */}
        <div>
          <Link href="/cart" className="relative">
            <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-blue-600" />
          </Link>
       
        </div>
         {/* <Link href='/sign-in'>
         <UserIcon>Sign in</UserIcon>
       </Link> */}
       <UserButton />
      </div>
    </header>
  )
}
