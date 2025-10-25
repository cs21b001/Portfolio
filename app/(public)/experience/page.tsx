'use client'

import { useEffect, useState } from 'react'
import ExperienceTimeline from '@/components/public/ExperienceTimeline'
import CodeBackground from '@/components/public/CodeBackground'
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
    <div className="relative overflow-hidden">
      {/* Code Animation Background */}
      <CodeBackground />
      
      {/* Floating orbs for depth */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2]">
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-400/30 dark:bg-blue-600/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-400/30 dark:bg-purple-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
      </div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-300 dark:to-purple-300 bg-clip-text text-transparent">
            Work Experience
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            My professional journey and career highlights
          </p>
        </div>

        {loading ? (
          <div className="space-y-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse glass glass-noise rounded-2xl p-8">
                <div className="h-6 glass-strong rounded w-1/2 mb-4"></div>
                <div className="h-4 glass rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : experiences.length === 0 ? (
          <div className="text-center py-12 glass glass-noise rounded-2xl">
            <p className="text-gray-600 dark:text-gray-400">
              No work experience added yet.
            </p>
          </div>
        ) : (
          <ExperienceTimeline experiences={experiences} />
        )}
      </div>
    </div>
  )
}
