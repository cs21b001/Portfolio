'use client'

import { Project } from '@/types'
import ProjectCard from './ProjectCard'

interface ProjectGridProps {
  projects: Project[]
  title?: string
}

export default function ProjectGrid({ projects, title }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-12 glass glass-noise rounded-2xl">
        <p className="text-gray-600 dark:text-white/70 text-lg">No projects found.</p>
      </div>
    )
  }

  return (
    <div>
      {title && (
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-300 dark:to-purple-300 bg-clip-text text-transparent">
          {title}
        </h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}
