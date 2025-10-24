'use client'

import { Experience } from '@/types'
import { formatDateRange } from '@/lib/utils'

interface ExperienceTimelineProps {
  experiences: Experience[]
}

export default function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>

      <div className="space-y-12">
        {experiences.map((experience, index) => (
          <div key={experience.id} className="relative pl-20">
            {/* Timeline dot */}
            <div className="absolute left-6 top-2 w-4 h-4 rounded-full bg-blue-600 ring-4 ring-white dark:ring-gray-900"></div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {experience.position}
                </h3>
                <span className="text-sm text-gray-600 dark:text-gray-400 mt-1 md:mt-0">
                  {formatDateRange(
                    experience.start_date,
                    experience.end_date,
                    experience.is_current
                  )}
                </span>
              </div>

              <p className="text-lg font-medium text-blue-600 dark:text-blue-400 mb-1">
                {experience.company}
              </p>

              {experience.location && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  📍 {experience.location}
                </p>
              )}

              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {experience.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
