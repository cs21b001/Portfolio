'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import DataTable from '@/components/admin/DataTable'
import { Project } from '@/types'
import toast from 'react-hot-toast'

export default function AdminProjectsPage() {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = () => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        setProjects(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching projects:', error)
        setLoading(false)
      })
  }

  const handleDelete = async (project: Project) => {
    if (!confirm(`Are you sure you want to delete "${project.title}"?`)) {
      return
    }

    try {
      const response = await fetch(`/api/projects/${project.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast.success('Project deleted successfully')
        fetchProjects()
      } else {
        const data = await response.json()
        toast.error(data.error || 'Failed to delete project')
      }
    } catch (error) {
      console.error('Delete error:', error)
      toast.error('An error occurred')
    }
  }

  const columns = [
    {
      key: 'title',
      label: 'Title',
      render: (value: string, row: Project) => (
        <div>
          <div className="font-medium">{value}</div>
          {row.is_featured && (
            <span className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 px-2 py-0.5 rounded-full">
              Featured
            </span>
          )}
        </div>
      ),
    },
    {
      key: 'short_description',
      label: 'Description',
      render: (value: string) => (
        <div className="max-w-xs truncate">{value}</div>
      ),
    },
    {
      key: 'technologies',
      label: 'Technologies',
      render: (value: string[]) => (
        <div className="flex flex-wrap gap-1">
          {value.slice(0, 3).map((tech, i) => (
            <span
              key={i}
              className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full"
            >
              {tech}
            </span>
          ))}
          {value.length > 3 && (
            <span className="text-xs text-gray-500">+{value.length - 3}</span>
          )}
        </div>
      ),
    },
    {
      key: 'created_at',
      label: 'Created',
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Projects
        </h2>
        <Link
          href="/admin/projects/new"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          + Add Project
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">Loading...</div>
        ) : (
          <DataTable
            columns={columns}
            data={projects}
            onEdit={(project) => router.push(`/admin/projects/${project.id}/edit`)}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  )
}
