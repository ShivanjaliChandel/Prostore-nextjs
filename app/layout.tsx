import './globals.css'
import type { Metadata } from 'next'
import { ReactNode } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CartProvider } from './context/cartContext'



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
        
         <Footer /> 
      </body>
    </html>
  )
}
