import ProductCard from './ProductCard.jsx';

/* Sección de ofertas. Si no hay ofertas no se renderiza (renderizado condicional). */
export default function OfertasSection({ productos, onAgregar, onVerDetalle }) {
  if (productos.length === 0) return null;
  return (
    <section id="ofertas" className="lcn-section">
      <div className="container">
        <div className="lcn-panel">
          <header className="lcn-section-title">
            <span>Aprovecha</span>
            <h2>Ofertas</h2>
          </header>
          <div className="row g-4">
            {productos.map((p) => (
              <div className="col-12 col-sm-6 col-lg-4" key={p.id}>
                <ProductCard producto={p} onAgregar={onAgregar} onVerDetalle={onVerDetalle} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
