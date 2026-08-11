import React from 'react'

export default function SkullIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none">
      <path
        d="M32 8c-11.6 0-19 8.1-19 18.4 0 7 3.1 11 5.9 14.6 1.3 1.7 1.5 3.4 1.5 6.4 0 2.6 0 4.6 2.4 4.6 1.9 0 2.1-1.4 2.3-3.1.1-1 .2-2 .9-2 .8 0 .8 1 .8 2.2 0 1.6.2 2.9 2.2 2.9s2.2-1.3 2.2-2.9c0-1.2 0-2.2.8-2.2.7 0 .8 1 .9 2 .2 1.7.4 3.1 2.3 3.1 2.4 0 2.4-2 2.4-4.6 0-3 .2-4.7 1.5-6.4 2.8-3.6 5.9-7.6 5.9-14.6C51 16.1 43.6 8 32 8z"
        fill="currentColor"
      />
      <ellipse cx="24.5" cy="27" rx="4.4" ry="5.6" fill="#080708" />
      <ellipse cx="39.5" cy="27" rx="4.4" ry="5.6" fill="#080708" />
      <path d="M32 32.5l-3.4 6h6.8z" fill="#080708" />
    </svg>
  )
}
