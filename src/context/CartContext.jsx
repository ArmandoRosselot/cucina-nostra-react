import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { obtenerCarrito, guardarCarrito, obtenerProductos } from '../data/db.js';
import {
  agregarItem, cambiarCantidad, quitarItem,
  detallarCarrito, calcularTotal, contarUnidades
} from '../utils/carrito.js';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  // Estado inicial leído desde la "base de datos" (persistencia).
  const [items, setItems] = useState(() => obtenerCarrito());

  // Cada cambio del carrito se guarda automáticamente.
  useEffect(() => {
    guardarCarrito(items);
  }, [items]);

  const valor = useMemo(() => {
    const detalle = detallarCarrito(items, obtenerProductos());
    return {
      items,
      detalle,
      total: calcularTotal(detalle),
      unidades: contarUnidades(items),
      agregar: (id) => setItems((prev) => agregarItem(prev, id)),
      cambiar: (id, delta) => setItems((prev) => cambiarCantidad(prev, id, delta)),
      quitar: (id) => setItems((prev) => quitarItem(prev, id)),
      vaciar: () => setItems([])
    };
  }, [items]);

  return <CartContext.Provider value={valor}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart debe usarse dentro de <CartProvider>');
  return ctx;
}
