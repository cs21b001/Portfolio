import { DashboardStats as StatsType } from '@/types'
import Link from 'next/link'

interface DashboardStatsProps {
  stats: StatsType
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  const statCards = [
    {
      label: 'Total Projects',
      value: stats.totalProjects,
      icon: '🚀',
      color: 'bg-blue-500',
      link: '/admin/projects',
    },
    {
      label: 'Featured Projects',
      value: stats.featuredProjects,
      icon: '⭐',
      color: 'bg-yellow-500',
      link: '/admin/projects',
    },
    {
      label: 'Skills',
      value: stats.totalSkills,
      icon: '💡',
      color: 'bg-green-500',
      link: '/admin/skills',
    },
    {
      label: 'Experiences',
      value: stats.totalExperiences,
      icon: '💼',
      color: 'bg-purple-500',
      link: '/admin/experience',
    },
    {
      label: 'Unread Messages',
      value: stats.unreadMessages,
      icon: '✉️',
      color: 'bg-red-500',
      link: '/admin/messages',
    },
    {
      label: 'Total Messages',
      value: stats.totalMessages,
      icon: '📧',
      color: 'bg-indigo-500',
      link: '/admin/messages',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {statCards.map((card, index) => (
        <Link
          key={index}
          href={card.link}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors">
                {card.label}
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {card.value}
              </p>
            </div>
            <div
              className={`${card.color} w-14 h-14 rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}
            >
              {card.icon}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
