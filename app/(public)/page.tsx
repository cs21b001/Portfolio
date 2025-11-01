'use client'

import { useEffect, useState } from 'react'
import Hero from '@/components/public/Hero'
import AboutSection from '@/components/public/AboutSection'
import SkillsSection from '@/components/public/SkillsSection'
import ProjectGrid from '@/components/public/ProjectGrid'
import CodeBackground from '@/components/public/CodeBackground'
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
      
      {/* About Section with code background */}
      <div id="about-section" className="relative gradient-animated py-20">
        <CodeBackground />
        <AboutSection />
      </div>
      
      {/* Skills Section with code background */}
      <div className="relative gradient-animated py-20">
        <CodeBackground />
        <SkillsSection />
      </div>
      
      {/* Featured Projects */}
      <section className="relative py-20 gradient-animated">
        <CodeBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-300 dark:to-purple-300 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Check out some of my best work
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse glass glass-noise rounded-2xl p-6">
                  <div className="glass-strong h-48 rounded-xl mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-6 glass-strong rounded"></div>
                    <div className="h-4 glass rounded w-5/6"></div>
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
                  className="inline-flex items-center gap-2 glass-strong glass-hover rounded-xl px-8 py-4 text-gray-900 dark:text-white font-medium shadow-lg group transition-all"
                >
                  View All Projects
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 gradient-animated relative overflow-hidden">
        <CodeBackground />
        
        {/* Floating orbs for effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2]">
          <div className="absolute top-10 left-10 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="glass glass-noise rounded-3xl p-12 shadow-2xl">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-300 dark:to-purple-300 bg-clip-text text-transparent">
              Let's Work Together
            </h2>
            <p className="text-xl text-gray-800 dark:text-white/90 mb-8">
              Have a project in mind? Let's create something amazing together.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 glass-strong glass-hover rounded-xl px-8 py-4 text-gray-900 dark:text-white font-medium shadow-lg group transition-all"
            >
              Get In Touch
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
