'use client'

import { Experience } from '@/types'
import { formatDateRange } from '@/lib/utils'

interface ExperienceTimelineProps {
  experiences: Experience[]
}

export default function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  return (
    <div className="relative">
      {/* Timeline line with glass effect */}
      <div className="absolute left-8 top-0 bottom-0 w-1 glass-strong rounded-full shadow-lg"></div>

      <div className="space-y-12">
        {experiences.map((experience, index) => (
          <div key={experience.id} className="relative pl-20 group">
            {/* Timeline dot with glow animation */}
            <div className="absolute left-6 top-2 w-5 h-5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 ring-4 ring-white/10 shadow-lg shadow-blue-500/50 group-hover:scale-125 group-hover:animate-glow transition-transform"></div>

            <div className="glass glass-hover glass-noise rounded-2xl p-8 shadow-xl transition-all">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                  {experience.position}
                </h3>
                <span className="glass-strong rounded-full px-4 py-1.5 text-sm text-gray-800 dark:text-white/80 mt-2 md:mt-0 inline-flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {formatDateRange(
                    experience.start_date,
                    experience.end_date,
                    experience.is_current
                  )}
                </span>
              </div>

              <p className="text-lg font-medium bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-2">
                {experience.company}
              </p>

              {experience.location && (
                <p className="text-sm text-gray-700 dark:text-white/70 mb-4 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {experience.location}
                </p>
              )}

              <p className="text-gray-800 dark:text-white/90 whitespace-pre-wrap leading-relaxed">
                {experience.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
