import { createContext, useContext, useMemo, useState } from 'react';
import { obtenerSesion, iniciarSesion, cerrarSesion } from '../data/db.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [sesion, setSesion] = useState(() => obtenerSesion());

  const valor = useMemo(
    () => ({
      sesion,
      entrar: (usuario) => {
        iniciarSesion(usuario);
        setSesion(obtenerSesion());
      },
      salir: () => {
        cerrarSesion();
        setSesion(null);
      }
    }),
    [sesion]
  );

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return ctx;
}
