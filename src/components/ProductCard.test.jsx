import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductCard from './ProductCard.jsx';

const producto = {
  id: 7, nombre: 'Bomboloni', ingredientes: 'Donas rellenas', precio: 3900, imagen: 'x.jpg', categoria: 'Desayuno'
};

describe('<ProductCard />', () => {
  it('renderiza nombre, ingredientes y precio formateado (props)', () => {
    render(<ProductCard producto={producto} onAgregar={() => {}} onVerDetalle={() => {}} />);
    expect(screen.getByRole('heading', { name: 'Bomboloni' })).toBeInTheDocument();
    expect(screen.getByText('Donas rellenas')).toBeInTheDocument();
    expect(screen.getByText('$3.900')).toBeInTheDocument();
  });

  it('llama a onAgregar con el producto al hacer clic', async () => {
    const onAgregar = vi.fn(); // mock de la función recibida por props
    render(<ProductCard producto={producto} onAgregar={onAgregar} onVerDetalle={() => {}} />);
    await userEvent.click(screen.getByRole('button', { name: /agregar/i }));
    expect(onAgregar).toHaveBeenCalledTimes(1);
    expect(onAgregar).toHaveBeenCalledWith(producto);
  });

  it('llama a onVerDetalle al presionar la imagen', async () => {
    const onVerDetalle = vi.fn();
    render(<ProductCard producto={producto} onAgregar={() => {}} onVerDetalle={onVerDetalle} />);
    await userEvent.click(screen.getByRole('button', { name: /ver detalle de bomboloni/i }));
    expect(onVerDetalle).toHaveBeenCalledWith(producto);
  });
});
