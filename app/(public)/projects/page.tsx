'use client'

import { useEffect, useState } from 'react'
import ProjectGrid from '@/components/public/ProjectGrid'
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
          My Projects
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Explore my portfolio of web development projects
        </p>
      </div>

      {/* Filter */}
      {allTechnologies.length > 0 && (
        <div className="mb-12">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => handleFilterChange('all')}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                selectedTech === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              All
            </button>
            {allTechnologies.slice(0, 10).map((tech) => (
              <button
                key={tech}
                onClick={() => handleFilterChange(tech)}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  selectedTech === tech
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
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
        <ProjectGrid projects={filteredProjects} />
      )}
    </div>
  )
}
