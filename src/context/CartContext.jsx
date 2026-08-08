import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'porao-grafico-cart'

function loadInitialState() {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.find((line) => line.title === action.item.title)
      if (existing) {
        return state.map((line) =>
          line.title === action.item.title
            ? { ...line, qty: line.qty + 1 }
            : line,
        )
      }
      return [
        ...state,
        {
          title: action.item.title,
          price: action.item.price,
          image: action.item.image,
          category: action.item.category,
          qty: 1,
        },
      ]
    }
    case 'REMOVE':
      return state.filter((line) => line.title !== action.title)
    case 'SET_QTY':
      return state
        .map((line) =>
          line.title === action.title
            ? { ...line, qty: Math.max(0, action.qty) }
            : line,
        )
        .filter((line) => line.qty > 0)
    case 'CLEAR':
      return []
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, undefined, loadInitialState)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const value = useMemo(() => {
    const itemCount = items.reduce((sum, line) => sum + line.qty, 0)
    const subtotal = items.reduce((sum, line) => sum + line.qty * line.price, 0)
    return {
      items,
      itemCount,
      subtotal,
      addItem: (item) => dispatch({ type: 'ADD', item }),
      removeItem: (title) => dispatch({ type: 'REMOVE', title }),
      setQty: (title, qty) => dispatch({ type: 'SET_QTY', title, qty }),
      clearCart: () => dispatch({ type: 'CLEAR' }),
    }
  }, [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
