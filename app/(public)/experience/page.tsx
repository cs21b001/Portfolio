'use client'

import { useEffect, useState } from 'react'
import ExperienceTimeline from '@/components/public/ExperienceTimeline'
import { Experience } from '@/types'

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/experience')
      .then((res) => res.json())
      .then((data) => {
        setExperiences(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching experiences:', error)
        setLoading(false)
      })
  }, [])

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Work Experience
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          My professional journey and career highlights
        </p>
      </div>

      {loading ? (
        <div className="space-y-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : experiences.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">
            No work experience added yet.
          </p>
        </div>
      ) : (
        <ExperienceTimeline experiences={experiences} />
      )}
    </div>
  )
}
