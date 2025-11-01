'use client'

import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface AdminHeaderProps {
  isAuthenticated: boolean
}

export default function AdminHeader({ isAuthenticated }: AdminHeaderProps) {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      })

      if (response.ok) {
        toast.success('Logged out successfully')
        // Use window.location for full page reload and cache clear
        window.location.href = '/admin/login'
      } else {
        toast.error('Failed to logout')
      }
    } catch (error) {
      console.error('Logout error:', error)
      toast.error('An error occurred during logout')
    }
  }

  return (
    <header className="glass-effect border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="group relative px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 bg-gradient-to-r from-red-500 to-pink-600 text-white hover:from-red-600 hover:to-pink-700 shadow-lg hover:shadow-red-500/50 transform hover:scale-105 active:scale-95"
            >
              <span className="flex items-center gap-2">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 transition-transform group-hover:translate-x-1" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" 
                    clipRule="evenodd" 
                  />
                </svg>
                Logout
              </span>
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
