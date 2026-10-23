import React, { useState } from 'react';

// Datos de usuarios iniciales con historial de compras de comida italiana
const INITIAL_USERS = [
  {
    id: 'USR-001',
    nombre: 'Giovanni Rossi',
    email: 'giovanni.rossi@email.com',
    telefono: '+56 9 8765 4321',
    rol: 'Cliente Premium',
    estado: 'Activo',
    fechaRegistro: '2026-01-15',
    historialCompras: [
      {
        idOrden: 'ORD-9021',
        fecha: '2026-10-18 14:20',
        tipoPago: 'Tarjeta de Crédito',
        platos: [
          { nombre: 'Bruschetta tradicional', categoria: 'Entradas', precio: 5500, cantidad: 2 },
          { nombre: 'Lasagna della Nonna', categoria: 'Plato de fondo', precio: 11900, cantidad: 1 },
          { nombre: 'Pizza Prosciutto', categoria: 'Plato de fondo', precio: 12500, cantidad: 1 }
        ]
      },
      {
        idOrden: 'ORD-8810',
        fecha: '2026-09-30 09:45',
        tipoPago: 'Tarjeta de Débito',
        platos: [
          { nombre: 'Cornetto con Cappuccino', categoria: 'Desayunos', precio: 7900, cantidad: 2 },
          { nombre: 'Bomboloni', categoria: 'Desayunos', precio: 3900, cantidad: 2 }
        ]
      }
    ]
  },
  {
    id: 'USR-002',
    nombre: 'Francesca Bianchi',
    email: 'francesca.b@email.com',
    telefono: '+56 9 7654 3210',
    rol: 'Cliente',
    estado: 'Activo',
    fechaRegistro: '2026-03-10',
    historialCompras: [
      {
        idOrden: 'ORD-9104',
        fecha: '2026-10-20 20:30',
        tipoPago: 'Efectivo',
        platos: [
          { nombre: 'Carpaccio de res o salmón', categoria: 'Entradas', precio: 12900, cantidad: 1 },
          { nombre: 'Spaghetti Carbonara', categoria: 'Plato de fondo', precio: 10500, cantidad: 1 },
          { nombre: 'Caponata siciliana', categoria: 'Entradas', precio: 9900, cantidad: 1 }
        ]
      }
    ]
  },
  {
    id: 'USR-003',
    nombre: 'Matteo Moretti',
    email: 'matteo.m@lacucinanostra.cl',
    telefono: '+56 9 6543 2109',
    rol: 'Chef Ejecutivo',
    estado: 'Activo',
    fechaRegistro: '2026-02-01',
    historialCompras: [
      {
        idOrden: 'ORD-7520',
        fecha: '2026-08-12 10:15',
        tipoPago: 'Transferencia',
        platos: [
          { nombre: 'Tostada de Burrata', categoria: 'Desayunos', precio: 11500, cantidad: 1 },
          { nombre: 'Uova in Purgatorio', categoria: 'Desayunos', precio: 8900, cantidad: 1 }
        ]
      }
    ]
  },
  {
    id: 'USR-004',
    nombre: 'Alessia Romano',
    email: 'alessia.romano@email.com',
    telefono: '+56 9 5432 1098',
    rol: 'Cliente',
    estado: 'Inactivo',
    fechaRegistro: '2026-05-22',
    historialCompras: [
      {
        idOrden: 'ORD-8112',
        fecha: '2026-09-05 13:00',
        tipoPago: 'Tarjeta de Débito',
        platos: [
          { nombre: 'Arancini', categoria: 'Entradas', precio: 10500, cantidad: 1 },
          { nombre: 'Pizza Margherita', categoria: 'Plato de fondo', precio: 9900, cantidad: 1 },
          { nombre: 'Pasta al Pesto', categoria: 'Plato de fondo', precio: 10900, cantidad: 1 }
        ]
      }
    ]
  }
];

// Menú disponible para agregar items al historial de compras
const MENU_PLATOS = {
  entradas: [
    { nombre: 'Bruschetta tradicional', precio: 5500 },
    { nombre: 'Ensalada Caprese', precio: 8900 },
    { nombre: 'Carpaccio de res o salmón', precio: 12900 },
    { nombre: 'Caponata siciliana', precio: 9900 },
    { nombre: 'Arancini', precio: 10500 }
  ],
  desayunos: [
    { nombre: 'Cornetto con Cappuccino', precio: 7900 },
    { nombre: 'Bomboloni', precio: 3900 },
    { nombre: 'Uova in Purgatorio', precio: 8900 },
    { nombre: 'Frittata Italiana', precio: 9900 },
    { nombre: 'Tostada de Burrata', precio: 11500 }
  ],
  platosDeFondo: [
    { nombre: 'Pizza Margherita', precio: 9900 },
    { nombre: 'Pasta al Pesto', precio: 10900 },
    { nombre: 'Lasagna della Nonna', precio: 11900 },
    { nombre: 'Pizza Prosciutto', precio: 12500 },
    { nombre: 'Spaghetti Carbonara', precio: 10500 },
    { nombre: 'Ravioli di Ricotta', precio: 11500 }
  ]
};

export default function Usuarios({ onVolver }) {
  const [users, setUsers] = useState(INITIAL_USERS);
  
  // Vistas internas: 'list' | 'create' | 'show' | 'edit'
  const [userSubView, setUserSubView] = useState('list');
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Estado del formulario (para Crear y Editar)
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    rol: 'Cliente',
    estado: 'Activo'
  });

  // Abrir vista "Mostrar Usuario"
  const handleShowUser = (user) => {
    setSelectedUser(user);
    setUserSubView('show');
  };

  // Abrir vista "Editar Usuario"
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setFormData({
      nombre: user.nombre,
      email: user.email,
      telefono: user.telefono,
      rol: user.rol,
      estado: user.estado
    });
    setUserSubView('edit');
  };

  // Guardar nuevo usuario
  const handleCreateSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      id: `USR-00${users.length + 1}`,
      ...formData,
      fechaRegistro: new Date().toISOString().split('T')[0],
      historialCompras: []
    };
    setUsers([...users, newUser]);
    setUserSubView('list');
    resetForm();
  };

  // Guardar edición de usuario
  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedUsers = users.map(u => 
      u.id === selectedUser.id ? { ...u, ...formData } : u
    );
    setUsers(updatedUsers);
    
    // Actualizar también el usuario seleccionado si está en vista 'show'
    setSelectedUser({ ...selectedUser, ...formData });
    setUserSubView('show');
  };

  // Eliminar usuario
  const handleDeleteUser = (id) => {
    if (window.confirm('¿Está seguro de eliminar esta cuenta de usuario?')) {
      setUsers(users.filter(u => u.id !== id));
      if (selectedUser && selectedUser.id === id) {
        setUserSubView('list');
        setSelectedUser(null);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      rol: 'Cliente',
      estado: 'Activo'
    });
  };

  // Filtrado de usuarios por búsqueda
  const usuariosFiltrados = users.filter(u => 
    u.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h1 className="page-title">Gestión de Usuarios</h1>
          <p className="page-subtitle mb-0">Administración de clientes, roles y consulta de historial de consumo</p>
        </div>
        <button className="btn btn-outline-secondary btn-sm" onClick={onVolver}>
          ← Volver al Dashboard
        </button>
      </div>

      {/* Barra de navegación rápida */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body d-flex flex-wrap gap-2 align-items-center justify-content-between">
          <div className="btn-group" role="group">
            <button 
              className={`btn ${userSubView === 'list' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => { setUserSubView('list'); setSelectedUser(null); }}
            >
              👥 Todos los Usuarios ({users.length})
            </button>
            <button 
              className={`btn ${userSubView === 'create' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => { resetForm(); setUserSubView('create'); }}
            >
              ➕ Crear Usuario Nuevo
            </button>
          </div>

          {userSubView === 'list' && (
            <div className="col-12 col-md-4 mt-2 mt-md-0">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Buscar por nombre, email o código..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}
        </div>
      </div>

      {/* 1. LISTADO DE USUARIOS */}
      {userSubView === 'list' && (
        <div className="card border-0 shadow-sm">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="ps-4">ID</th>
                    <th>Nombre</th>
                    <th>Correo Electrónico</th>
                    <th>Teléfono</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    <th className="text-end pe-4">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuariosFiltrados.length > 0 ? (
                    usuariosFiltrados.map((u) => (
                      <tr key={u.id}>
                        <td className="ps-4 fw-bold text-secondary">{u.id}</td>
                        <td className="fw-bold">{u.nombre}</td>
                        <td>{u.email}</td>
                        <td className="text-muted small">{u.telefono}</td>
                        <td><span className="badge bg-light text-dark border">{u.rol}</span></td>
                        <td>
                          <span className={`badge ${u.estado === 'Activo' ? 'bg-success' : 'bg-secondary'}`}>
                            {u.estado}
                          </span>
                        </td>
                        <td className="text-end pe-4">
                          <div className="btn-group btn-group-sm">
                            <button className="btn btn-outline-info" title="Mostrar Usuario y Compras" onClick={() => handleShowUser(u)}>
                              👁️ Ver Perfil
                            </button>
                            <button className="btn btn-outline-warning" title="Editar" onClick={() => handleEditUser(u)}>
                              ✏️ Editar
                            </button>
                            <button className="btn btn-outline-danger" title="Eliminar" onClick={() => handleDeleteUser(u.id)}>
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center py-4 text-muted">
                        No se encontraron usuarios coincidentes.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 2. CREAR USUARIO NUEVO */}
      {userSubView === 'create' && (
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white py-3">
            <h3 className="h5 mb-0 fw-bold text-primary">➕ Registrar Nuevo Usuario</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleCreateSubmit}>
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label className="form-label fw-bold">Nombre Completo</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Ej: Marco Rossi"
                    required 
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label fw-bold">Correo Electrónico</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    placeholder="ejemplo@email.com"
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="col-12 col-md-4">
                  <label className="form-label fw-bold">Teléfono de Contacto</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="+56 9 1234 5678"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  />
                </div>
                <div className="col-12 col-md-4">
                  <label className="form-label fw-bold">Rol en el Sistema</label>
                  <select 
                    className="form-select"
                    value={formData.rol}
                    onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
                  >
                    <option value="Cliente">Cliente</option>
                    <option value="Cliente Premium">Cliente Premium</option>
                    <option value="Garzón / Mesero">Garzón / Mesero</option>
                    <option value="Chef Ejecutivo">Chef Ejecutivo</option>
                    <option value="Administrador">Administrador</option>
                  </select>
                </div>
                <div className="col-12 col-md-4">
                  <label className="form-label fw-bold">Estado Inicial</label>
                  <select 
                    className="form-select"
                    value={formData.estado}
                    onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                  >
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>
                <div className="col-12 d-flex justify-content-end gap-2 mt-4">
                  <button type="button" className="btn btn-secondary" onClick={() => setUserSubView('list')}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Guardar Usuario
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. MOSTRAR USUARIO Y SU HISTORIAL DE COMPRAS */}
      {userSubView === 'show' && selectedUser && (
        <div className="row g-4">
          {/* Ficha Informativa del Usuario */}
          <div className="col-12 col-lg-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                <h3 className="h6 mb-0 fw-bold">Información del Usuario</h3>
                <span className="badge bg-primary">{selectedUser.id}</span>
              </div>
              <div className="card-body">
                <div className="text-center mb-3">
                  <div className="avatar-circle mx-auto bg-primary text-white d-flex align-items-center justify-content-center rounded-circle mb-2" style={{ width: '64px', height: '64px', fontSize: '1.5rem', fontWeight: 'bold' }}>
                    {selectedUser.nombre.charAt(0)}
                  </div>
                  <h4 className="h5 fw-bold mb-1">{selectedUser.nombre}</h4>
                  <span className="badge bg-light text-dark border">{selectedUser.rol}</span>
                </div>

                <ul className="list-group list-group-flush small">
                  <li className="list-group-item d-flex justify-content-between">
                    <strong className="text-muted">Email:</strong>
                    <span>{selectedUser.email}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <strong className="text-muted">Teléfono:</strong>
                    <span>{selectedUser.telefono || 'No registrado'}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <strong className="text-muted">Estado:</strong>
                    <span className={`badge ${selectedUser.estado === 'Activo' ? 'bg-success' : 'bg-secondary'}`}>
                      {selectedUser.estado}
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <strong className="text-muted">Miembro desde:</strong>
                    <span>{selectedUser.fechaRegistro}</span>
                  </li>
                </ul>

                <div className="d-grid gap-2 mt-4">
                  <button className="btn btn-warning btn-sm fw-bold" onClick={() => handleEditUser(selectedUser)}>
                    ✏️ Editar Información de Usuario
                  </button>
                  <button className="btn btn-outline-secondary btn-sm" onClick={() => setUserSubView('list')}>
                    ← Volver a Lista de Usuarios
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Historial de Compras del Usuario */}
          <div className="col-12 col-lg-8">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white py-3">
                <h3 className="h6 mb-0 fw-bold">🍝 Historial de Compras de Platos Italianos</h3>
              </div>
              <div className="card-body">
                {selectedUser.historialCompras && selectedUser.historialCompras.length > 0 ? (
                  selectedUser.historialCompras.map((orden) => {
                    const totalOrden = orden.platos.reduce((acc, p) => acc + (p.precio * p.cantidad), 0);
                    return (
                      <div className="border rounded p-3 mb-3 bg-light" key={orden.idOrden}>
                        <div className="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom">
                          <div>
                            <strong className="text-primary me-2">{orden.idOrden}</strong>
                            <span className="text-muted small">{orden.fecha}</span>
                          </div>
                          <div>
                            <span className="badge bg-white text-dark border me-2">{orden.tipoPago}</span>
                            <strong className="text-success fs-6">${totalOrden.toLocaleString('es-CL')}</strong>
                          </div>
                        </div>

                        {/* Listado de platos pedidos */}
                        <div className="table-responsive">
                          <table className="table table-sm table-borderless mb-0 align-middle">
                            <thead>
                              <tr className="text-muted small">
                                <th>Plato</th>
                                <th>Categoría</th>
                                <th>Cantidad</th>
                                <th className="text-end">Precio Unit.</th>
                                <th className="text-end">Subtotal</th>
                              </tr>
                            </thead>
                            <tbody>
                              {orden.platos.map((plato, idx) => (
                                <tr key={idx}>
                                  <td className="fw-bold text-dark">{plato.nombre}</td>
                                  <td>
                                    <span className={`badge ${
                                      plato.categoria === 'Entradas' ? 'bg-info text-dark' :
                                      plato.categoria === 'Desayunos' ? 'bg-warning text-dark' : 'bg-danger'
                                    }`}>
                                      {plato.categoria}
                                    </span>
                                  </td>
                                  <td>{plato.cantidad} u.</td>
                                  <td className="text-end">${plato.precio.toLocaleString('es-CL')}</td>
                                  <td className="text-end fw-bold">${(plato.precio * plato.cantidad).toLocaleString('es-CL')}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-5 text-muted">
                    <p className="mb-0">Este usuario no registra compras previas de platillos en el sistema.</p>
                  </div>
                )}

                {/* Resumen de Menú Disponibles para Consulta */}
                <div className="mt-4 pt-3 border-top">
                  <h4 className="h6 fw-bold mb-2">Carta de Platillos y Precios de La Cucina Nostra:</h4>
                  <div className="row g-2 small text-muted">
                    <div className="col-12 col-md-4">
                      <strong className="text-dark d-block">Entradas:</strong>
                      {MENU_PLATOS.entradas.map(p => (
                        <div key={p.nombre} className="d-flex justify-content-between">
                          <span>• {p.nombre}</span>
                          <strong>${p.precio.toLocaleString('es-CL')}</strong>
                        </div>
                      ))}
                    </div>
                    <div className="col-12 col-md-4">
                      <strong className="text-dark d-block">Desayunos:</strong>
                      {MENU_PLATOS.desayunos.map(p => (
                        <div key={p.nombre} className="d-flex justify-content-between">
                          <span>• {p.nombre}</span>
                          <strong>${p.precio.toLocaleString('es-CL')}</strong>
                        </div>
                      ))}
                    </div>
                    <div className="col-12 col-md-4">
                      <strong className="text-dark d-block">Platos de Fondo:</strong>
                      {MENU_PLATOS.platosDeFondo.map(p => (
                        <div key={p.nombre} className="d-flex justify-content-between">
                          <span>• {p.nombre}</span>
                          <strong>${p.precio.toLocaleString('es-CL')}</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. EDITAR USUARIO */}
      {userSubView === 'edit' && selectedUser && (
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white py-3">
            <h3 className="h5 mb-0 fw-bold text-warning text-dark">✏️ Editar Usuario: {selectedUser.id}</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleEditSubmit}>
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label className="form-label fw-bold">Nombre Completo</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    required 
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label fw-bold">Correo Electrónico</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="col-12 col-md-4">
                  <label className="form-label fw-bold">Teléfono</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  />
                </div>
                <div className="col-12 col-md-4">
                  <label className="form-label fw-bold">Rol</label>
                  <select 
                    className="form-select"
                    value={formData.rol}
                    onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
                  >
                    <option value="Cliente">Cliente</option>
                    <option value="Cliente Premium">Cliente Premium</option>
                    <option value="Garzón / Mesero">Garzón / Mesero</option>
                    <option value="Chef Ejecutivo">Chef Ejecutivo</option>
                    <option value="Administrador">Administrador</option>
                  </select>
                </div>
                <div className="col-12 col-md-4">
                  <label className="form-label fw-bold">Estado</label>
                  <select 
                    className="form-select"
                    value={formData.estado}
                    onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                  >
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>
                <div className="col-12 d-flex justify-content-end gap-2 mt-4">
                  <button type="button" className="btn btn-secondary" onClick={() => setUserSubView('show')}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-warning fw-bold">
                    Guardar Cambios
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}