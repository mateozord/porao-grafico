import React from 'react'

const words = [
  'PÔSTERES',
  'BANDAS',
  'EVENTOS',
  'CAPAS',
  'IDENTIDADE',
  'PROJETOS AUTORAIS',
]

function MarqueeContent() {
  return (
    <>
      {words.map((word, index) => (
        <span key={word} className="flex items-center">
          {word}
          <span className="mx-6 text-ember sm:mx-8" aria-hidden="true">
            {index === words.length - 1 ? '' : '•'}
          </span>
        </span>
      ))}
    </>
  )
}

export default function Marquee() {
  return (
    <div
      className="marquee section-band overflow-hidden border-b border-t border-bone/10 py-4"
      aria-hidden="true"
    >
      <div className="marquee-track flex w-max shrink-0 whitespace-nowrap font-display text-xl uppercase tracking-[0.08em] text-bone/80 sm:text-2xl">
        <div className="flex shrink-0 items-center">
          <MarqueeContent />
          <span className="mx-6 text-ember sm:mx-8">•</span>
        </div>
        <div className="flex shrink-0 items-center">
          <MarqueeContent />
          <span className="mx-6 text-ember sm:mx-8">•</span>
        </div>
      </div>
    </div>
  )
}
