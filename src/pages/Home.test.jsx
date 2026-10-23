import { describe, it, expect } from 'vitest';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderConApp } from '../test/utils.jsx';
import Home from './Home.jsx';
import { registrarUsuario, iniciarSesion } from '../data/db.js';

describe('<Home /> (integración)', () => {
  it('muestra portada, secciones y enlaces de sesión', () => {
    renderConApp(<Home />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/comida italiana/i);
    expect(screen.getByRole('heading', { name: /sobre nosotros/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /iniciar sesión/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /crear cuenta/i })).toBeInTheDocument();
  });

  it('incluye carrusel, categorías, ofertas y contacto', () => {
    renderConApp(<Home />);
    expect(screen.getAllByTestId('slide').length).toBeGreaterThan(1);
    expect(screen.getByRole('heading', { name: 'Categorías' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Ofertas' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Contacto' })).toBeInTheDocument();
  });

  it('la búsqueda del encabezado filtra el menú', async () => {
    renderConApp(<Home />);
    await userEvent.type(screen.getByLabelText(/buscar plato/i), 'carbonara');
    await userEvent.click(screen.getByRole('button', { name: 'Buscar' }));
    expect(screen.getByText(/resultados para/i)).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /limpiar búsqueda/i }));
    expect(screen.queryByText(/resultados para/i)).not.toBeInTheDocument();
  });

  it('elegir una categoría muestra sus platos en el menú', async () => {
    renderConApp(<Home />);
    await userEvent.click(screen.getByRole('tab', { name: 'Cena' }));
    expect(screen.getByRole('tab', { name: 'Cena' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Ravioli di Ricotta')).toBeInTheDocument();
  });

  it('agregar un plato actualiza el contador del navbar y muestra un aviso', async () => {
    renderConApp(<Home />);
    expect(screen.getByTestId('contador-carrito')).toHaveTextContent('0');
    await userEvent.click(screen.getAllByRole('button', { name: /^agregar$/i })[0]);
    expect(screen.getByTestId('contador-carrito')).toHaveTextContent('1');
    expect(screen.getByRole('button', { name: /ver carrito/i })).not.toHaveTextContent('Carrito $0');
    expect(screen.getByRole('status')).toHaveTextContent(/se agregó al carrito/i);
  });

  it('abre y cierra el detalle de un producto', async () => {
    renderConApp(<Home />);
    await userEvent.click(screen.getByRole('button', { name: /ver detalle de bruschetta/i }));
    const dialogo = screen.getByRole('dialog');
    expect(within(dialogo).getByRole('heading', { name: /bruschetta tradicional/i })).toBeInTheDocument();
    await userEvent.click(within(dialogo).getByRole('button', { name: /cerrar/i }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('con sesión iniciada muestra el saludo y oculta login/registro', () => {
    const { usuario } = registrarUsuario({ nombre: 'Ana Silva', email: 'ana@correo.cl', password: 'Pasta2024' });
    iniciarSesion(usuario);
    renderConApp(<Home />);
    expect(screen.getByTestId('saludo')).toHaveTextContent('Hola, Ana');
    expect(screen.queryByRole('link', { name: /iniciar sesión/i })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cerrar sesión/i })).toBeInTheDocument();
  });

  it('cerrar sesión vuelve a mostrar login/registro', async () => {
    const { usuario } = registrarUsuario({ nombre: 'Ana Silva', email: 'ana@correo.cl', password: 'Pasta2024' });
    iniciarSesion(usuario);
    renderConApp(<Home />);
    await userEvent.click(screen.getByRole('button', { name: /cerrar sesión/i }));
    expect(screen.getByRole('link', { name: /iniciar sesión/i })).toBeInTheDocument();
  });
});
