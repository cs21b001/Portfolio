'use client'

import { useEffect, useState } from 'react'
import ProjectGrid from '@/components/public/ProjectGrid'
import CodeBackground from '@/components/public/CodeBackground'
import { Project } from '@/types'

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTech, setSelectedTech] = useState<string>('all')

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        setProjects(data)
        setFilteredProjects(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching projects:', error)
        setLoading(false)
      })
  }, [])

  // Get all unique technologies
  const allTechnologies = Array.from(
    new Set(projects.flatMap((p) => p.technologies))
  ).sort()

  const handleFilterChange = (tech: string) => {
    setSelectedTech(tech)
    if (tech === 'all') {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(
        projects.filter((p) => p.technologies.includes(tech))
      )
    }
  }

  return (
    <div className="relative overflow-hidden">
      {/* Code Animation Background */}
      <CodeBackground />
      
      {/* Floating orbs for depth */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2]">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-400/30 dark:bg-purple-600/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/30 dark:bg-blue-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-300 dark:to-purple-300 bg-clip-text text-transparent">
            My Projects
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Explore my portfolio of web development projects
          </p>
        </div>

        {/* Filter */}
        {allTechnologies.length > 0 && (
          <div className="mb-12">
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => handleFilterChange('all')}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedTech === 'all'
                    ? 'glass-strong text-blue-600 dark:text-blue-300 shadow-lg'
                    : 'glass text-gray-800 dark:text-gray-300 hover:glass-strong'
                }`}
              >
                All
              </button>
              {allTechnologies.slice(0, 10).map((tech) => (
                <button
                  key={tech}
                  onClick={() => handleFilterChange(tech)}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    selectedTech === tech
                      ? 'glass-strong text-blue-600 dark:text-blue-300 shadow-lg'
                      : 'glass text-gray-800 dark:text-gray-300 hover:glass-strong'
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
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
          <ProjectGrid projects={filteredProjects} />
        )}
      </div>
    </div>
  )
}
