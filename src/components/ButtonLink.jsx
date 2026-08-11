import React from 'react'
import { ArrowDownRight } from 'lucide-react'

export default function ButtonLink({
  href,
  children,
  variant = 'primary',
  className = '',
}) {
  const classes =
    variant === 'primary'
      ? 'border-ember bg-ember text-bone hover:bg-bone hover:text-coal'
      : 'border-bone/35 bg-black/20 text-bone hover:border-bone hover:bg-bone hover:text-coal'

  return (
    <a
      href={href}
      className={`btn-feedback group inline-flex min-h-11 items-center justify-center gap-2 border px-4 py-3 text-center text-xs font-black uppercase tracking-[0.16em] transition sm:min-h-12 sm:px-5 sm:text-sm ${classes} ${className}`}
    >
      {children}
      <ArrowDownRight className="h-4 w-4 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  )
}
