import React from 'react'
import ButtonLink from '../components/ButtonLink.jsx'
import PosterMockup from '../components/PosterMockup.jsx'
import Reveal from '../components/Reveal.jsx'
import { portfolioItems } from '../data/content.js'

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden px-4 pb-14 pt-32 sm:px-6 sm:pt-36 lg:px-8 lg:pb-20"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(127,29,86,.35),transparent_28%),radial-gradient(circle_at_10%_80%,rgba(45,18,56,.55),transparent_32%)]" />
      <div className="wall-cracks absolute inset-0 opacity-50" />
      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 lg:min-h-[calc(100svh-120px)] lg:grid-cols-[1.05fr_.7fr]">
        <Reveal>
          <p className="mb-5 inline-block border border-bone/20 bg-black/30 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.26em] text-ember sm:text-xs sm:tracking-[0.34em]">
            Pôsteres underground, capas e flyers
          </p>
          <h1 className="max-w-5xl font-display text-5xl uppercase leading-[0.9] text-bone sm:text-7xl md:text-8xl lg:text-9xl">
            Arte pra banda, evento ou lançamento que não quer parecer coisa de
            agência.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-paper sm:text-lg sm:leading-8">
            Curto desenhar pôster, flyer e capa com aquela cara de xerox mal
            tirado, meio sujo, meio sombrio. Se o seu som é pesado ou
            estranho, a arte também vai ser.
          </p>
          <div className="mt-7 grid gap-3 sm:flex sm:flex-row">
            <ButtonLink href="#portfolio">Ver portfólio</ButtonLink>
            <ButtonLink href="#contato" variant="secondary">
              Pedir orçamento
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal
          className="mx-auto w-full max-w-[280px] sm:max-w-sm lg:max-w-md"
          delay={150}
        >
          <div className="hero-float relative rotate-2">
            <div className="glow-pulse absolute -inset-5 border border-bone/10 bg-ritual/10 blur-2xl" />
            <PosterMockup
              item={portfolioItems[0]}
              featured
              className="aspect-[2/3]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
