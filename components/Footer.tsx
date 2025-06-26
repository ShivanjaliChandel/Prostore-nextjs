'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-200 py-12">
      {/* <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8"> */}
      <div className="max-w-l mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* 1️⃣ Logo Block */}
        <div>
          <Image
            src="/logo.svg"
            alt="Logo"
            width={50}
            height={50}
            className="mb-4"
          />
          <p className="text-sm">
            &copy; {new Date().getFullYear()} MyCompany. All rights reserved.
          </p>
        </div>

        {/* 2️⃣ Navigation Block 1 */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about">About</Link></li>
            <li><Link href="/careers">Careers</Link></li>
            <li><Link href="/blog">Blog</Link></li>
          </ul>
        </div>

        {/* 3️⃣ Navigation Block 2 */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
            <li><Link href="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* 4️⃣ Newsletter Block */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Newsletter</h4>
          <p className="text-sm mb-3">Subscribe to get latest updates.</p>
          <form className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-auto flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition"
            >
              Subscribe
            </button>
          </form>
        </div>

      </div>
    </footer>
  )
}
