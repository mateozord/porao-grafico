import { useEffect, useRef } from 'react'

export function useScrollParallax({ factor = 0.08, max = 16 } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (prefersReducedMotion) return undefined

    let ticking = false

    const update = () => {
      ticking = false
      const rect = node.getBoundingClientRect()
      const viewportCenter = window.innerHeight / 2
      const distanceFromCenter = rect.top + rect.height / 2 - viewportCenter
      const offset = Math.max(
        -max,
        Math.min(max, -distanceFromCenter * factor),
      )
      node.style.setProperty('--parallax-y', `${offset.toFixed(1)}px`)
    }

    const handleScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [factor, max])

  return ref
}
