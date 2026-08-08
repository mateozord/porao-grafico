import React from 'react'

export default function SectionHeader({ eyebrow, title, children }) {
  return (
    <div className="mb-8 max-w-3xl sm:mb-9">
      {eyebrow && (
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-ember sm:text-xs sm:tracking-[0.32em]">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl uppercase leading-none text-bone sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {children && <p className="mt-4 text-sm leading-6 text-paper sm:mt-5 sm:text-base sm:leading-7">{children}</p>}
    </div>
  )
}
