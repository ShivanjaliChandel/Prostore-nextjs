import './globals.css'
import type { Metadata } from 'next'
import { ReactNode } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Toaster } from '@/components/ui/sonner'
import { SessionProvider } from 'next-auth/react'

export const metadata: Metadata = {
  title: 'My Next App',
  description: 'An awesome project',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <SessionProvider>
        {children}
        </SessionProvider>
        <Toaster/>
        <Footer /> 
      </body>
    </html>
  )
}
