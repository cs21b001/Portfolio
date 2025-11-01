'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Project } from '@/types'

export default function ProjectDetailPage() {
  const params = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params?.id) {
      fetch(`/api/projects/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          setProject(data)
          setLoading(false)
        })
        .catch((error) => {
          console.error('Error fetching project:', error)
          setLoading(false)
        })
    }
  }, [params?.id])

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="animate-pulse space-y-8">
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
          <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Project Not Found
        </h1>
        <Link
          href="/projects"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← Back to Projects
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <Link
        href="/projects"
        className="text-blue-600 dark:text-blue-400 hover:underline mb-8 inline-block"
      >
        ← Back to Projects
      </Link>

      <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
        {project.title}
      </h1>

      {project.image_url && (
        <div className="relative h-100 rounded-lg overflow-hidden mb-8 shadow-xl">
          <img
            src={project.image_url}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
        <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
          {(project.long_description || project.short_description)
            .split('\n')
            .map((paragraph, idx) => {
              // Handle bullet points
              if (paragraph.trim().startsWith('•') || paragraph.trim().startsWith('-')) {
                return (
                  <li key={idx} className="ml-6 text-lg">
                    {paragraph.trim().replace(/^[•-]\s*/, '')}
                  </li>
                )
              }
              // Handle section headers (lines ending with :)
              if (paragraph.trim().endsWith(':') && paragraph.length < 100) {
                return (
                  <h3 key={idx} className="text-2xl font-bold text-gray-900 dark:text-white mt-6 mb-2">
                    {paragraph.trim()}
                  </h3>
                )
              }
              // Regular paragraphs
              if (paragraph.trim()) {
                return (
                  <p key={idx} className="text-lg">
                    {paragraph}
                  </p>
                )
              }
              return null
            })}
        </div>
      </div>

      {/* Technologies */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Technologies Used
        </h2>
        <div className="flex flex-wrap gap-3">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-4">
        {project.demo_url && (
          <a
            href={project.demo_url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Live Demo
          </a>
        )}
        {project.github_url && (
          <a
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors font-medium shadow-md flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            View Code
          </a>
        )}
        {project.project_pdf_url && (
          <a
            href={project.project_pdf_url}
            download
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium shadow-md flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download PDF
          </a>
        )}
      </div>
    </div>
  )
}
