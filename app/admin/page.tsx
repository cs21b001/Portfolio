'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import DashboardStats from '@/components/admin/DashboardStats'
import { DashboardStats as StatsType, ContactMessage } from '@/types'

export default function AdminDashboard() {
  const [stats, setStats] = useState<StatsType>({
    totalProjects: 0,
    featuredProjects: 0,
    totalSkills: 0,
    totalExperiences: 0,
    unreadMessages: 0,
    totalMessages: 0,
  })
  const [recentMessages, setRecentMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/projects').then((res) => res.json()),
      fetch('/api/skills').then((res) => res.json()),
      fetch('/api/experience').then((res) => res.json()),
      fetch('/api/messages').then((res) => res.json()),
    ])
      .then(([projects, skills, experiences, messages]) => {
        setStats({
          totalProjects: projects.length,
          featuredProjects: projects.filter((p: any) => p.is_featured).length,
          totalSkills: skills.length,
          totalExperiences: experiences.length,
          unreadMessages: messages.filter((m: any) => !m.is_read).length,
          totalMessages: messages.length,
        })
        setRecentMessages(messages.slice(0, 5))
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching dashboard data:', error)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div className="p-6">Loading...</div>
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome Back!
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Here's what's happening with your portfolio
        </p>
      </div>

      <DashboardStats stats={stats} />

      {/* Quick Actions */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/projects/new"
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
          >
            <div className="text-4xl mb-2">🚀</div>
            <div className="font-medium text-gray-900 dark:text-white">
              Add Project
            </div>
          </Link>
          <Link
            href="/admin/skills/new"
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
          >
            <div className="text-4xl mb-2">💡</div>
            <div className="font-medium text-gray-900 dark:text-white">
              Add Skill
            </div>
          </Link>
          <Link
            href="/admin/experience/new"
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
          >
            <div className="text-4xl mb-2">💼</div>
            <div className="font-medium text-gray-900 dark:text-white">
              Add Experience
            </div>
          </Link>
          <Link
            href="/admin/about"
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
          >
            <div className="text-4xl mb-2">👤</div>
            <div className="font-medium text-gray-900 dark:text-white">
              Edit About
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Messages */}
      {recentMessages.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Recent Messages
            </h3>
            <Link
              href="/admin/messages"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              View All
            </Link>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {recentMessages.map((message) => (
                <div
                  key={message.id}
                  className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {message.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {message.email}
                      </p>
                    </div>
                    {!message.is_read && (
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>Subject:</strong> {message.subject}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    {new Date(message.created_at).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
