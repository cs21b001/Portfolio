'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function AdminSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: '📊' },
    { href: '/admin/about', label: 'About', icon: '👤' },
    { href: '/admin/skills', label: 'Skills', icon: '💡' },
    { href: '/admin/projects', label: 'Projects', icon: '🚀' },
    { href: '/admin/experience', label: 'Experience', icon: '💼' },
    { href: '/admin/social', label: 'Social Links', icon: '🔗' },
    { href: '/admin/messages', label: 'Messages', icon: '✉️' },
  ]

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="lg:hidden fixed bottom-4 right-4 z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg"
      >
        {isCollapsed ? '→' : '←'}
      </button>

      <aside
        className={`fixed left-0 top-0 h-full bg-gray-900 text-white transition-all duration-300 z-40 ${
          isCollapsed ? '-translate-x-full lg:translate-x-0 lg:w-20' : 'w-64'
        }`}
      >
        <div className="p-6">
          <Link href="/admin" className="flex items-center space-x-2">
            <span className="text-2xl">⚡</span>
            {!isCollapsed && (
              <span className="text-xl font-bold">Admin</span>
            )}
          </Link>
        </div>

        <nav className="mt-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-6 py-3 transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {!isCollapsed && (
                  <span className="ml-3">{item.label}</span>
                )}
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-800">
          <Link
            href="/"
            className={`flex items-center text-gray-400 hover:text-white transition-colors ${
              isCollapsed ? 'justify-center' : ''
            }`}
          >
            <span className="text-xl">🏠</span>
            {!isCollapsed && <span className="ml-3">View Site</span>}
          </Link>
        </div>
      </aside>
    </>
  )
}
