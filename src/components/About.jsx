const PUNTOS = [
  { icono: 'bi-egg-fried', titulo: 'Recetas de familia', texto: 'Pastas, pizzas y salsas inspiradas en recetas tradicionales traídas desde Italia.' },
  { icono: 'bi-basket2', titulo: 'Ingredientes frescos', texto: 'Seleccionamos cuidadosamente cada ingrediente para que el sabor sea auténtico.' },
  { icono: 'bi-heart', titulo: 'Como en casa', texto: 'Te recibimos como parte de la familia: siempre tendrás un lugar en nuestra mesa.' }
];

export default function About() {
  return (
    <section id="about" className="lcn-section">
      <div className="container">
        <div className="lcn-panel">
          <header className="lcn-section-title">
            <span>Conoce más</span>
            <h2>Sobre nosotros</h2>
          </header>

          <div className="row gy-4 align-items-center">
            <div className="col-lg-6">
              <img src="/img/about.jpg" alt="Interior del restaurante" className="img-fluid rounded-4 shadow-sm" />
            </div>
            <div className="col-lg-6">
              <p className="fst-italic">
                En La Cucina Nostra queremos compartir contigo nuestra pasión por la cocina italiana y por esos
                momentos especiales que nacen alrededor de una buena mesa.
              </p>
              <div className="row g-3">
                {PUNTOS.map((p) => (
                  <div className="col-12" key={p.titulo}>
                    <div className="d-flex gap-3">
                      <i className={`bi ${p.icono} lcn-icono`} aria-hidden="true" />
                      <div>
                        <h3 className="h6 mb-1">{p.titulo}</h3>
                        <p className="mb-0 small">{p.texto}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
