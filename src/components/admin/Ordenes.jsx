import React, { useState } from 'react';

const INITIAL_BOLETAS = [
  { id: 'B-1048', cliente: 'Mesa 4 (Juan Pérez)', fecha: '2026-10-22 14:30', pago: 'Tarjeta de Débito', total: 42500, estado: 'Emitida' },
  { id: 'B-1047', cliente: 'Mesa 2 (María Gómez)', fecha: '2026-10-22 14:15', pago: 'Efectivo', total: 18900, estado: 'Emitida' },
  { id: 'B-1046', cliente: 'Pedido Delivery #88', fecha: '2026-10-22 13:50', pago: 'Transferencia', total: 31200, estado: 'Emitida' },
  { id: 'B-1045', cliente: 'Mesa 7 (Carlos Ruiz)', fecha: '2026-10-22 13:10', pago: 'Tarjeta de Crédito', total: 65000, estado: 'Anulada' },
  { id: 'B-1044', cliente: 'Mesa 1 (Laura S.)', fecha: '2026-10-22 12:45', pago: 'Tarjeta de Débito', total: 27400, estado: 'Emitida' }
];

export default function Ordenes({ onVolver }) {
  const [boletas] = useState(INITIAL_BOLETAS);
  const [filtroPago, setFiltroPago] = useState('Todos');

  const boletasFiltradas = boletas.filter(b => 
    filtroPago === 'Todos' || b.pago === filtroPago
  );

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h1 className="page-title">Órdenes y Boletas Emitidas</h1>
          <p className="page-subtitle mb-0">Resumen detallado de la facturación y ventas del restaurante</p>
        </div>
        <button className="btn btn-outline-secondary btn-sm" onClick={onVolver}>
          ← Volver al Dashboard
        </button>
      </div>

      {/* Filtros por Medio de Pago */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body d-flex align-items-center justify-content-between flex-wrap gap-3">
          <span className="fw-bold text-secondary">Filtrar por medio de pago:</span>
          <div className="btn-group" role="group">
            {['Todos', 'Efectivo', 'Tarjeta de Débito', 'Tarjeta de Crédito', 'Transferencia'].map((medio) => (
              <button
                key={medio}
                type="button"
                className={`btn btn-sm ${filtroPago === medio ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setFiltroPago(medio)}
              >
                {medio}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tabla de Boletas */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="ps-4">N° Boleta</th>
                  <th>Mesa / Cliente</th>
                  <th>Fecha y Hora</th>
                  <th>Medio de Pago</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th className="text-end pe-4">Acción</th>
                </tr>
              </thead>
              <tbody>
                {boletasFiltradas.length > 0 ? (
                  boletasFiltradas.map((item) => (
                    <tr key={item.id}>
                      <td className="ps-4 fw-bold">{item.id}</td>
                      <td>{item.cliente}</td>
                      <td className="text-muted small">{item.fecha}</td>
                      <td>
                        <span className="badge bg-light text-dark border">
                          {item.pago}
                        </span>
                      </td>
                      <td className="fw-bold">${item.total.toLocaleString('es-CL')}</td>
                      <td>
                        <span className={`badge ${item.estado === 'Emitida' ? 'bg-success' : 'bg-danger'}`}>
                          {item.estado}
                        </span>
                      </td>
                      <td className="text-end pe-4">
                        <button className="btn btn-sm btn-outline-dark me-2" title="Imprimir PDF">
                          📄 PDF
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4 text-muted">
                      No se encontraron boletas asociadas al filtro seleccionado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}