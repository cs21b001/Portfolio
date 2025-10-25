'use client'

import { Toaster } from 'react-hot-toast'
import Header from '@/components/public/Header'
import Footer from '@/components/public/Footer'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen gradient-animated relative">
      <div className="relative z-10">
        <Header />
        <main className="relative">
          {children}
        </main>
        <Footer />
      </div>
      <Toaster position="bottom-right" />
    </div>
  )
}
