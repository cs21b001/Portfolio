'use client'

import { useState } from 'react'
import { isValidEmail } from '@/lib/utils'
import toast from 'react-hot-toast'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Please fill in all fields')
      return
    }

    if (!isValidEmail(formData.email)) {
      toast.error('Please enter a valid email address')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('Message sent successfully!')
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        })
      } else {
        toast.error(data.error || 'Failed to send message')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      toast.error('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-800 dark:text-white/90 mb-2"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 glass glass-hover border border-gray-900/10 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/50 transition-all"
          placeholder="Your name"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-800 dark:text-white/90 mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 glass glass-hover border border-gray-900/10 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/50 transition-all"
          placeholder="your.email@example.com"
        />
      </div>

      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-gray-800 dark:text-white/90 mb-2"
        >
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full px-4 py-3 glass glass-hover border border-gray-900/10 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/50 transition-all"
          placeholder="How can I help you?"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-800 dark:text-white/90 mb-2"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 glass glass-hover border border-gray-900/10 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/50 resize-none transition-all"
          placeholder="Your message..."
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-4 glass-strong glass-hover rounded-xl text-gray-900 dark:text-white font-medium shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all group"
      >
        <span className="flex items-center justify-center gap-2">
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </>
          ) : (
            <>
              Send Message
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </>
          )}
        </span>
      </button>
    </form>
  )
}
