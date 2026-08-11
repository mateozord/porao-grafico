import React from 'react'
import Reveal from '../components/Reveal.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import { processSteps } from '../data/content.js'

export default function Process() {
  return (
    <section id="processo" className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Processo" title="Do briefing ao arquivo final." />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((step, index) => (
            <Reveal
              key={step}
              delay={index * 90}
              className="relative border border-bone/15 bg-black/30 p-5"
            >
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-ember sm:text-xs">
                Etapa {index + 1}
              </p>
              <h3 className="mt-4 font-display text-2xl uppercase text-bone sm:mt-6 sm:text-3xl">
                {step}
              </h3>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 max-w-2xl text-sm leading-6 text-paper">
          Duas rodadas de ajuste já estão inclusas no valor. Se pintar mais
          alguma coisa depois, a gente combina à parte.
        </p>
      </div>
    </section>
  )
}
