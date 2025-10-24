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
    <>
      <Header />
      <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
        {children}
      </main>
      <Footer />
      <Toaster position="bottom-right" />
    </>
  )
}
