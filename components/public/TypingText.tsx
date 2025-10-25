'use client'

import { useEffect, useState } from 'react'

interface TypingTextProps {
  texts: string[] // Array of texts to cycle through
  typingSpeed?: number // Speed of typing (lower = faster)
  erasingSpeed?: number // Speed of erasing (lower = faster)
  delayBetween?: number // Delay between erase and next text
  className?: string
}

export default function TypingText({
  texts,
  typingSpeed = 100,
  erasingSpeed = 50,
  delayBetween = 2000,
  className = ''
}: TypingTextProps) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [showCursor, setShowCursor] = useState(true)

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)
    return () => clearInterval(cursorInterval)
  }, [])

  // Typing and erasing animation
  useEffect(() => {
    const currentText = texts[currentIndex]
    
    if (isTyping) {
      // Typing phase
      if (displayText.length < currentText.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1))
        }, typingSpeed)
        return () => clearTimeout(timeout)
      } else {
        // Finished typing, wait before erasing
        const timeout = setTimeout(() => {
          setIsTyping(false)
        }, delayBetween)
        return () => clearTimeout(timeout)
      }
    } else {
      // Erasing phase
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, erasingSpeed)
        return () => clearTimeout(timeout)
      } else {
        // Finished erasing, move to next text
        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length)
        setIsTyping(true)
      }
    }
  }, [displayText, isTyping, currentIndex, texts, typingSpeed, erasingSpeed, delayBetween])

  return (
    <span className={className}>
      {displayText}
      {showCursor && <span className="animate-pulse">|</span>}
    </span>
  )
}
