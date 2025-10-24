'use client'

import { useEffect, useState } from 'react'
import Hero from '@/components/public/Hero'
import AboutSection from '@/components/public/AboutSection'
import SkillsSection from '@/components/public/SkillsSection'
import ProjectGrid from '@/components/public/ProjectGrid'
import Link from 'next/link'
import { Project } from '@/types'

export default function HomePage() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/projects?featured=true')
      .then((res) => res.json())
      .then((data) => {
        setFeaturedProjects(data.slice(0, 3))
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching featured projects:', error)
        setLoading(false)
      })
  }, [])

  return (
    <>
      <Hero />
      <AboutSection />
      <SkillsSection />
      
      {/* Featured Projects */}
      <section className="py-20 bg-white dark:bg-gray-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Check out some of my best work
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 dark:bg-gray-700 h-48 rounded-t-lg"></div>
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-b-lg space-y-3">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <ProjectGrid projects={featuredProjects} />
              <div className="text-center mt-12">
                <Link
                  href="/projects"
                  className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  View All Projects
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 dark:bg-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Let's Work Together
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Have a project in mind? Let's create something amazing together.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium shadow-lg"
          >
            Get In Touch
          </Link>
        </div>
      </section>
    </>
  )
}
