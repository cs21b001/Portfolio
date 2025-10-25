'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function AdminSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: '📊' },
    { href: '/admin/about', label: 'About', icon: '👤' },
    { href: '/admin/skills', label: 'Skills', icon: '💡' },
    { href: '/admin/projects', label: 'Projects', icon: '🚀' },
    { href: '/admin/experience', label: 'Experience', icon: '💼' },
    { href: '/admin/social', label: 'Social Links', icon: '🔗' },
    { href: '/admin/messages', label: 'Messages', icon: '✉️' },
  ]

  // Top 4 items for bottom navbar
  const bottomNavItems = navItems.slice(0, 4)

  return (
    <>
      {/* Mobile Bottom Navigation - Instagram/WhatsApp Style */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-50 safe-area-bottom">
        <div className="grid grid-cols-5 h-16">
          {bottomNavItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            )
          })}
          {/* More menu button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="flex flex-col items-center justify-center gap-1 text-gray-600 dark:text-gray-400"
          >
            <span className="text-2xl">☰</span>
            <span className="text-xs font-medium">More</span>
          </button>
        </div>
      </nav>

      {/* Mobile More Menu - Slides up from bottom */}
      {showMobileMenu && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setShowMobileMenu(false)}
          />
          <div className="lg:hidden fixed bottom-16 left-0 right-0 bg-white dark:bg-gray-900 rounded-t-3xl shadow-2xl z-50 animate-slide-up">
            <div className="p-4">
              <div className="w-12 h-1 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mb-6" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 px-2">More Options</h3>
              <div className="space-y-1">
                {navItems.slice(4).map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setShowMobileMenu(false)}
                      className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-colors ${
                        isActive
                          ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  )
                })}
                <Link
                  href="/"
                  onClick={() => setShowMobileMenu(false)}
                  className="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <span className="text-2xl">🏠</span>
                  <span className="font-medium">View Site</span>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Desktop Sidebar - Unchanged */}
      <aside
        className={`hidden lg:block fixed left-0 top-0 h-full bg-gray-900 text-white transition-all duration-300 z-40 ${
          isCollapsed ? 'w-20' : 'w-64'
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
