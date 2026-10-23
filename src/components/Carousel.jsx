import { useEffect, useState } from 'react';

/* Carrusel de banners (Bootstrap carousel controlado con estado).
   Props: slides [{ imagen, titulo, texto }], intervalo (ms) */
export default function Carousel({ slides, intervalo = 5000 }) {
  const [indice, setIndice] = useState(0);
  const [pausado, setPausado] = useState(false);

  useEffect(() => {
    if (pausado || slides.length < 2) return undefined;
    const t = setInterval(() => setIndice((i) => (i + 1) % slides.length), intervalo);
    return () => clearInterval(t);
  }, [pausado, slides.length, intervalo]);

  const mover = (delta) => setIndice((i) => (i + delta + slides.length) % slides.length);

  return (
    <section id="inicio" className="container pt-3">
      <div
        className="carousel slide lcn-carousel"
        onMouseEnter={() => setPausado(true)}
        onMouseLeave={() => setPausado(false)}
      >
        <div className="carousel-indicators">
          {slides.map((s, i) => (
            <button key={s.titulo} type="button" className={i === indice ? 'active' : ''}
              aria-label={`Ir a la diapositiva ${i + 1}`} onClick={() => setIndice(i)} />
          ))}
        </div>

        <div className="carousel-inner">
          {slides.map((s, i) => (
            <div key={s.titulo} className={`carousel-item ${i === indice ? 'active' : ''}`} data-testid="slide">
              <img src={s.imagen} className="d-block w-100 lcn-slide-img" alt="" />
              <div className="lcn-slide-caption">
                <h2>{s.titulo}</h2>
                <p className="mb-0">{s.texto}</p>
              </div>
            </div>
          ))}
        </div>

        <button type="button" className="carousel-control-prev" aria-label="Anterior" onClick={() => mover(-1)}>
          <span className="carousel-control-prev-icon" aria-hidden="true" />
        </button>
        <button type="button" className="carousel-control-next" aria-label="Siguiente" onClick={() => mover(1)}>
          <span className="carousel-control-next-icon" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
