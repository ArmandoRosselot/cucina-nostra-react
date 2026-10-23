import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CartPanel from './CartPanel.jsx';
import { CartProvider, useCart } from '../context/CartContext.jsx';
import { KEYS } from '../data/db.js';

// Componente auxiliar para agregar productos mientras probamos el panel.
function Agregador() {
  const { agregar } = useCart();
  return <button onClick={() => agregar(1)}>agregar-1</button>;
}

const montar = (props = {}) =>
  render(
    <CartProvider>
      <Agregador />
      <CartPanel abierto onCerrar={() => {}} onPedir={() => {}} {...props} />
    </CartProvider>
  );

describe('<CartPanel />', () => {
  it('no renderiza nada si está cerrado', () => {
    montar({ abierto: false });
    expect(screen.queryByText(/tu carrito/i)).not.toBeInTheDocument();
  });

  it('muestra el estado vacío y deshabilita "Realizar pedido"', () => {
    montar();
    expect(screen.getByText(/tu carrito está vacío/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /realizar pedido/i })).toBeDisabled();
    expect(screen.getByTestId('total-carrito')).toHaveTextContent('$0');
  });

  it('agrega ítems, actualiza cantidades y total (estado)', async () => {
    montar();
    await userEvent.click(screen.getByText('agregar-1'));
    await userEvent.click(screen.getByText('agregar-1'));
    const item = screen.getByTestId('item-carrito');
    expect(within(item).getByTestId('cantidad')).toHaveTextContent('2');
    expect(screen.getByTestId('total-carrito')).toHaveTextContent('$11.000'); // 2 x 5.500

    await userEvent.click(screen.getByRole('button', { name: /quitar una unidad/i }));
    expect(screen.getByTestId('total-carrito')).toHaveTextContent('$5.500');
  });

  it('persiste el carrito en localStorage', async () => {
    montar();
    await userEvent.click(screen.getByText('agregar-1'));
    expect(JSON.parse(localStorage.getItem(KEYS.CARRITO))).toEqual([{ id: 1, cantidad: 1 }]);
  });

  it('vacía el carrito y dispara onPedir / onCerrar', async () => {
    const onPedir = vi.fn();
    const onCerrar = vi.fn();
    montar({ onPedir, onCerrar });
    await userEvent.click(screen.getByText('agregar-1'));

    await userEvent.click(screen.getByRole('button', { name: /realizar pedido/i }));
    expect(onPedir).toHaveBeenCalledTimes(1);

    await userEvent.click(screen.getByRole('button', { name: /cerrar carrito/i }));
    expect(onCerrar).toHaveBeenCalledTimes(1);

    await userEvent.click(screen.getByRole('button', { name: /vaciar carrito/i }));
    expect(screen.getByText(/tu carrito está vacío/i)).toBeInTheDocument();
  });
});
