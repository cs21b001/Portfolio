import { DashboardStats as StatsType } from '@/types'

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
    },
    {
      label: 'Featured Projects',
      value: stats.featuredProjects,
      icon: '⭐',
      color: 'bg-yellow-500',
    },
    {
      label: 'Skills',
      value: stats.totalSkills,
      icon: '💡',
      color: 'bg-green-500',
    },
    {
      label: 'Experiences',
      value: stats.totalExperiences,
      icon: '💼',
      color: 'bg-purple-500',
    },
    {
      label: 'Unread Messages',
      value: stats.unreadMessages,
      icon: '✉️',
      color: 'bg-red-500',
    },
    {
      label: 'Total Messages',
      value: stats.totalMessages,
      icon: '📧',
      color: 'bg-indigo-500',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {statCards.map((card, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {card.label}
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {card.value}
              </p>
            </div>
            <div
              className={`${card.color} w-14 h-14 rounded-full flex items-center justify-center text-2xl`}
            >
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
