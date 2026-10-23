import '@testing-library/jest-dom/vitest';
import { afterEach, beforeEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Cada prueba parte con localStorage limpio y el DOM desmontado.
beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  cleanup();
});
