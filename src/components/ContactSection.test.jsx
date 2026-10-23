import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactSection from './ContactSection.jsx';
import { obtenerMensajes } from '../data/db.js';

const llenar = async (nombre = 'Ana Silva', email = 'ana@correo.cl', mensaje = 'Quiero reservar una mesa') => {
  await userEvent.type(screen.getByLabelText('Nombre y apellido'), nombre);
  await userEvent.type(screen.getByLabelText('Correo electrónico'), email);
  await userEvent.type(screen.getByLabelText('Mensaje'), mensaje);
};

describe('<ContactSection />', () => {
  it('no muestra errores al inicio y los muestra al enviar vacío', async () => {
    render(<ContactSection />);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /enviar mensaje/i }));
    expect(screen.getByText('El nombre es obligatorio.')).toBeInTheDocument();
    expect(screen.getByText('El correo es obligatorio.')).toBeInTheDocument();
    expect(screen.getByText('El mensaje es obligatorio.')).toBeInTheDocument();
    expect(obtenerMensajes()).toHaveLength(0);
  });

  it('rechaza un mensaje demasiado corto', async () => {
    render(<ContactSection />);
    await llenar('Ana Silva', 'ana@correo.cl', 'hola');
    await userEvent.click(screen.getByRole('button', { name: /enviar mensaje/i }));
    expect(screen.getByText(/al menos 10 caracteres/i)).toBeInTheDocument();
  });

  it('guarda el mensaje, muestra confirmación y limpia el formulario', async () => {
    render(<ContactSection />);
    await llenar();
    await userEvent.click(screen.getByRole('button', { name: /enviar mensaje/i }));
    expect(obtenerMensajes()).toHaveLength(1);
    expect(screen.getByRole('status')).toHaveTextContent(/gracias/i);
    expect(screen.getByLabelText('Nombre y apellido')).toHaveValue('');
  });
});
