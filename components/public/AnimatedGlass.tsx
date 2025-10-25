'use client'

import { useEffect, useRef, useState } from 'react'

const codeSnippets = [
  "const dev = { passion: 'code' };",
  "function build() { return magic; }",
  "async createFuture() { }",
  "const skills = ['React', 'Next.js'];",
  "export default Innovation;",
  "interface Dev { skills: [] }",
  "def solve(): return solution",
  "class Developer: pass",
  "import success",
  ".code { transform: scale(1); }",
  "@keyframes innovate { }",
  "<Innovation />",
  "SELECT * FROM skills;",
  "git commit -m 'feat'",
  "npm run build",
]

interface CodeLine {
  id: number
  text: string
  x: number
  y: number
  currentText: string
  charIndex: number
  typing: boolean
  delay: number
  opacity: number
}

interface AnimatedGlassProps {
  children: React.ReactNode
  className?: string
  variant?: 'glass' | 'glass-strong'
}

export default function AnimatedGlass({ 
  children, 
  className = '',
  variant = 'glass'
}: AnimatedGlassProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const codeLinesRef = useRef<CodeLine[]>([])
  const animationFrameRef = useRef<number | undefined>(undefined)
  const [isDark, setIsDark] = useState(false)

  // Detect dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    
    checkDarkMode()
    
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
    
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size to match container
    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
    }
    resizeCanvas()
    
    const resizeObserver = new ResizeObserver(resizeCanvas)
    resizeObserver.observe(container)

    // Initialize code lines
    const initCodeLines = () => {
      const lines: CodeLine[] = []
      const numberOfLines = Math.max(3, Math.floor(canvas.height / 120)) // At least 3 lines
      
      for (let i = 0; i < numberOfLines; i++) {
        lines.push({
          id: i,
          text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
          x: 10 + Math.random() * (canvas.width - 200),
          y: 30 + (i * (canvas.height / numberOfLines)),
          currentText: '',
          charIndex: 0,
          typing: true,
          delay: i * 30 + Math.random() * 40,
          opacity: 0.15 + Math.random() * 0.2,
        })
      }
      codeLinesRef.current = lines
    }
    initCodeLines()

    // Animation loop
    let frameCount = 0
    const animate = () => {
      frameCount++
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      codeLinesRef.current.forEach((line) => {
        // Typing effect
        if (line.delay > 0) {
          line.delay--
          return
        }

        if (line.typing && frameCount % 3 === 0) {
          if (line.charIndex < line.text.length) {
            line.currentText = line.text.substring(0, line.charIndex + 1)
            line.charIndex++
          } else {
            // Finished typing, wait before erasing
            if (frameCount % 200 === 0) {
              line.typing = false
            }
          }
        } else if (!line.typing && frameCount % 2 === 0) {
          // Erasing effect (faster)
          if (line.charIndex > 0) {
            line.charIndex--
            line.currentText = line.text.substring(0, line.charIndex)
          } else {
            // Finished erasing, pick new text
            line.text = codeSnippets[Math.floor(Math.random() * codeSnippets.length)]
            line.typing = true
            line.delay = Math.random() * 60
          }
        }

        // Draw code line
        ctx.font = '13px "Fira Code", "Courier New", monospace'
        
        if (isDark) {
          const colors = [
            `rgba(167, 139, 250, ${line.opacity + 0.3})`, // Purple
            `rgba(96, 165, 250, ${line.opacity + 0.3})`,  // Blue
            `rgba(134, 239, 172, ${line.opacity + 0.3})`, // Green
            `rgba(252, 165, 165, ${line.opacity + 0.3})`, // Red
          ]
          ctx.fillStyle = colors[line.id % colors.length]
        } else {
          ctx.fillStyle = `rgba(71, 85, 105, ${line.opacity + 0.4})`
        }
        
        ctx.fillText(line.currentText, line.x, line.y)

        // Draw cursor when typing
        if (line.typing && frameCount % 25 < 13) {
          if (isDark) {
            ctx.fillStyle = `rgba(139, 92, 246, ${line.opacity * 4})`
          } else {
            ctx.fillStyle = `rgba(59, 130, 246, ${line.opacity * 4})`
          }
          const textWidth = ctx.measureText(line.currentText).width
          ctx.fillRect(line.x + textWidth, line.y - 10, 2, 12)
        }
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      resizeObserver.disconnect()
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isDark])

  return (
    <div ref={containerRef} className={`relative ${variant} ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{ zIndex: 0 }}
      />
      <div className="relative" style={{ zIndex: 1 }}>
        {children}
      </div>
    </div>
  )
}
