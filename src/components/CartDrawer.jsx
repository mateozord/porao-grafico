import React, { useEffect, useState } from 'react'
import { Minus, Plus, ShoppingCart, Trash2, X } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { formatPrice } from '../utils/format.js'

export default function CartDrawer({ isOpen, onClose, onCheckout }) {
  const { items, itemCount, subtotal, removeItem, setQty } = useCart()
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      setEntered(false)
      return undefined
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const raf = requestAnimationFrame(() => setEntered(true))

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
      cancelAnimationFrame(raf)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[110]" role="dialog" aria-modal="true" aria-label="Carrinho">
      <div
        className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${entered ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-bone/15 bg-coal shadow-poster transition-transform duration-300 ease-out ${entered ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between border-b border-bone/10 px-5 py-4">
          <h2 className="flex items-center gap-2 font-display text-2xl uppercase text-bone">
            <ShoppingCart className="h-5 w-5 text-ember" />
            Carrinho
            {itemCount > 0 && (
              <span className="font-body text-sm font-normal normal-case text-paper">
                ({itemCount})
              </span>
            )}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar carrinho"
            className="border border-bone/25 bg-black/40 p-2 text-bone transition hover:border-ember hover:text-ember"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="mt-12 flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center border border-bone/15 bg-black/25">
                <ShoppingCart className="h-7 w-7 text-bone/40" />
              </div>
              <p className="mt-5 max-w-[220px] text-sm leading-6 text-paper">
                Carrinho vazio por enquanto. Escolhe um pôster lá no
                portfólio.
              </p>
              <a
                href="#portfolio"
                onClick={onClose}
                className="mt-5 inline-flex min-h-11 items-center justify-center border border-bone/35 bg-black/20 px-4 text-xs font-black uppercase tracking-[0.16em] text-bone transition hover:border-bone hover:bg-bone hover:text-coal"
              >
                Ver portfólio
              </a>
            </div>
          ) : (
            <ul className="flex flex-col gap-3">
              {items.map((line) => (
                <li
                  key={line.title}
                  className="flex gap-3 border border-bone/10 bg-black/25 p-3 transition hover:border-bone/25"
                >
                  <img
                    src={line.image}
                    alt={line.title}
                    className="h-24 w-20 shrink-0 border border-bone/15 bg-black object-cover shadow-poster"
                  />
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <p className="font-display text-lg uppercase leading-none text-bone">
                        {line.title}
                      </p>
                      {line.category && (
                        <p className="mt-1 line-clamp-1 text-[10px] uppercase tracking-[0.14em] text-paper/70">
                          {line.category}
                        </p>
                      )}
                      <p className="mt-1 text-xs uppercase tracking-[0.16em] text-paper">
                        {formatPrice(line.price)} cada
                      </p>
                    </div>
                    <div className="mt-2 flex items-end justify-between gap-2">
                      <div className="flex items-center border border-bone/15">
                        <button
                          type="button"
                          onClick={() => setQty(line.title, line.qty - 1)}
                          aria-label={`Diminuir quantidade de ${line.title}`}
                          className="p-2 text-bone transition hover:bg-bone/10 hover:text-ember"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-6 text-center text-sm font-bold text-bone">
                          {line.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQty(line.title, line.qty + 1)}
                          aria-label={`Aumentar quantidade de ${line.title}`}
                          className="p-2 text-bone transition hover:bg-bone/10 hover:text-ember"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-display text-lg uppercase text-bone">
                          {formatPrice(line.price * line.qty)}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeItem(line.title)}
                          aria-label={`Remover ${line.title}`}
                          className="p-1.5 text-paper transition hover:text-ember"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-bone/10 px-5 py-4">
          <div className="mb-4 flex items-center justify-between text-sm font-bold uppercase tracking-[0.16em] text-bone">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <button
            type="button"
            disabled={items.length === 0}
            onClick={onCheckout}
            className="inline-flex w-full min-h-12 items-center justify-center gap-2 border border-ember bg-ember px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-bone transition hover:bg-bone hover:text-coal disabled:cursor-not-allowed disabled:border-bone/20 disabled:bg-transparent disabled:text-bone/30"
          >
            Finalizar pedido
          </button>
          {items.length > 0 && (
            <a
              href="#portfolio"
              onClick={onClose}
              className="mt-3 block text-center text-xs uppercase tracking-[0.14em] text-paper underline underline-offset-4 transition hover:text-ember"
            >
              Continuar escolhendo
            </a>
          )}
        </div>
      </aside>
    </div>
  )
}
