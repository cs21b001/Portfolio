'use client'

import { useEffect, useRef, useState } from 'react'

const codeSnippets = [
  // JavaScript/TypeScript
  "const developer = { name: 'Aman', passion: 'coding' };",
  "function buildAmazingThings() { return innovation; }",
  "const skills = ['React', 'Next.js', 'TypeScript'];",
  "async function createFuture() { await dream(); }",
  "export default function Innovation() { return <Magic />; }",
  "interface Developer { skills: string[]; passion: string; }",
  
  // Python
  "def solve_problems(): return creative_solutions",
  "class Developer: passion = 'innovation'",
  "import success from experience",
  "for idea in innovations: build(idea)",
  
  // CSS
  ".code { transform: translateY(dreams); }",
  "animation: create-magic 3s infinite;",
  "@keyframes innovate { from { opacity: 0; } }",
  
  // HTML/JSX
  "<div className='future'>Building Tomorrow</div>",
  "<Innovation>Crafting Excellence</Innovation>",
  
  // SQL
  "SELECT * FROM skills WHERE level = 'expert';",
  "INSERT INTO projects VALUES ('Amazing', 'App');",
  
  // Java/C++
  "public class Innovation { void create(); }",
  "std::vector<dreams> makeReal();",
  "template<typename T> class Future { };",
  
  // Git
  "git commit -m 'Ship amazing features'",
  "git push origin innovation",
  "git merge feature/excellence",
  
  // Shell
  "npm run build && npm start",
  "docker compose up -d",
]

interface CodeLine {
  id: number
  text: string
  x: number
  y: number
  speed: number
  currentText: string
  charIndex: number
  typing: boolean
  delay: number
  opacity: number
}

export default function CodeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const codeLinesRef = useRef<CodeLine[]>([])
  const animationFrameRef = useRef<number | undefined>(undefined)
  const [isDark, setIsDark] = useState(false)

  // Detect dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    
    checkDarkMode()
    
    // Watch for dark mode changes
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
    
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Initialize code lines
    const initCodeLines = () => {
      const lines: CodeLine[] = []
      const numberOfLines = Math.floor(window.innerHeight / 120) + 3 // Much fewer lines (was /70 + 8)
      
      for (let i = 0; i < numberOfLines; i++) {
        lines.push({
          id: i,
          text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
          x: 50 + Math.random() * (canvas.width - 500), // Better distribution across screen
          y: 80 + (i * 120), // More spacing between lines (was 60)
          speed: 0, // No vertical movement
          currentText: '',
          charIndex: 0,
          typing: true,
          delay: Math.random() * 60, // Shorter initial delay
          opacity: 0.15 + Math.random() * 0.15, // Lower base opacity (was 0.2 + 0.25)
        })
      }
      codeLinesRef.current = lines
    }
    initCodeLines()

    // Animation loop
    let frameCount = 0
    const animate = () => {
      frameCount++
      
      // Completely clear canvas every frame to prevent trails
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
            // Finished erasing, pick new text (keep same position)
            line.text = codeSnippets[Math.floor(Math.random() * codeSnippets.length)]
            line.typing = true
            line.delay = Math.random() * 60
          }
        }

        // No vertical movement - code stays in place

        // Draw code line
        ctx.font = '500 15px "Fira Code", "Courier New", monospace'
        
        if (isDark) {
          // Dark mode: lighter code with purple/blue tints
          const colors = [
            `rgba(167, 139, 250, ${line.opacity + 0.15})`, // Purple - brighter
            `rgba(96, 165, 250, ${line.opacity + 0.15})`,  // Blue - brighter
            `rgba(134, 239, 172, ${line.opacity + 0.15})`, // Green - brighter
            `rgba(252, 165, 165, ${line.opacity + 0.15})`, // Red - brighter
          ]
          ctx.fillStyle = colors[line.id % colors.length]
        } else {
          // Light mode: more visible but still subtle
          ctx.fillStyle = `rgba(71, 85, 105, ${line.opacity + 0.45})`
        }
        
        ctx.fillText(line.currentText, line.x, line.y)

        // Draw cursor when typing
        if (line.typing && frameCount % 30 < 15) {
          if (isDark) {
            ctx.fillStyle = `rgba(139, 92, 246, ${line.opacity * 3})` // Purple cursor
          } else {
            ctx.fillStyle = `rgba(59, 130, 246, ${line.opacity * 3})` // Blue cursor
          }
          const textWidth = ctx.measureText(line.currentText).width
          ctx.fillRect(line.x + textWidth, line.y - 12, 2, 14)
        }
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isDark])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ 
        opacity: isDark ? 0.7 : 0.6, // Increased light mode opacity for better visibility
        zIndex: 1
      }}
    />
  )
}
