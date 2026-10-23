/* Funciones puras del carrito (no tocan React ni localStorage).
   Un ítem del carrito es { id, cantidad }. */

export const CANTIDAD_MAXIMA = 20;

/* Precio que realmente se cobra: el de oferta si existe. */
export const precioFinal = (p) => (p.precioOferta != null && p.precioOferta < p.precio ? p.precioOferta : p.precio);

export const descuentoPorcentaje = (p) =>
  precioFinal(p) < p.precio ? Math.round((1 - p.precioOferta / p.precio) * 100) : 0;

export function agregarItem(items, id) {
  const existente = items.find((i) => i.id === id);
  if (!existente) return [...items, { id, cantidad: 1 }];
  return items.map((i) =>
    i.id === id ? { ...i, cantidad: Math.min(i.cantidad + 1, CANTIDAD_MAXIMA) } : i
  );
}

/* Suma o resta 'delta'. Si la cantidad llega a 0, el ítem se elimina. */
export function cambiarCantidad(items, id, delta) {
  return items
    .map((i) => (i.id === id ? { ...i, cantidad: Math.min(i.cantidad + delta, CANTIDAD_MAXIMA) } : i))
    .filter((i) => i.cantidad > 0);
}

export function quitarItem(items, id) {
  return items.filter((i) => i.id !== id);
}

/* Une los ítems con los datos del producto y descarta ids que ya no existen. */
export function detallarCarrito(items, productos) {
  return items
    .map((i) => {
      const producto = productos.find((p) => p.id === i.id);
      return producto ? { ...producto, cantidad: i.cantidad, precio: precioFinal(producto), subtotal: precioFinal(producto) * i.cantidad } : null;
    })
    .filter(Boolean);
}

export const calcularTotal = (detalle) => detalle.reduce((suma, i) => suma + i.subtotal, 0);
export const contarUnidades = (items) => items.reduce((suma, i) => suma + i.cantidad, 0);
