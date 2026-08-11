import React from 'react'
import ButtonLink from '../components/ButtonLink.jsx'
import Reveal from '../components/Reveal.jsx'
import { useScrollParallax } from '../hooks/useScrollParallax.js'

export default function FinalCall() {
  const cracksRef = useScrollParallax({ factor: 0.02, max: 6 })

  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(192,51,119,.4),transparent_45%),radial-gradient(circle_at_12%_100%,rgba(127,29,86,.45),transparent_42%),radial-gradient(circle_at_88%_100%,rgba(45,18,56,.55),transparent_42%),#0d0a0d]" />
      <div
        ref={cracksRef}
        className="hero-parallax wall-cracks absolute inset-0 opacity-40"
      />
      <div className="paper-noise absolute inset-0 opacity-15" />
      <Reveal className="relative z-10 mx-auto max-w-5xl text-center">
        <h2 className="font-display text-4xl uppercase leading-none text-bone sm:text-6xl lg:text-7xl">
          Sua banda não precisa parecer panfleto de dentista.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg font-semibold leading-7 text-bone [text-shadow:0_2px_10px_rgba(0,0,0,.6)] sm:text-xl sm:leading-8">
          Se o seu projeto merece mais que um template pronto, me chama. Eu
          boto peso e sujeira em cada peça que sai daqui.
        </p>
        <div className="mt-8">
          <ButtonLink href="#contato">Chamar para orçamento</ButtonLink>
        </div>
      </Reveal>
    </section>
  )
}
