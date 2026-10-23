import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CategoriasSection from './CategoriasSection.jsx';
import OfertasSection from './OfertasSection.jsx';
import ProductCard from './ProductCard.jsx';

const categorias = [
  { nombre: 'Entradas', imagen: 'e.jpg', cantidad: 5 },
  { nombre: 'Cena', imagen: 'c.jpg', cantidad: 1 }
];
const conOferta = { id: 2, nombre: 'Ensalada', ingredientes: 'x', precio: 8900, precioOferta: 6900, imagen: 'x.jpg' };
const sinOferta = { id: 3, nombre: 'Arancini', ingredientes: 'y', precio: 10500, imagen: 'y.jpg' };

describe('<CategoriasSection />', () => {
  it('renderiza una tarjeta por categoría con su cantidad', () => {
    render(<CategoriasSection categorias={categorias} onSeleccionar={() => {}} />);
    expect(screen.getAllByRole('button')).toHaveLength(2);
    expect(screen.getByText('5 platos')).toBeInTheDocument();
    expect(screen.getByText('1 plato')).toBeInTheDocument();
  });

  it('avisa qué categoría se eligió', async () => {
    const onSeleccionar = vi.fn();
    render(<CategoriasSection categorias={categorias} onSeleccionar={onSeleccionar} />);
    await userEvent.click(screen.getByRole('button', { name: /cena/i }));
    expect(onSeleccionar).toHaveBeenCalledWith('Cena');
  });
});

describe('ofertas', () => {
  it('<OfertasSection /> no renderiza nada si no hay ofertas', () => {
    const { container } = render(<OfertasSection productos={[]} onAgregar={() => {}} onVerDetalle={() => {}} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('<OfertasSection /> lista los productos en oferta', () => {
    render(<OfertasSection productos={[conOferta]} onAgregar={() => {}} onVerDetalle={() => {}} />);
    expect(screen.getByRole('heading', { name: 'Ofertas' })).toBeInTheDocument();
    expect(screen.getAllByTestId('producto')).toHaveLength(1);
  });

  it('<ProductCard /> muestra precio tachado, precio final y porcentaje', () => {
    render(<ProductCard producto={conOferta} onAgregar={() => {}} onVerDetalle={() => {}} />);
    expect(screen.getByText('-22%')).toBeInTheDocument();
    expect(screen.getByText('$8.900').tagName).toBe('DEL');
    expect(screen.getByText('$6.900')).toBeInTheDocument();
  });

  it('<ProductCard /> sin oferta no muestra insignia ni precio tachado', () => {
    render(<ProductCard producto={sinOferta} onAgregar={() => {}} onVerDetalle={() => {}} />);
    expect(screen.queryByText(/^-\d+%$/)).not.toBeInTheDocument();
    expect(document.querySelector('del')).toBeNull();
  });
});
