import React, { useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import Lightbox from '../components/Lightbox.jsx'
import PosterMockup from '../components/PosterMockup.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import { useCart } from '../context/CartContext.jsx'
import { portfolioItems } from '../data/content.js'
import { formatPrice } from '../utils/format.js'

export default function Portfolio() {
  const [activeIndex, setActiveIndex] = useState(null)
  const { addItem } = useCart()

  const navigate = (direction) => {
    setActiveIndex((current) => {
      if (current === null) return current
      const total = portfolioItems.length
      return (current + direction + total) % total
    })
  }

  return (
    <section id="portfolio" className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Portfólio"
          title="Cartazes de parede, capa e porão."
        >
          Peça autoral com textura de cartaz xerocado, fantasia sombria,
          horror e peso de show underground. Clica pra ver em tela cheia.
        </SectionHeader>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioItems.map((item, index) => (
            <Reveal
              as="article"
              key={item.title}
              delay={(index % 3) * 100}
              className="group cursor-zoom-in border border-bone/15 bg-black/30 p-2.5 transition hover:-translate-y-1 hover:border-ember/70 hover:shadow-bruise"
              onClick={() => setActiveIndex(index)}
            >
              <PosterMockup
                item={item}
                className="h-[360px] sm:h-[380px] lg:h-[410px]"
              />
              <div className="p-2 pt-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-ember sm:text-xs">
                  {item.category}
                </p>
                <h3 className="mt-2 font-display text-3xl uppercase leading-none text-bone sm:text-4xl">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-paper">
                  {item.description}
                </p>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="font-display text-2xl uppercase text-bone">
                    {formatPrice(item.price)}
                  </span>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation()
                      addItem(item)
                    }}
                    className="inline-flex min-h-10 items-center gap-2 border border-ember bg-ember px-3 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-bone transition hover:bg-bone hover:text-coal"
                  >
                    <ShoppingCart className="h-3.5 w-3.5" />
                    Adicionar
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <Lightbox
        items={portfolioItems}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={navigate}
      />
    </section>
  )
}
