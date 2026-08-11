import React, { useEffect, useRef, useState } from 'react'
import {
  ArrowDownRight,
  CheckCircle2,
  Instagram,
  Mail,
  MessageCircle,
  Send,
  ShoppingCart,
} from 'lucide-react'
import CartDrawer from './components/CartDrawer.jsx'
import Checkout from './components/Checkout.jsx'
import Lightbox from './components/Lightbox.jsx'
import PosterMockup from './components/PosterMockup.jsx'
import Reveal from './components/Reveal.jsx'
import SectionHeader from './components/SectionHeader.jsx'
import { useCart } from './context/CartContext.jsx'
import { portfolioItems, processSteps, services } from './data/content.js'
import { formatPrice } from './utils/format.js'

const contactLinks = {
  instagram: 'https://instagram.com/poraografico',
  whatsapp: 'https://wa.me/5500000000000',
  email: 'mailto:contato@poraografico.com',
}

function ButtonLink({ href, children, variant = 'primary', className = '' }) {
  const classes =
    variant === 'primary'
      ? 'border-ember bg-ember text-bone hover:bg-bone hover:text-coal'
      : 'border-bone/35 bg-black/20 text-bone hover:border-bone hover:bg-bone hover:text-coal'

  return (
    <a
      href={href}
      className={`inline-flex min-h-11 items-center justify-center gap-2 border px-4 py-3 text-center text-xs font-black uppercase tracking-[0.16em] transition sm:min-h-12 sm:px-5 sm:text-sm ${classes} ${className}`}
    >
      {children}
      <ArrowDownRight className="h-4 w-4 shrink-0" />
    </a>
  )
}

function SkullIcon({ className = '' }) {
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

function Nav({ onOpenCart }) {
  const { itemCount } = useCart()
  const [pop, setPop] = useState(false)
  const previousCount = useRef(itemCount)
  const [isScrolling, setIsScrolling] = useState(false)

  useEffect(() => {
    if (itemCount > previousCount.current) {
      setPop(true)
      const timeout = setTimeout(() => setPop(false), 320)
      previousCount.current = itemCount
      return () => clearTimeout(timeout)
    }
    previousCount.current = itemCount
    return undefined
  }, [itemCount])

  useEffect(() => {
    let stopTimeout
    const handleScroll = () => {
      setIsScrolling(true)
      clearTimeout(stopTimeout)
      stopTimeout = setTimeout(() => setIsScrolling(false), 500)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(stopTimeout)
    }
  }, [])

  const cartBadge = itemCount > 0 && (
    <span
      className={`absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-ember px-1 text-[10px] font-black text-bone ${pop ? 'badge-pop' : ''}`}
    >
      {itemCount}
    </span>
  )

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-bone/10 bg-coal/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="flex items-center justify-between gap-3">
          <a
            href="#inicio"
            className="flex items-center gap-2 font-display text-2xl uppercase leading-none text-bone"
          >
            <SkullIcon
              className={`h-7 w-7 shrink-0 text-ember ${isScrolling ? 'skull-spin' : ''}`}
            />
            PORÃO GRÁFICO
          </a>
          <button
            type="button"
            onClick={onOpenCart}
            aria-label="Abrir carrinho"
            className="nav-chip relative flex items-center p-2.5 md:hidden"
          >
            <ShoppingCart className="h-4 w-4" />
            {cartBadge}
          </button>
        </div>
        <div className="nav-links-scroll flex items-center gap-2 overflow-x-auto text-[10px] font-bold uppercase tracking-[0.18em] text-paper sm:gap-4 sm:text-xs md:overflow-visible">
          <a className="nav-chip" href="#portfolio">
            Portfólio
          </a>
          <a className="nav-chip" href="#servicos">
            Serviços
          </a>
          <a className="nav-chip" href="#processo">
            Processo
          </a>
          <a className="nav-chip" href="#contato">
            Pedido
          </a>
          <button
            type="button"
            onClick={onOpenCart}
            aria-label="Abrir carrinho"
            className="nav-chip relative hidden items-center gap-2 md:flex"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            Carrinho
            {cartBadge}
          </button>
        </div>
      </nav>
    </header>
  )
}

function Hero() {
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

function About() {
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

function Portfolio() {
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

function Services() {
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

function Process() {
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

function FinalCall() {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(192,51,119,.4),transparent_45%),radial-gradient(circle_at_12%_100%,rgba(127,29,86,.45),transparent_42%),radial-gradient(circle_at_88%_100%,rgba(45,18,56,.55),transparent_42%),#0d0a0d]" />
      <div className="wall-cracks absolute inset-0 opacity-40" />
      <div className="paper-noise absolute inset-0 opacity-50" />
      <Reveal className="relative z-10 mx-auto max-w-5xl text-center">
        <h2 className="font-display text-4xl uppercase leading-none text-bone sm:text-6xl lg:text-7xl">
          Sua banda não precisa parecer panfleto de dentista.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-paper sm:text-lg sm:leading-8">
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

function Contact() {
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

export default function App() {
  const [isCartOpen, setCartOpen] = useState(false)
  const [isCheckoutOpen, setCheckoutOpen] = useState(false)

  return (
    <main className="relative min-h-screen overflow-hidden bg-coal text-bone">
      <div className="site-noise pointer-events-none fixed inset-0 z-[60] opacity-[0.08]" />
      <Nav onOpenCart={() => setCartOpen(true)} />
      <Hero />
      <About />
      <Portfolio />
      <Services />
      <Process />
      <FinalCall />
      <Contact />
      <footer className="border-t border-bone/10 px-4 py-8 text-center text-[10px] uppercase tracking-[0.24em] text-paper sm:px-6 sm:text-xs lg:px-8">
        PORÃO GRÁFICO / pôster, capa e flyer com cara de porão
      </footer>
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={() => {
          setCartOpen(false)
          setCheckoutOpen(true)
        }}
      />
      <Checkout isOpen={isCheckoutOpen} onClose={() => setCheckoutOpen(false)} />
    </main>
  )
}
