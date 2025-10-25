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
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass glass-noise rounded-3xl p-12 animate-pulse">
            <div className="h-10 glass-strong rounded-xl w-1/4 mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 glass rounded-lg"></div>
              <div className="h-4 glass rounded-lg w-5/6"></div>
              <div className="h-4 glass rounded-lg w-4/6"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (!about) return null

  return (
    <section className="relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="glass glass-noise rounded-3xl p-12 shadow-2xl">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-300 dark:to-purple-300 bg-clip-text text-transparent">
            {about.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {about.profile_image_url && (
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative h-96 rounded-2xl overflow-hidden glass border border-gray-900/20 dark:border-white/20">
                  <img
                    src={about.profile_image_url}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
            <div className={!about.profile_image_url ? 'md:col-span-2' : ''}>
              <p className="text-lg text-gray-800 dark:text-white/90 mb-8 whitespace-pre-wrap leading-relaxed">
                {about.description.substring(0, 500)}
                {about.description.length > 500 && '...'}
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 glass-strong glass-hover rounded-xl px-8 py-4 text-gray-900 dark:text-white font-medium text-lg shadow-lg group transition-all"
              >
                Learn More About Me
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
