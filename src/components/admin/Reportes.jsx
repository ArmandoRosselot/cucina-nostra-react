import React, { useState } from 'react';

export default function Reportes({ onVolver }) {
  const [periodo, setPeriodo] = useState('Este Mes');

  // Datos simulados de reportes según el período
  const topPlatos = [
    { nombre: 'Lasagna della Nonna', categoria: 'Plato de fondo', unidades: 142, totalVendido: 1689800 },
    { nombre: 'Pizza Prosciutto', categoria: 'Plato de fondo', unidades: 128, totalVendido: 1600000 },
    { nombre: 'Spaghetti Carbonara', categoria: 'Plato de fondo', unidades: 115, totalVendido: 1207500 },
    { nombre: 'Bruschetta tradicional', categoria: 'Entradas', unidades: 98, totalVendido: 539000 },
    { nombre: 'Cornetto con Cappuccino', categoria: 'Desayunos', unidades: 85, totalVendido: 671500 }
  ];

  const ventasPorCategoria = [
    { categoria: 'Platos de Fondo', porcentaje: '48%', monto: 8450000 },
    { categoria: 'Entradas & Antipastos', porcentaje: '22%', monto: 3870000 },
    { categoria: 'Desayunos & Cafetería', porcentaje: '15%', monto: 2630000 },
    { categoria: 'Postres & Gelato', porcentaje: '10%', monto: 1750000 },
    { categoria: 'Vinos & Bebidas', porcentaje: '5%', monto: 880000 }
  ];

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h1 className="page-title">Reportes y Estadísticas</h1>
          <p className="page-subtitle mb-0">Informes detallados sobre el rendimiento comercial y operativo del restaurante</p>
        </div>
        <button className="btn btn-outline-secondary btn-sm" onClick={onVolver}>
          ← Volver al Dashboard
        </button>
      </div>

      {/* Filtro de Período */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body d-flex align-items-center justify-content-between flex-wrap gap-3">
          <span className="fw-bold text-secondary">Período del Reporte:</span>
          <div className="btn-group" role="group">
            {['Hoy', 'Esta Semana', 'Este Mes', 'Año 2026'].map((p) => (
              <button
                key={p}
                type="button"
                className={`btn btn-sm ${periodo === p ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setPeriodo(p)}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Resumen KPI del Reporte */}
      <div className="row g-4 mb-4">
        <div className="col-12 col-md-3">
          <div className="card border-0 shadow-sm p-3 text-center bg-white">
            <span className="text-muted small fw-bold">VENTAS TOTALES</span>
            <h3 className="fw-bold text-success my-2">$17.580.000</h3>
            <span className="text-success small fw-bold">↑ +14.2% vs período anterior</span>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className="card border-0 shadow-sm p-3 text-center bg-white">
            <span className="text-muted small fw-bold">ÓRDENES COMPLETADAS</span>
            <h3 className="fw-bold text-primary my-2">1.234</h3>
            <span className="text-secondary small">Ticket promedio: $14.246</span>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className="card border-0 shadow-sm p-3 text-center bg-white">
            <span className="text-muted small fw-bold">PLATOS SERVIDOS</span>
            <h3 className="fw-bold text-dark my-2">2.568</h3>
            <span className="text-muted small">Promedio: 2.08 platos/orden</span>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className="card border-0 shadow-sm p-3 text-center bg-white">
            <span className="text-muted small fw-bold">SATISFACCIÓN CLIENTES</span>
            <h3 className="fw-bold text-warning my-2">4.8 / 5.0 ★</h3>
            <span className="text-muted small">Basado en 340 evaluaciones</span>
          </div>
        </div>
      </div>

      {/* Tablas de Reportes */}
      <div className="row g-4">
        {/* Platos más vendidos */}
        <div className="col-12 col-lg-7">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white py-3">
              <h3 className="h6 mb-0 fw-bold">🍝 Platillos Más Vendidos</h3>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th className="ps-4">Platillo</th>
                      <th>Categoría</th>
                      <th>Unidades</th>
                      <th className="text-end pe-4">Total Recaudado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topPlatos.map((plato, index) => (
                      <tr key={index}>
                        <td className="ps-4 fw-bold">{plato.nombre}</td>
                        <td><span className="badge bg-light text-dark border">{plato.categoria}</span></td>
                        <td className="fw-bold">{plato.unidades} u.</td>
                        <td className="text-end pe-4 fw-bold text-success">
                          ${plato.totalVendido.toLocaleString('es-CL')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Ventas por Categoría */}
        <div className="col-12 col-lg-5">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white py-3">
              <h3 className="h6 mb-0 fw-bold">📊 Distribución de Ventas por Categoría</h3>
            </div>
            <div className="card-body">
              <div className="list-group list-group-flush">
                {ventasPorCategoria.map((cat, idx) => (
                  <div key={idx} className="list-group-item d-flex justify-content-between align-items-center px-0">
                    <div>
                      <h6 className="mb-0 fw-bold">{cat.categoria}</h6>
                      <small className="text-muted">Participación: {cat.porcentaje}</small>
                    </div>
                    <span className="fw-bold text-primary">${cat.monto.toLocaleString('es-CL')}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}