import Link from 'next/link'
import CodeBackground from './CodeBackground'
import TypingText from './TypingText'

export default function Hero() {
  // Array of texts to cycle through - customize this!
  const nameTexts = [
    'AMAN KUMAR',
    'A DEVELOPER',
    'A PROBLEM SOLVER',
  ]
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden gradient-animated">
      {/* Code Animation Background */}
      <CodeBackground />
      
      {/* Floating glass orbs for depth */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2]">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-400/30 dark:bg-purple-600/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/30 dark:bg-blue-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-400/30 dark:bg-pink-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="text-center">
          {/* Glass card container */}
          <div className="glass glass-noise rounded-3xl p-12 sm:p-16 shadow-2xl mb-8 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              <span className="block mb-2">Hi, I'm</span>
              <TypingText 
                texts={nameTexts}
                typingSpeed={120}
                erasingSpeed={60}
                delayBetween={2500}
                className="block bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-500 bg-clip-text text-transparent text-glow min-h-[1.2em]"
              />
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-800 dark:text-white/90 mb-6">
              Full Stack Developer & Creative Problem Solver
            </p>
            <p className="text-lg text-gray-700 dark:text-white/80 mb-10 max-w-2xl mx-auto">
              I build exceptional digital experiences that combine beautiful design with powerful functionality.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/projects"
                className="glass-strong glass-hover glass-noise rounded-xl px-8 py-4 text-gray-900 dark:text-white font-semibold shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <span className="flex items-center justify-center gap-2">
                  View My Work
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
              <Link
                href="/contact"
                className="glass glass-hover glass-noise rounded-xl px-8 py-4 text-gray-900 dark:text-white font-semibold border-2 border-gray-900/30 dark:border-white/30 hover:border-gray-900/50 dark:hover:border-white/50 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                Get In Touch
              </Link>
            </div>
          </div>

          {/* Scroll Indicator - Enhanced */}
          <button 
            onClick={() => {
              const aboutSection = document.getElementById('about-section');
              aboutSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="mt-12 animate-bounce cursor-pointer group"
            aria-label="Scroll to next section"
          >
            <div className="glass rounded-full p-3 inline-block group-hover:scale-110 transition-transform duration-300">
              <svg
                className="w-6 h-6 text-gray-900 dark:text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </section>
  )
}
