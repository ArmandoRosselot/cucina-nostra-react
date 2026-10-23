import { formatearPrecio } from '../utils/validaciones.js';
import { precioFinal, descuentoPorcentaje } from '../utils/carrito.js';

/* Tarjeta de un plato (Single Responsibility: solo muestra un producto).
   Props:
     - producto: { id, nombre, ingredientes, precio, precioOferta?, imagen }
     - onAgregar(producto): se llama al presionar "Agregar"
     - onVerDetalle(producto): se llama al abrir el detalle */
export default function ProductCard({ producto, onAgregar, onVerDetalle }) {
  const descuento = descuentoPorcentaje(producto);

  return (
    <article className="card h-100 lcn-card position-relative" data-testid="producto">
      {descuento > 0 && <span className="badge lcn-badge-oferta">-{descuento}%</span>}
      <button
        type="button"
        className="lcn-card-img-btn"
        onClick={() => onVerDetalle(producto)}
        aria-label={`Ver detalle de ${producto.nombre}`}
      >
        <img src={producto.imagen} alt={producto.nombre} className="card-img-top" loading="lazy" />
      </button>
      <div className="card-body d-flex flex-column">
        <h3 className="h5 card-title">{producto.nombre}</h3>
        <p className="card-text small text-muted flex-grow-1">{producto.ingredientes}</p>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            {descuento > 0 && <del className="text-muted small me-2">{formatearPrecio(producto.precio)}</del>}
            <strong className="lcn-precio">{formatearPrecio(precioFinal(producto))}</strong>
          </div>
          <button type="button" className="btn btn-sm lcn-btn-primary" onClick={() => onAgregar(producto)}>
            <i className="bi bi-cart-plus" /> Agregar
          </button>
        </div>
      </div>
    </article>
  );
}
