import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MenuSection from './MenuSection.jsx';
import { PRODUCTOS_INICIALES, CATEGORIAS } from '../data/db.js';

const montar = (props = {}) =>
  render(
    <MenuSection
      productos={PRODUCTOS_INICIALES} categorias={CATEGORIAS} categoria="Entradas" busqueda=""
      onCategoria={() => {}} onLimpiar={() => {}} onAgregar={() => {}} onVerDetalle={() => {}} {...props}
    />
  );

describe('<MenuSection />', () => {
  it('renderiza todos los platos de la categoría activa', () => {
    montar();
    const entradas = PRODUCTOS_INICIALES.filter((p) => p.categoria === 'Entradas');
    expect(screen.getAllByTestId('producto')).toHaveLength(entradas.length);
  });

  it('muestra las pestañas y avisa la categoría elegida (evento + mock)', async () => {
    const onCategoria = vi.fn();
    montar({ onCategoria });
    await userEvent.click(screen.getByRole('tab', { name: 'Cena' }));
    expect(onCategoria).toHaveBeenCalledWith('Cena');
  });

  it('filtra por texto en todo el menú, sin importar tildes ni mayúsculas', () => {
    montar({ busqueda: 'RUCULA' });
    expect(screen.getByText('Pizza Prosciutto')).toBeInTheDocument();
    expect(screen.queryByText('Bomboloni')).not.toBeInTheDocument();
  });

  it('renderizado condicional: mensaje solo cuando no hay resultados', () => {
    const { unmount } = montar();
    expect(screen.queryByText(/no encontramos platos/i)).not.toBeInTheDocument();
    unmount();
    montar({ busqueda: 'sushi' });
    expect(screen.getByText(/no encontramos platos/i)).toBeInTheDocument();
  });

  it('con búsqueda activa muestra "Limpiar búsqueda" y lo ejecuta', async () => {
    const onLimpiar = vi.fn();
    montar({ busqueda: 'pizza', onLimpiar });
    await userEvent.click(screen.getByRole('button', { name: /limpiar búsqueda/i }));
    expect(onLimpiar).toHaveBeenCalledTimes(1);
  });
});
