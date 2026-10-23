import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Carousel from './Carousel.jsx';

const slides = [
  { imagen: 'a.jpg', titulo: 'Uno', texto: 't1' },
  { imagen: 'b.jpg', titulo: 'Dos', texto: 't2' },
  { imagen: 'c.jpg', titulo: 'Tres', texto: 't3' }
];
const activo = () => document.querySelector('.carousel-item.active h2').textContent;

afterEach(() => vi.useRealTimers());

describe('<Carousel />', () => {
  it('renderiza todas las diapositivas y activa la primera', () => {
    render(<Carousel slides={slides} />);
    expect(screen.getAllByTestId('slide')).toHaveLength(3);
    expect(activo()).toBe('Uno');
  });

  it('avanza y retrocede con los controles (circular)', async () => {
    render(<Carousel slides={slides} />);
    await userEvent.click(screen.getByRole('button', { name: 'Siguiente' }));
    expect(activo()).toBe('Dos');
    await userEvent.click(screen.getByRole('button', { name: 'Anterior' }));
    await userEvent.click(screen.getByRole('button', { name: 'Anterior' }));
    expect(activo()).toBe('Tres');
  });

  it('salta con los indicadores', async () => {
    render(<Carousel slides={slides} />);
    await userEvent.click(screen.getByRole('button', { name: 'Ir a la diapositiva 3' }));
    expect(activo()).toBe('Tres');
  });

  it('avanza solo con el tiempo (timers falsos)', () => {
    vi.useFakeTimers();
    render(<Carousel slides={slides} intervalo={1000} />);
    act(() => { vi.advanceTimersByTime(1000); });
    expect(activo()).toBe('Dos');
  });
});
