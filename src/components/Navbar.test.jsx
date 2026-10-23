import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderConApp } from '../test/utils.jsx';
import Navbar from './Navbar.jsx';

const montar = (props = {}) =>
  renderConApp(<Navbar onAbrirCarrito={() => {}} onBuscar={() => {}} onCategoria={() => {}} {...props} />);

describe('<Navbar />', () => {
  it('muestra el buscador, los botones de sesión y los enlaces del template', () => {
    montar();
    expect(screen.getByRole('search')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Iniciar Sesión' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Crear Cuenta' })).toBeInTheDocument();
    ['Home', 'Ofertas', 'Nosotros', 'Blog', 'Contacto'].forEach((n) =>
      expect(screen.getByRole('link', { name: n })).toBeInTheDocument());
    expect(screen.getByRole('button', { name: 'Categorías' })).toBeInTheDocument();
  });

  it('el botón del carrito muestra el monto', () => {
    montar();
    expect(screen.getByRole('button', { name: /ver carrito/i })).toHaveTextContent('Carrito $0');
  });

  it('envía el texto buscado (sin espacios sobrantes) a onBuscar', async () => {
    const onBuscar = vi.fn();
    montar({ onBuscar });
    await userEvent.type(screen.getByLabelText(/buscar plato/i), '  pizza  ');
    await userEvent.click(screen.getByRole('button', { name: 'Buscar' }));
    expect(onBuscar).toHaveBeenCalledWith('pizza');
  });

  it('validación: no busca y muestra error con caracteres no permitidos', async () => {
    const onBuscar = vi.fn();
    montar({ onBuscar });
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    await userEvent.type(screen.getByLabelText(/buscar plato/i), '<b>');
    await userEvent.click(screen.getByRole('button', { name: 'Buscar' }));
    expect(screen.getByRole('alert')).toHaveTextContent(/no permitidos/i);
    expect(onBuscar).not.toHaveBeenCalled();
  });

  it('el menú Categorías se abre y entrega la categoría elegida', async () => {
    const onCategoria = vi.fn();
    montar({ onCategoria });
    await userEvent.click(screen.getByRole('button', { name: 'Categorías' }));
    await userEvent.click(screen.getByRole('button', { name: 'Almuerzo' }));
    expect(onCategoria).toHaveBeenCalledWith('Almuerzo');
  });

  it('el botón del carrito llama a onAbrirCarrito', async () => {
    const onAbrirCarrito = vi.fn();
    montar({ onAbrirCarrito });
    await userEvent.click(screen.getByRole('button', { name: /ver carrito/i }));
    expect(onAbrirCarrito).toHaveBeenCalledTimes(1);
  });
});
