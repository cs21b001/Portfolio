'use client'

import { useEffect, useState } from 'react'
import ContactForm from '@/components/public/ContactForm'
import { SocialLink } from '@/types'

export default function ContactPage() {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([])

  useEffect(() => {
    fetch('/api/social')
      .then((res) => res.json())
      .then((data) => setSocialLinks(data))
      .catch((error) => console.error('Error fetching social links:', error))
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Get In Touch
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Have a question or want to work together? Drop me a message!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Send Me a Message
          </h2>
          <ContactForm />
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Connect With Me
          </h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md mb-8">
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              I'm always interested in hearing about new projects and opportunities.
              Whether you have a question or just want to say hi, feel free to reach out!
            </p>

            {socialLinks.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Follow Me
                </h3>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      <span className="text-2xl">{social.icon}</span>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {social.platform}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8 border border-blue-200 dark:border-blue-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Response Time
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              I typically respond to messages within 24-48 hours. Looking forward to hearing from you!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
