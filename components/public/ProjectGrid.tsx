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
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">No projects found.</p>
      </div>
    )
  }

  return (
    <div>
      {title && (
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
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
