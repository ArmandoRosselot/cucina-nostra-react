import { describe, it, expect } from 'vitest';
import {
  agregarItem, precioFinal, descuentoPorcentaje, cambiarCantidad, quitarItem, detallarCarrito, calcularTotal, contarUnidades, CANTIDAD_MAXIMA
} from './carrito.js';

const productos = [
  { id: 1, nombre: 'Bruschetta', precio: 5500 },
  { id: 2, nombre: 'Arancini', precio: 10500 }
];

describe('lógica del carrito', () => {
  it('agrega un ítem nuevo con cantidad 1 y suma si ya existe', () => {
    const uno = agregarItem([], 1);
    expect(uno).toEqual([{ id: 1, cantidad: 1 }]);
    expect(agregarItem(uno, 1)).toEqual([{ id: 1, cantidad: 2 }]);
  });

  it('respeta la cantidad máxima', () => {
    const lleno = [{ id: 1, cantidad: CANTIDAD_MAXIMA }];
    expect(agregarItem(lleno, 1)[0].cantidad).toBe(CANTIDAD_MAXIMA);
  });

  it('elimina el ítem cuando la cantidad llega a 0', () => {
    expect(cambiarCantidad([{ id: 1, cantidad: 1 }], 1, -1)).toEqual([]);
  });

  it('quita un ítem por id', () => {
    expect(quitarItem([{ id: 1, cantidad: 1 }, { id: 2, cantidad: 1 }], 1)).toEqual([{ id: 2, cantidad: 1 }]);
  });

  it('calcula detalle, total y unidades; ignora ids inexistentes', () => {
    const items = [{ id: 1, cantidad: 2 }, { id: 2, cantidad: 1 }, { id: 99, cantidad: 3 }];
    const detalle = detallarCarrito(items, productos);
    expect(detalle).toHaveLength(2);
    expect(calcularTotal(detalle)).toBe(21500);
    expect(contarUnidades(items)).toBe(6);
  });
});

describe('precios de oferta', () => {
  it('usa el precio de oferta si existe y calcula el descuento', () => {
    const p = { precio: 10000, precioOferta: 7500 };
    expect(precioFinal(p)).toBe(7500);
    expect(descuentoPorcentaje(p)).toBe(25);
    expect(precioFinal({ precio: 10000 })).toBe(10000);
    expect(descuentoPorcentaje({ precio: 10000 })).toBe(0);
  });

  it('el carrito cobra el precio de oferta', () => {
    const detalle = detallarCarrito([{ id: 1, cantidad: 2 }], [{ id: 1, nombre: 'X', precio: 10000, precioOferta: 7500 }]);
    expect(calcularTotal(detalle)).toBe(15000);
  });
});
