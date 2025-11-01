'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

export default function AdminHeader() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(true) // Default to true for admin pages

  useEffect(() => {
    // Check authentication status
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/session')
        if (response.ok) {
          const data = await response.json()
          setIsLoggedIn(data.authenticated || false)
        } else {
          setIsLoggedIn(false)
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        setIsLoggedIn(false)
      }
    }
    checkAuth()
  }, [])

  const handleAuthAction = async () => {
    if (isLoggedIn) {
      // Logout
      try {
        const response = await fetch('/api/auth/logout', {
          method: 'POST',
        })

        if (response.ok) {
          toast.success('Logged out successfully')
          setIsLoggedIn(false)
          // Use window.location for full page reload and cache clear
          window.location.href = '/admin/login'
        } else {
          toast.error('Failed to logout')
        }
      } catch (error) {
        console.error('Logout error:', error)
        toast.error('An error occurred during logout')
      }
    } else {
      // Redirect to login
      window.location.href = '/admin/login'
    }
  }

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Admin Dashboard
        </h1>
        <button
          onClick={handleAuthAction}
          className={`px-4 py-2 rounded-lg transition-colors font-medium ${
            isLoggedIn 
              ? 'bg-red-600 text-white hover:bg-red-700' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isLoggedIn ? 'Logout' : 'Login'}
        </button>
      </div>
    </header>
  )
}
