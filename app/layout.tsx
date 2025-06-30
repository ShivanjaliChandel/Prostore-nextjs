import './globals.css'
import type { Metadata } from 'next'
import { ReactNode } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CartProvider } from './context/cartContext'
import { Toaster } from '@/components/ui/sonner'


export const metadata: Metadata = {
  title: 'My Next App',
  description: 'An awesome project',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
     
     <CartProvider>{children}</CartProvider>
     <Toaster/>
        
         <Footer /> 
      </body>
    </html>
  )
}
