/* Tarjetas de categorías (Figura 1 y 4).
   Props: categorias [{ nombre, imagen, cantidad }], onSeleccionar(nombre) */
export default function CategoriasSection({ categorias, onSeleccionar }) {
  return (
    <section id="categorias" className="lcn-section">
      <div className="container">
        <div className="lcn-panel">
          <header className="lcn-section-title">
            <span>Explora</span>
            <h2>Categorías</h2>
          </header>
          <div className="row g-3 justify-content-center">
            {categorias.map((c) => (
              <div className="col-6 col-md-3" key={c.nombre}>
                <button type="button" className="card lcn-card lcn-categoria h-100 w-100 text-center" onClick={() => onSeleccionar(c.nombre)}>
                  <img src={c.imagen} alt="" className="card-img-top" loading="lazy" />
                  <div className="card-body py-2">
                    <h3 className="h6 mb-0">{c.nombre}</h3>
                    <small className="text-muted">{c.cantidad} {c.cantidad === 1 ? 'plato' : 'platos'}</small>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
