import React, { useEffect, useRef, useState } from 'react'

export default function Reveal({
  children,
  className = '',
  as: Tag = 'div',
  delay = 0,
  distance,
  duration,
  ...rest
}) {
  const ref = useRef(null)
  const [isVisible, setVisible] = useState(false)
  const [isSettled, setSettled] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const node = ref.current
    if (!node || !isVisible) return undefined

    const handleAnimationEnd = () => setSettled(true)
    node.addEventListener('animationend', handleAnimationEnd)
    return () => node.removeEventListener('animationend', handleAnimationEnd)
  }, [isVisible])

  const style = {
    ...(delay ? { animationDelay: `${delay}ms` } : null),
    ...(distance ? { '--reveal-distance': `${distance}px` } : null),
    ...(duration ? { '--reveal-duration': `${duration}ms` } : null),
  }

  return (
    <Tag
      ref={ref}
      className={`reveal ${isVisible ? 'is-visible' : ''} ${isSettled ? 'is-settled' : ''} ${className}`}
      style={Object.keys(style).length ? style : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}
