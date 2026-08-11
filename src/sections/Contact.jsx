import React, { useState } from 'react'
import { CheckCircle2, Instagram, Mail, MessageCircle, Send } from 'lucide-react'
import ButtonLink from '../components/ButtonLink.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import { contactLinks } from '../data/contact.js'

export default function Contact() {
  const briefingTips = [
    'Tipo de arte e formato desejado',
    'Nome da banda, evento ou projeto',
    'Referências, prazo e clima visual',
  ]

  const [status, setStatus] = useState('idle')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('sending')
    const form = event.target
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form)).toString(),
    }).catch(() => {})
    setStatus('success')
    form.reset()
  }

  return (
    <section id="contato" className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[.85fr_1.15fr]">
        <Reveal>
          <SectionHeader eyebrow="Pedidos" title="Peça seu orçamento." />
          <p className="mb-6 max-w-xl text-sm leading-6 text-paper sm:text-base sm:leading-7">
            Preenche esse briefing rápido e eu te chamo no WhatsApp ou no
            e-mail com prazo e valor. Se preferir, manda direto pelas redes
            abaixo.
          </p>
          <div className="mb-7 grid gap-3">
            {briefingTips.map((tip) => (
              <div
                key={tip}
                className="flex items-start gap-3 border border-bone/10 bg-black/25 p-3 text-sm leading-5 text-paper"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-ember" />
                <span>{tip}</span>
              </div>
            ))}
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <ButtonLink href={contactLinks.whatsapp}>
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </ButtonLink>
            <ButtonLink href={contactLinks.instagram} variant="secondary">
              <Instagram className="h-4 w-4" />
              Instagram
            </ButtonLink>
            <ButtonLink href={contactLinks.email} variant="secondary">
              <Mail className="h-4 w-4" />
              contato@poraografico.com
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal
          as="form"
          delay={120}
          name="orcamento"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          className="border border-bone/15 bg-black/35 p-5 sm:p-8"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value="orcamento" />
          <p className="hidden">
            <label>
              Não preencher
              <input name="bot-field" />
            </label>
          </p>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="field-label">
              Nome
              <input
                className="field"
                type="text"
                name="name"
                autoComplete="name"
                required
              />
            </label>
            <label className="field-label">
              E-mail
              <input
                className="field"
                type="email"
                name="email"
                autoComplete="email"
                required
              />
            </label>
          </div>

          <label className="field-label mt-5">
            WhatsApp
            <input
              className="field"
              type="tel"
              name="whatsapp"
              autoComplete="tel"
              placeholder="DDD + número"
            />
          </label>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <label className="field-label">
              Tipo de arte
              <select className="field" name="projectType" required>
                <option value="Poster de show">Pôster de show</option>
                <option value="Capa de single/album">
                  Capa de single/álbum
                </option>
                <option value="Pacote de divulgacao">
                  Pacote de divulgação
                </option>
                <option value="Identidade visual dark">
                  Identidade visual dark
                </option>
              </select>
            </label>
            <label className="field-label">
              Prazo
              <select className="field" name="deadline">
                <option value="Sem prazo definido">Sem prazo definido</option>
                <option value="Ate 7 dias">Até 7 dias</option>
                <option value="8 a 15 dias">8 a 15 dias</option>
                <option value="Mais de 15 dias">Mais de 15 dias</option>
              </select>
            </label>
          </div>

          <label className="field-label mt-5">
            Orçamento aproximado
            <select className="field" name="budget">
              <option value="Ainda nao sei">Ainda não sei</option>
              <option value="Ate R$150">Até R$150</option>
              <option value="R$150 a R$300">R$150 a R$300</option>
              <option value="Acima de R$300">Acima de R$300</option>
            </select>
          </label>

          <label className="field-label mt-5">
            Mensagem
            <textarea
              className="field min-h-40 resize-y"
              name="message"
              placeholder="Conte o nome do projeto, estilo, referências, formatos e onde a arte vai ser usada."
              required
            />
          </label>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 border border-ember bg-ember px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-bone transition hover:bg-bone hover:text-coal disabled:cursor-not-allowed disabled:border-bone/20 disabled:bg-transparent disabled:text-bone/30 sm:w-auto"
          >
            {status === 'sending' ? 'Enviando...' : 'Enviar pedido'}
            <Send className="h-4 w-4" />
          </button>
          {status === 'success' && (
            <p className="mt-5 border border-ember/50 bg-ember/10 p-4 text-sm font-bold uppercase tracking-[0.14em] text-bone">
              Pedido enviado. Vou te responder em breve.
            </p>
          )}
        </Reveal>
      </div>
    </section>
  )
}
