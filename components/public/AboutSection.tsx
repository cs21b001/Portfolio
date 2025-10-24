'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { About } from '@/types'

export default function AboutSection() {
  const [about, setAbout] = useState<About | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/about')
      .then((res) => res.json())
      .then((data) => {
        setAbout(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching about:', error)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <section className="py-20 bg-white dark:bg-gray-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-8"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (!about) return null

  return (
    <section className="py-20 bg-white dark:bg-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          {about.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {about.profile_image_url && (
            <div className="relative h-96 rounded-lg overflow-hidden">
              <img
                src={about.profile_image_url}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className={!about.profile_image_url ? 'md:col-span-2' : ''}>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 whitespace-pre-wrap">
              {about.description.substring(0, 500)}
              {about.description.length > 500 && '...'}
            </p>
            <Link
              href="/about"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Learn More About Me
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
