import React from 'react'
import Reveal from '../components/Reveal.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import { services } from '../data/content.js'

export default function Services() {
  return (
    <section
      id="servicos"
      className="section-band px-4 py-14 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Serviços"
          title="Peças para lançamento, show e ritual."
        />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => (
            <Reveal
              as="article"
              key={service.title}
              delay={index * 90}
              className="border border-bone/15 bg-coal/80 p-5 sm:p-6"
            >
              <span className="font-display text-4xl text-ember sm:text-5xl">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-6 font-display text-2xl uppercase leading-none text-bone sm:mt-8 sm:text-3xl">
                {service.title}
              </h3>
              <p className="mt-4 text-sm leading-6 text-paper">
                {service.text}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
