import { useMemo } from 'react';
import ProductCard from './ProductCard.jsx';

const normalizar = (t) => t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

/* Listado de productos con pestañas por categoría.
   El texto de búsqueda llega desde el encabezado (ya validado).
   Props: productos, categorias, categoria, busqueda,
          onCategoria(nombre), onLimpiar(), onAgregar(p), onVerDetalle(p) */
export default function MenuSection({
  productos, categorias, categoria, busqueda, onCategoria, onLimpiar, onAgregar, onVerDetalle
}) {
  const visibles = useMemo(() => {
    const q = normalizar(busqueda.trim());
    // Con texto se busca en TODO el menú; sin texto, solo en la categoría activa.
    return productos.filter((p) =>
      q ? normalizar(`${p.nombre} ${p.ingredientes}`).includes(q) : p.categoria === categoria
    );
  }, [productos, categoria, busqueda]);

  return (
    <section id="menu" className="lcn-section">
      <div className="container">
        <div className="lcn-panel">
          <header className="lcn-section-title">
            <span>Conoce nuestro</span>
            <h2>Delicioso menú</h2>
          </header>

          <ul className="nav nav-pills justify-content-center gap-2 mb-4" role="tablist">
            {categorias.map((c) => (
              <li className="nav-item" key={c} role="presentation">
                <button
                  type="button"
                  role="tab"
                  aria-selected={!busqueda && c === categoria}
                  className={`nav-link lcn-tab ${!busqueda && c === categoria ? 'active' : ''}`}
                  onClick={() => onCategoria(c)}
                >
                  {c}
                </button>
              </li>
            ))}
          </ul>

          {busqueda && (
            <p className="text-center">
              Resultados para «<strong>{busqueda}</strong>»{' '}
              <button type="button" className="btn btn-sm btn-outline-secondary ms-2" onClick={onLimpiar}>Limpiar búsqueda</button>
            </p>
          )}

          {visibles.length > 0 ? (
            <div className="row g-4">
              {visibles.map((p) => (
                <div className="col-12 col-sm-6 col-lg-4" key={p.id}>
                  <ProductCard producto={p} onAgregar={onAgregar} onVerDetalle={onVerDetalle} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted mb-0" role="status">No encontramos platos con esa búsqueda.</p>
          )}
        </div>
      </div>
    </section>
  );
}
