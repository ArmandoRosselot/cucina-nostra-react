import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { CATEGORIAS } from '../data/db.js';
import { validarBusqueda, formatearPrecio } from '../utils/validaciones.js';

/* Encabezado según el template (Figura 1):
   fila 1 -> logo | buscador | Iniciar Sesión / Crear Cuenta
   fila 2 -> Home, Categorías ▾, Ofertas, Nosotros, Blog, Contacto + botón del carrito con el monto
   Props: onAbrirCarrito(), onBuscar(texto), onCategoria(nombre) */
export default function Navbar({ onAbrirCarrito, onBuscar, onCategoria }) {
  const [abierto, setAbierto] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [texto, setTexto] = useState('');
  const [error, setError] = useState('');
  const { sesion, salir } = useAuth();
  const { unidades, total } = useCart();
  const cerrar = () => { setAbierto(false); setDropdown(false); };

  const buscar = (e) => {
    e.preventDefault();
    const mensaje = validarBusqueda(texto);
    setError(mensaje);
    if (mensaje) return;
    onBuscar(texto.trim());
    cerrar();
  };

  return (
    <header className="lcn-navbar sticky-top">
      <div className="container py-2">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
          <Link className="d-flex align-items-center gap-2 text-decoration-none" to="/" onClick={cerrar}>
            <img src="/img/logo.jpg" alt="Logo La Cucina Nostra" className="lcn-logo-nav" />
            <span className="lcn-brand d-none d-sm-inline">La Cucina Nostra</span>
          </Link>

          <form className="lcn-buscador order-3 order-md-2" role="search" onSubmit={buscar} noValidate>
            <div className="input-group input-group-sm">
              <input
                type="search"
                className={`form-control ${error ? 'is-invalid' : ''}`}
                placeholder="Buscar"
                aria-label="Buscar plato"
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
              />
              <button type="submit" className="btn btn-outline-success">Buscar</button>
            </div>
            {error && <div className="text-danger small" role="alert">{error}</div>}
          </form>

          <div className="d-flex align-items-center gap-2 order-2 order-md-3">
            {sesion ? (
              <>
                <span className="lcn-saludo small" data-testid="saludo">Hola, {sesion.nombre.split(' ')[0]}</span>
                <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => { salir(); cerrar(); }}>
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link className="btn btn-sm btn-outline-primary" to="/login">Iniciar Sesión</Link>
                <Link className="btn btn-sm btn-primary" to="/register">Crear Cuenta</Link>
              </>
            )}
          </div>
        </div>

        <div className="d-flex justify-content-center d-lg-none mt-2">
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            aria-label="Abrir menú de navegación"
            aria-expanded={abierto}
            onClick={() => setAbierto((v) => !v)}
          >
            <i className="bi bi-list" /> Menú
          </button>
        </div>

        <nav className={`collapse d-lg-flex justify-content-center align-items-center gap-1 mt-2 ${abierto ? 'show' : ''}`} aria-label="Principal">
          <ul className="nav justify-content-center align-items-center">
            <li className="nav-item"><Link className="nav-link" to="/#inicio" onClick={cerrar}>Home</Link></li>

            <li className="nav-item dropdown">
              <button
                type="button"
                className="nav-link btn btn-link dropdown-toggle"
                aria-expanded={dropdown}
                onClick={() => setDropdown((v) => !v)}
              >
                Categorías
              </button>
              <ul className={`dropdown-menu ${dropdown ? 'show' : ''}`}>
                {CATEGORIAS.map((c) => (
                  <li key={c}>
                    <button type="button" className="dropdown-item" onClick={() => { onCategoria(c); cerrar(); }}>{c}</button>
                  </li>
                ))}
              </ul>
            </li>

            <li className="nav-item"><Link className="nav-link" to="/#ofertas" onClick={cerrar}>Ofertas</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/#about" onClick={cerrar}>Nosotros</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/#blog" onClick={cerrar}>Blog</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/#contacto" onClick={cerrar}>Contacto</Link></li>
          </ul>

          <button type="button" className="btn btn-sm lcn-btn-cart" aria-label="Ver carrito" onClick={() => { onAbrirCarrito(); cerrar(); }}>
            <i className="bi bi-cart3" /> Carrito {formatearPrecio(total)}
            <span className="badge rounded-pill ms-2" data-testid="contador-carrito">{unidades}</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
