import { formatearPrecio } from '../utils/validaciones.js';
import { precioFinal } from '../utils/carrito.js';

/* Modal de detalle. Si 'producto' es null no se renderiza nada. */
export default function ProductDetailModal({ producto, onCerrar, onAgregar }) {
  if (!producto) return null;
  return (
    <>
      <div className="modal d-block" tabIndex="-1" role="dialog" aria-modal="true" aria-labelledby="detalle-titulo" onClick={onCerrar}>
        <div className="modal-dialog modal-dialog-centered modal-lg" onClick={(e) => e.stopPropagation()}>
          <div className="modal-content lcn-modal">
            <button type="button" className="btn-close lcn-cerrar" aria-label="Cerrar" onClick={onCerrar} />
            <div className="row g-0">
              <div className="col-md-6">
                <img src={producto.imagen} alt={producto.nombre} className="img-fluid w-100 h-100 lcn-detalle-img" />
              </div>
              <div className="col-md-6 p-4 d-flex flex-column justify-content-center">
                <span className="lcn-kicker">{producto.categoria}</span>
                <h2 id="detalle-titulo" className="h3">{producto.nombre}</h2>
                <p>{producto.ingredientes}</p>
                <p className="lcn-precio fs-4 fw-bold">{formatearPrecio(precioFinal(producto))}</p>
                <button type="button" className="btn lcn-btn-primary" onClick={() => { onAgregar(producto); onCerrar(); }}>
                  <i className="bi bi-cart-plus" /> Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop show" />
    </>
  );
}
