import React, { useEffect } from 'react'
import { Send, X } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { formatPrice } from '../utils/format.js'

function buildOrderSummary(items, subtotal) {
  const lines = items.map(
    (line) => `${line.title} x${line.qty} - ${formatPrice(line.price * line.qty)}`,
  )
  lines.push(`Total: ${formatPrice(subtotal)}`)
  return lines.join('\n')
}

export default function Checkout({ isOpen, onClose }) {
  const { items, subtotal } = useCart()

  useEffect(() => {
    if (!isOpen) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[120] flex items-start justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm sm:items-center sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="Finalizar pedido"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl border border-bone/15 bg-coal p-5 sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-4 top-4 border border-bone/25 bg-black/40 p-2 text-bone transition hover:border-ember hover:text-ember"
        >
          <X className="h-4 w-4" />
        </button>

        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-ember sm:text-xs">
          Finalizar pedido
        </p>
        <h2 className="mt-2 font-display text-3xl uppercase leading-none text-bone sm:text-4xl">
          Fechar compra
        </h2>

        <ul className="mt-5 flex flex-col gap-2 border border-bone/10 bg-black/25 p-4 text-sm text-paper">
          {items.map((line) => (
            <li key={line.title} className="flex items-center justify-between">
              <span>
                {line.title} <span className="text-paper/60">x{line.qty}</span>
              </span>
              <span className="text-bone">
                {formatPrice(line.price * line.qty)}
              </span>
            </li>
          ))}
          <li className="mt-2 flex items-center justify-between border-t border-bone/10 pt-2 font-bold uppercase tracking-[0.14em] text-bone">
            <span>Total</span>
            <span>{formatPrice(subtotal)}</span>
          </li>
        </ul>

        <p className="mt-5 text-sm leading-6 text-paper">
          Preencha seus dados. O pagamento é combinado diretamente comigo
          (Pix, cartão via link ou na entrega) depois que o pedido chegar.
        </p>

        <form
          name="pedido-carrinho"
          method="POST"
          action="/?carrinho=enviado#contato"
          data-netlify="true"
          netlify-honeypot="bot-field"
          className="mt-5"
        >
          <input type="hidden" name="form-name" value="pedido-carrinho" />
          <input type="hidden" name="items" value={buildOrderSummary(items, subtotal)} readOnly />
          <input type="hidden" name="total" value={formatPrice(subtotal)} readOnly />
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
              required
            />
          </label>

          <label className="field-label mt-5">
            Forma de pagamento
            <select className="field" name="payment" required>
              <option value="Pix">Pix</option>
              <option value="Cartao">Cartão (link de pagamento)</option>
              <option value="Combinar na entrega">Combinar na entrega</option>
            </select>
          </label>

          <label className="field-label mt-5">
            Endereço de entrega ou observações
            <textarea
              className="field min-h-28 resize-y"
              name="delivery"
              placeholder="Endereço completo se for pôster físico, ou só confirme que é arquivo digital."
            />
          </label>

          <button
            type="submit"
            disabled={items.length === 0}
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 border border-ember bg-ember px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-bone transition hover:bg-bone hover:text-coal disabled:cursor-not-allowed disabled:border-bone/20 disabled:bg-transparent disabled:text-bone/30"
          >
            Confirmar pedido
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  )
}
