import React, { useEffect } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

export default function Lightbox({ items, activeIndex, onClose, onNavigate }) {
  const item = activeIndex === null ? null : items[activeIndex]

  useEffect(() => {
    if (activeIndex === null) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') onNavigate(1)
      if (event.key === 'ArrowLeft') onNavigate(-1)
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeIndex, onClose, onNavigate])

  if (!item) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar"
        className="absolute right-4 top-4 border border-bone/25 bg-black/60 p-2 text-bone transition hover:border-ember hover:text-ember sm:right-6 sm:top-6"
      >
        <X className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation()
          onNavigate(-1)
        }}
        aria-label="Poster anterior"
        className="absolute left-2 top-1/2 -translate-y-1/2 border border-bone/25 bg-black/60 p-2 text-bone transition hover:border-ember hover:text-ember sm:left-6"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation()
          onNavigate(1)
        }}
        aria-label="Proximo poster"
        className="absolute right-2 top-1/2 -translate-y-1/2 border border-bone/25 bg-black/60 p-2 text-bone transition hover:border-ember hover:text-ember sm:right-6"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <figure
        className="flex max-h-full max-w-4xl flex-col items-center"
        onClick={(event) => event.stopPropagation()}
      >
        <img
          src={item.image}
          alt={item.imageAlt || item.title}
          className="max-h-[75vh] w-auto border border-bone/20 object-contain shadow-poster"
        />
        <figcaption className="mt-4 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-ember sm:text-xs">
            {item.category}
          </p>
          <h3 className="mt-1 font-display text-2xl uppercase leading-none text-bone sm:text-3xl">
            {item.title}
          </h3>
        </figcaption>
      </figure>
    </div>
  )
}
