export default function Historias() {
  return (
    <section id="blog" className="lcn-section">
      <div className="container">
        <div className="lcn-panel">
          <header className="lcn-section-title">
            <span>Nuestras historias</span>
            <h2>Blog</h2>
          </header>

          <div className="row gy-4 align-items-center mb-4">
            <div className="col-lg-6">
              <h3 className="h4">Caso curioso #1</h3>
              <p>Descubre cómo nuestra receta de pasta fresca se transformó en el plato insignia de La Cucina Nostra, inspirada en recetas familiares traídas desde Italia hace más de tres generaciones.</p>
            </div>
            <div className="col-lg-6"><img src="/img/events-1.jpg" alt="Caso curioso 1" className="img-fluid rounded-4" /></div>
          </div>

          <div className="row gy-4 align-items-center">
            <div className="col-lg-6 order-2 order-lg-1"><img src="/img/events-2.jpg" alt="Caso curioso 2" className="img-fluid rounded-4" /></div>
            <div className="col-lg-6 order-1 order-lg-2">
              <h3 className="h4">Caso curioso #2</h3>
              <p>La historia detrás de nuestro horno de leña: un elemento clave que le da a cada pizza su sabor característico y que ha sido parte del restaurante desde su primer día de apertura.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
