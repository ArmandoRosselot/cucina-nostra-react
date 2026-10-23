import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderConApp } from '../test/utils.jsx';
import Login from './Login.jsx';
import { registrarUsuario, obtenerSesion } from '../data/db.js';

// Mock de la navegación: comprobamos a dónde se redirige sin cambiar de página.
const navegar = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => ({
  ...(await importOriginal()),
  useNavigate: () => navegar
}));

beforeEach(() => navegar.mockClear());

describe('<Login />', () => {
  it('no muestra errores al cargar (renderizado condicional)', () => {
    renderConApp(<Login />);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('el estado del formulario cambia al escribir', async () => {
    renderConApp(<Login />);
    const email = screen.getByLabelText(/correo electrónico/i);
    await userEvent.type(email, 'ana@correo.cl');
    expect(email).toHaveValue('ana@correo.cl');
  });

  it('valida campos vacíos al enviar', async () => {
    renderConApp(<Login />);
    await userEvent.click(screen.getByRole('button', { name: /entrar/i }));
    expect(screen.getByText('El correo es obligatorio.')).toBeInTheDocument();
    expect(screen.getByText('La contraseña es obligatoria.')).toBeInTheDocument();
    expect(navegar).not.toHaveBeenCalled();
  });

  it('muestra error si el correo o la contraseña no coinciden', async () => {
    registrarUsuario({ nombre: 'Ana Silva', email: 'ana@correo.cl', password: 'Pasta2024' });
    renderConApp(<Login />);
    await userEvent.type(screen.getByLabelText(/correo electrónico/i), 'ana@correo.cl');
    await userEvent.type(screen.getByLabelText(/contraseña/i), 'incorrecta');
    await userEvent.click(screen.getByRole('button', { name: /entrar/i }));
    expect(screen.getByRole('alert')).toHaveTextContent(/incorrectos/i);
    expect(obtenerSesion()).toBeNull();
  });

  it('inicia sesión y redirige al inicio con credenciales válidas', async () => {
    registrarUsuario({ nombre: 'Ana Silva', email: 'ana@correo.cl', password: 'Pasta2024' });
    renderConApp(<Login />);
    await userEvent.type(screen.getByLabelText(/correo electrónico/i), 'ana@correo.cl');
    await userEvent.type(screen.getByLabelText(/contraseña/i), 'Pasta2024');
    await userEvent.click(screen.getByRole('button', { name: /entrar/i }));
    expect(obtenerSesion().nombre).toBe('Ana Silva');
    expect(navegar).toHaveBeenCalledWith('/');
  });
});
