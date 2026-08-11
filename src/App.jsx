import React, { useState } from 'react'
import CartDrawer from './components/CartDrawer.jsx'
import Checkout from './components/Checkout.jsx'
import About from './sections/About.jsx'
import Contact from './sections/Contact.jsx'
import FinalCall from './sections/FinalCall.jsx'
import Hero from './sections/Hero.jsx'
import Nav from './sections/Nav.jsx'
import Portfolio from './sections/Portfolio.jsx'
import Process from './sections/Process.jsx'
import Services from './sections/Services.jsx'

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
