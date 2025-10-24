'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { About, Skill } from '@/types'

export default function AboutPage() {
  const [about, setAbout] = useState<About | null>(null)
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/about').then((res) => res.json()),
      fetch('/api/skills').then((res) => res.json()),
    ])
      .then(([aboutData, skillsData]) => {
        setAbout(aboutData)
        setSkills(skillsData)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
        setLoading(false)
      })
  }, [])

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="animate-pulse space-y-8">
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-8">
        {about?.title || 'About Me'}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
        <div className="lg:col-span-2">
          <p className="text-lg text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
            {about?.description}
          </p>
        </div>

        <div className="space-y-6">
          {about?.profile_image_url && (
            <div className="relative h-80 rounded-lg overflow-hidden shadow-xl">
              <img
                src={about.profile_image_url}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {about?.resume_url && (
            <a
              href={about.resume_url}
              download
              className="block w-full px-6 py-3 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md"
            >
              Download Resume
            </a>
          )}
        </div>
      </div>

      {/* Skills Section */}
      <div className="mt-20">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12">
          Skills & Expertise
        </h2>

        <div className="space-y-12">
          {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
            <div key={category}>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
                {category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categorySkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
                  >
                    <div className="flex items-center mb-3">
                      {skill.icon_url && (
                        <span className="text-3xl mr-3">{skill.icon_url}</span>
                      )}
                      <h4 className="font-medium text-gray-900 dark:text-white text-lg">
                        {skill.name}
                      </h4>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div
                        className="bg-blue-600 h-3 rounded-full transition-all"
                        style={{ width: `${skill.proficiency}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-right">
                      {skill.proficiency}%
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
