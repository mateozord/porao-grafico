import React from 'react'
import { Flame, Moon, Skull } from 'lucide-react'

export default function PosterMockup({
  item,
  featured = false,
  className = '',
}) {
  if (item.image) {
    return (
      <div
        className={`poster-frame group relative overflow-hidden bg-coal p-3 shadow-poster ${className}`}
      >
        <div className="relative h-full min-h-0 overflow-hidden border border-bone/20 bg-black">
          <img
            src={item.image}
            alt={item.imageAlt || item.title}
            className="h-full w-full object-contain"
            width={800}
            height={1200}
            loading={featured ? 'eager' : 'lazy'}
            fetchpriority={featured ? 'high' : 'auto'}
          />
          <div className="paper-noise pointer-events-none absolute inset-0 opacity-20 mix-blend-screen" />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-bone/15" />
          {featured && (
            <div className="absolute left-4 top-4 border border-bone/25 bg-black/70 px-3 py-2 text-[10px] font-black uppercase tracking-[0.26em] text-bone">
              Pôster em destaque
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div
      className={`poster-frame group relative overflow-hidden bg-coal p-3 shadow-poster ${className}`}
    >
      <div
        className={`relative flex h-full min-h-0 flex-col justify-between overflow-hidden border border-bone/20 bg-gradient-to-br ${item.palette}`}
      >
        <div className="absolute inset-0 bg-slash opacity-30" />
        <div className="paper-noise absolute inset-0 opacity-70" />
        <div className="absolute -left-16 top-16 h-44 w-44 rounded-full bg-ember/30 blur-3xl" />
        <div className="absolute -right-20 bottom-20 h-56 w-56 rounded-full bg-purple-950/70 blur-3xl" />
        <div className="absolute left-1/2 top-16 h-28 w-28 -translate-x-1/2 rounded-full border border-red-300/35 bg-[#7b1118]/70 shadow-bruise" />

        <div className="relative z-10 flex items-center justify-between p-5 text-[10px] uppercase tracking-[0.34em] text-bone/70">
          <span>Live ritual</span>
          <Moon className="h-4 w-4" />
        </div>

        <div className="relative z-10 mx-auto flex w-[72%] flex-1 items-center justify-center">
          <div className="creature relative flex aspect-[3/4] w-full max-w-[250px] items-center justify-center border border-bone/20 bg-black/25">
            <div className="absolute -left-10 top-16 h-32 w-14 -rotate-45 border-l border-t border-bone/30" />
            <div className="absolute -right-10 top-16 h-32 w-14 rotate-45 border-r border-t border-bone/30" />
            <Skull className="h-24 w-24 text-bone/80 drop-shadow-[0_0_22px_rgba(192,51,119,.55)]" strokeWidth={1.15} />
            <Flame className="absolute bottom-10 h-16 w-16 text-ember/80" strokeWidth={1.1} />
          </div>
        </div>

        <div className="relative z-10 p-5">
          <p className="mb-2 text-xs uppercase tracking-[0.28em] text-paper/70">
            {featured ? 'Pôster em destaque' : item.category}
          </p>
          <p className="font-display text-5xl uppercase leading-none text-bone sm:text-6xl">
            {item.symbol}
          </p>
          <div className="mt-4 border-t border-bone/30 pt-3 text-xs uppercase tracking-[0.22em] text-bone/75">
            porão gráfico
          </div>
        </div>
      </div>
    </div>
  )
}
