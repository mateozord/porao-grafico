import React, { useEffect, useRef, useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import SkullIcon from '../components/SkullIcon.jsx'
import { useCart } from '../context/CartContext.jsx'

export default function Nav({ onOpenCart }) {
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
