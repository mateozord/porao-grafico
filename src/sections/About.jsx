import React from 'react'
import Reveal from '../components/Reveal.jsx'
import SectionHeader from '../components/SectionHeader.jsx'

export default function About() {
  return (
    <section className="section-band px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <Reveal className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[.75fr_1fr]">
        <SectionHeader title="Design com cheiro de amplificador queimado e parede mofada." />
        <p className="max-w-3xl text-base leading-7 text-paper sm:text-lg sm:leading-8">
          Não faço aquele visual limpinho de agência. Desenho pra banda,
          evento independente, capa de single, projeto autoral, esse tipo de
          coisa. Gosto de sujar a arte, rasgar papel, queimar borda, colocar
          uma criatura estranha ou um castelo caindo aos pedaços. No fim, a
          peça sai com cara de cartaz que alguém colou às pressas na parede
          do porão.
        </p>
      </Reveal>
    </section>
  )
}
