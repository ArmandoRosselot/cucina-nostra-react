import { useCart } from '../context/CartContext.jsx';
import { formatearPrecio } from '../utils/validaciones.js';

/* Panel lateral del carrito (Bootstrap offcanvas controlado por estado).
   Props: abierto (bool), onCerrar(), onPedir() */
export default function CartPanel({ abierto, onCerrar, onPedir }) {
  const { detalle, total, cambiar, quitar, vaciar } = useCart();
  if (!abierto) return null;

  return (
    <>
      <div className="offcanvas offcanvas-end show" tabIndex="-1" role="dialog" aria-labelledby="carrito-titulo" style={{ visibility: 'visible' }}>
        <div className="offcanvas-header">
          <h2 id="carrito-titulo" className="offcanvas-title h5"><i className="bi bi-cart3" /> Tu carrito</h2>
          <button type="button" className="btn-close" aria-label="Cerrar carrito" onClick={onCerrar} />
        </div>

        <div className="offcanvas-body d-flex flex-column">
          {detalle.length === 0 ? (
            <p className="text-muted text-center my-auto">Tu carrito está vacío</p>
          ) : (
            <ul className="list-group list-group-flush flex-grow-1 overflow-auto">
              {detalle.map((item) => (
                <li className="list-group-item px-0" key={item.id} data-testid="item-carrito">
                  <div className="d-flex justify-content-between">
                    <strong>{item.nombre}</strong>
                    <button type="button" className="btn btn-sm text-danger p-0" aria-label={`Quitar ${item.nombre}`} onClick={() => quitar(item.id)}>
                      <i className="bi bi-trash" />
                    </button>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-1">
                    <div className="btn-group btn-group-sm" role="group" aria-label={`Cantidad de ${item.nombre}`}>
                      <button type="button" className="btn btn-outline-secondary" aria-label={`Quitar una unidad de ${item.nombre}`} onClick={() => cambiar(item.id, -1)}>−</button>
                      <span className="btn btn-outline-secondary disabled" data-testid="cantidad">{item.cantidad}</span>
                      <button type="button" className="btn btn-outline-secondary" aria-label={`Agregar una unidad de ${item.nombre}`} onClick={() => cambiar(item.id, 1)}>+</button>
                    </div>
                    <span>{formatearPrecio(item.subtotal)}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="border-top pt-3 mt-3">
            <div className="d-flex justify-content-between fs-5 mb-3">
              <span>Total</span>
              <strong data-testid="total-carrito">{formatearPrecio(total)}</strong>
            </div>
            <div className="d-grid gap-2">
              <button type="button" className="btn lcn-btn-primary" disabled={detalle.length === 0} onClick={onPedir}>
                Realizar pedido
              </button>
              <button type="button" className="btn btn-outline-secondary" disabled={detalle.length === 0} onClick={vaciar}>
                Vaciar carrito
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="offcanvas-backdrop fade show" onClick={onCerrar} />
    </>
  );
}
