import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LaCucinaNostraAdmin.css';

// Importación de los componentes independientes
import Ordenes from './Ordenes';
import Productos from './Productos';
import Categorias from './Categorias';
import Usuarios from './Usuarios';
import Reportes from './Reportes';
import Perfil from './Perfil';

export default function LaCucinaNostraAdmin() {
  const [activeTab, setActiveTab] = useState('Dashboard');

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Encabezado Superior */}
      <header className="top-header">
        <span>La Cucina Nostra - Panel Administrativo</span>
      </header>

      <div className="container-fluid flex-grow-1 p-0">
        <div className="row g-0 admin-container">
          
          {/* ================= SIDEBAR ================= */}
          <aside className="col-12 col-md-3 col-lg-2 sidebar">
            <div>
              <nav className="sidebar-nav">
                {/* Dashboard Link */}
                <a
                  href="#dashboard"
                  className={`nav-link-custom ${activeTab === 'Dashboard' ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); setActiveTab('Dashboard'); }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
                  </svg>
                  <span>Dashboard</span>
                </a>

                {/* Órdenes Link */}
                <a
                  href="#ordenes"
                  className={`nav-link-custom ${activeTab === 'Órdenes' ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); setActiveTab('Órdenes'); }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  <span>Órdenes</span>
                </a>

                {/* Productos Link */}
                <a
                  href="#productos"
                  className={`nav-link-custom ${activeTab === 'Productos' ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); setActiveTab('Productos'); }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                  <span>Productos</span>
                </a>

                {/* Categorías Link */}
                <a
                  href="#categorias"
                  className={`nav-link-custom ${activeTab === 'Categorías' ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); setActiveTab('Categorías'); }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="8" y1="6" x2="21" y2="6" />
                    <line x1="8" y1="12" x2="21" y2="12" />
                    <line x1="8" y1="18" x2="21" y2="18" />
                    <line x1="3" y1="6" x2="3.01" y2="6" />
                    <line x1="3" y1="12" x2="3.01" y2="12" />
                    <line x1="3" y1="18" x2="3.01" y2="18" />
                  </svg>
                  <span>Categorías</span>
                </a>

                {/* Usuarios Link */}
                <a
                  href="#usuarios"
                  className={`nav-link-custom ${activeTab === 'Usuarios' ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); setActiveTab('Usuarios'); }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  <span>Usuarios</span>
                </a>

                {/* Reportes Link */}
                <a
                  href="#reportes"
                  className={`nav-link-custom ${activeTab === 'Reportes' ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); setActiveTab('Reportes'); }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                    <polyline points="17 6 23 6 23 12" />
                  </svg>
                  <span>Reportes</span>
                </a>
              </nav>

              <div className="sidebar-divider"></div>

              {/* Perfil Link */}
              <a
                href="#perfil"
                className={`nav-link-custom ${activeTab === 'Perfil' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); setActiveTab('Perfil'); }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span>Perfil</span>
              </a>
            </div>

            {/* Botones del Sidebar */}
            <div className="sidebar-actions mt-4">
              <button className="btn-sidebar-store">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                <span>Tienda</span>
              </button>
              
              <button className="btn-sidebar-logout">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </aside>

          {/* ================= CONTENIDO DINÁMICO ================= */}
          <main className="col-12 col-md-9 col-lg-10 main-content">
            
            {/* VISTA 1: DASHBOARD PRINCIPAL */}
            {activeTab === 'Dashboard' && (
              <>
                <h1 className="page-title">Dashboard</h1>
                <p className="page-subtitle">Resumen de las actividades diarias</p>

                {/* Tarjetas KPI */}
                <div className="row g-4 mb-4">
                  <div className="col-12 col-md-4">
                    <div className="kpi-card kpi-card-blue d-flex justify-content-between align-items-center">
                      <div>
                        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <circle cx="9" cy="21" r="1" />
                          <circle cx="20" cy="21" r="1" />
                          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                      </div>
                      <div className="text-end">
                        <div className="kpi-title">Compras</div>
                        <div className="kpi-value">1,234</div>
                        <div className="kpi-footer">Probabilidad de aumento: <strong>20%</strong></div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-md-4">
                    <div className="kpi-card kpi-card-green d-flex justify-content-between align-items-center">
                      <div>
                        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                          <line x1="12" y1="22.08" x2="12" y2="12" />
                        </svg>
                      </div>
                      <div className="text-end">
                        <div className="kpi-title">Productos</div>
                        <div className="kpi-value">400</div>
                        <div className="kpi-footer">Inventario actual: <strong>500</strong></div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-md-4" style={{ cursor: 'pointer' }} onClick={() => setActiveTab('Usuarios')}>
                    <div className="kpi-card kpi-card-yellow d-flex justify-content-between align-items-center">
                      <div>
                        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                      </div>
                      <div className="text-end">
                        <div className="kpi-title">Usuarios</div>
                        <div className="kpi-value">890</div>
                        <div className="kpi-footer">Nuevos usuarios este mes: <strong>120</strong></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tarjetas Interactivas a Módulos */}
                <div className="row g-4">
                  <div className="col-12 col-sm-6 col-lg-3">
                    <div className="module-card">
                      <div className="module-card-body">
                        <svg className="module-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 16v-4" />
                          <path d="M12 8h.01" />
                        </svg>
                        <h3 className="module-title">Dashboard</h3>
                        <p className="module-description">
                          Visión general de todas las métricas y estadísticas clave del sistema.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* NAVEGA A ÓRDENES */}
                  <div className="col-12 col-sm-6 col-lg-3" style={{ cursor: 'pointer' }} onClick={() => setActiveTab('Órdenes')}>
                    <div className="module-card">
                      <div className="module-card-body">
                        <svg className="module-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <circle cx="9" cy="21" r="1" />
                          <circle cx="20" cy="21" r="1" />
                          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                        <h3 className="module-title">Órdenes</h3>
                        <p className="module-description">
                          Gestión y seguimiento de todas las órdenes de compra realizadas.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* NAVEGA A PRODUCTOS */}
                  <div className="col-12 col-sm-6 col-lg-3" style={{ cursor: 'pointer' }} onClick={() => setActiveTab('Productos')}>
                    <div className="module-card">
                      <div className="module-card-body">
                        <svg className="module-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                          <line x1="12" y1="22.08" x2="12" y2="12" />
                        </svg>
                        <h3 className="module-title">Productos</h3>
                        <p className="module-description">
                          Administrar inventario e insumos de la cocina italiana.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* NAVEGA A CATEGORÍAS */}
                  <div className="col-12 col-sm-6 col-lg-3" style={{ cursor: 'pointer' }} onClick={() => setActiveTab('Categorías')}>
                    <div className="module-card">
                      <div className="module-card-body">
                        <svg className="module-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                          <line x1="7" y1="7" x2="7.01" y2="7" />
                        </svg>
                        <h3 className="module-title">Categorías</h3>
                        <p className="module-description">
                          Organizar productos en categorías para facilitar su navegación.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* NAVEGA A USUARIOS */}
                  <div className="col-12 col-sm-6 col-lg-3" style={{ cursor: 'pointer' }} onClick={() => setActiveTab('Usuarios')}>
                    <div className="module-card">
                      <div className="module-card-body">
                        <svg className="module-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                        <h3 className="module-title">Usuarios</h3>
                        <p className="module-description">
                          Gestión de cuentas de usuario y sus roles dentro del sistema.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* NAVEGA A REPORTES */}
                  <div className="col-12 col-sm-6 col-lg-3" style={{ cursor: 'pointer' }} onClick={() => setActiveTab('Reportes')}>
                    <div className="module-card">
                      <div className="module-card-body">
                        <svg className="module-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <line x1="18" y1="20" x2="18" y2="10" />
                          <line x1="12" y1="20" x2="12" y2="4" />
                          <line x1="6" y1="20" x2="6" y2="14" />
                        </svg>
                        <h3 className="module-title">Reportes</h3>
                        <p className="module-description">
                          Generación de informes detallados sobre las operaciones del sistema.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* NAVEGA A PERFIL */}
                  <div className="col-12 col-sm-6 col-lg-3" style={{ cursor: 'pointer' }} onClick={() => setActiveTab('Perfil')}>
                    <div className="module-card">
                      <div className="module-card-body">
                        <svg className="module-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                        <h3 className="module-title">Perfil</h3>
                        <p className="module-description">
                          Administración de la información personal y configuraciones de cuenta.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-sm-6 col-lg-3">
                    <div className="module-card">
                      <div className="module-card-body">
                        <svg className="module-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                          <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                        <h3 className="module-title">Tienda</h3>
                        <p className="module-description">
                          Visualiza tu tienda en tiempo real, visualiza los reportes de los usuarios.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* VISTAS COMPONENTES */}
            {activeTab === 'Órdenes' && (
              <Ordenes onVolver={() => setActiveTab('Dashboard')} />
            )}

            {activeTab === 'Productos' && (
              <Productos onVolver={() => setActiveTab('Dashboard')} />
            )}

            {activeTab === 'Categorías' && (
              <Categorias onVolver={() => setActiveTab('Dashboard')} />
            )}

            {activeTab === 'Usuarios' && (
              <Usuarios onVolver={() => setActiveTab('Dashboard')} />
            )}

            {activeTab === 'Reportes' && (
              <Reportes onVolver={() => setActiveTab('Dashboard')} />
            )}

            {activeTab === 'Perfil' && (
              <Perfil onVolver={() => setActiveTab('Dashboard')} />
            )}

            {/* OTRAS PESTAÑAS */}
            {activeTab !== 'Dashboard' && activeTab !== 'Órdenes' && activeTab !== 'Productos' && activeTab !== 'Categorías' && activeTab !== 'Usuarios' && activeTab !== 'Reportes' && activeTab !== 'Perfil' && (
              <div>
                <h1 className="page-title">{activeTab}</h1>
                <p className="page-subtitle">Módulo en construcción para {activeTab.toLowerCase()}.</p>
                <button className="btn btn-primary" onClick={() => setActiveTab('Dashboard')}>
                  Volver al Dashboard
                </button>
              </div>
            )}

          </main>

        </div>
      </div>
    </div>
  );
}