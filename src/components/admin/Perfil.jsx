import React, { useState } from 'react';

export default function Perfil({ onVolver }) {
  // Estado inicial con los datos del usuario administrativo
  const [profile, setProfile] = useState({
    nombre: 'Marco Bellini',
    email: 'admin@lacucinanostra.cl',
    telefono: '+56 9 9876 5432',
    cargo: 'Administrador General',
    restaurante: 'La Cucina Nostra - Sede Principal',
    fechaIngreso: '12 de Enero, 2024',
    password: '••••••••'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...profile });
  const [showNotification, setShowNotification] = useState(false);

  // Manejar el envío del formulario de actualización
  const handleSubmit = (e) => {
    e.preventDefault();
    setProfile({ ...formData });
    setIsEditing(false);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3500);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h1 className="page-title">Perfil de Administrador</h1>
          <p className="page-subtitle mb-0">Gestión de la cuenta, datos de contacto y seguridad del sistema</p>
        </div>
        <button className="btn btn-outline-secondary btn-sm" onClick={onVolver}>
          ← Volver al Dashboard
        </button>
      </div>

      {/* Alerta de notificación al guardar cambios */}
      {showNotification && (
        <div className="alert alert-success alert-dismissible fade show mb-4" role="alert">
          <strong>¡Perfil actualizado!</strong> Los cambios en tu cuenta administrativa se han guardado con éxito.
        </div>
      )}

      <div className="row g-4">
        {/* Tarjeta de Resumen Visual */}
        <div className="col-12 col-lg-4">
          <div className="card border-0 shadow-sm text-center p-4">
            <div className="position-relative d-inline-block mx-auto mb-3">
              <div 
                className="bg-dark text-white rounded-circle d-flex align-items-center justify-content-center mx-auto shadow-sm"
                style={{ width: '90px', height: '90px', fontSize: '2.2rem', fontWeight: 'bold' }}
              >
                {profile.nombre.split(' ').map(n => n[0]).join('')}
              </div>
            </div>

            <h3 className="h5 fw-bold mb-1">{profile.nombre}</h3>
            <p className="badge bg-primary mb-3 fs-6">{profile.cargo}</p>
            <p className="text-muted small mb-2">📍 {profile.restaurante}</p>
            <p className="text-secondary small">📅 Administrador desde: {profile.fechaIngreso}</p>

            <hr className="my-3" />

            <div className="d-grid gap-2">
              {!isEditing ? (
                <button 
                  className="btn btn-warning fw-bold" 
                  onClick={() => { setFormData({ ...profile }); setIsEditing(true); }}
                >
                  ✏️ Editar Datos Personales
                </button>
              ) : (
                <button 
                  className="btn btn-outline-secondary" 
                  onClick={() => setIsEditing(false)}
                >
                  ✖ Cancelar Edición
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Detalle / Formulario de Edición */}
        <div className="col-12 col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
              <h3 className="h6 mb-0 fw-bold">
                {isEditing ? '✏️ Formulario de Modificación de Perfil' : '📋 Información General de la Cuenta'}
              </h3>
              <span className={`badge ${isEditing ? 'bg-warning text-dark' : 'bg-success'}`}>
                {isEditing ? 'Modo Edición' : 'Cuenta Activa'}
              </span>
            </div>

            <div className="card-body">
              {!isEditing ? (
                /* Vista de solo lectura */
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between py-3">
                    <strong className="text-muted">Nombre Completo:</strong>
                    <span className="fw-bold">{profile.nombre}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between py-3">
                    <strong className="text-muted">Correo Electrónico:</strong>
                    <span>{profile.email}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between py-3">
                    <strong className="text-muted">Teléfono de Contacto:</strong>
                    <span>{profile.telefono}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between py-3">
                    <strong className="text-muted">Rol en el Sistema:</strong>
                    <span className="badge bg-light text-dark border">{profile.cargo}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between py-3">
                    <strong className="text-muted">Restaurante Asignado:</strong>
                    <span>{profile.restaurante}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between py-3">
                    <strong className="text-muted">Contraseña de Acceso:</strong>
                    <span>{profile.password}</span>
                  </li>
                </ul>
              ) : (
                /* Formulario de modificación */
                <form onSubmit={handleSubmit}>
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

                    <div className="col-12 col-md-6">
                      <label className="form-label fw-bold">Teléfono de Contacto</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={formData.telefono}
                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label fw-bold">Cargo / Rol</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={formData.cargo}
                        onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-bold">Sucursal de Restaurante</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={formData.restaurante}
                        onChange={(e) => setFormData({ ...formData, restaurante: e.target.value })}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-bold">Nueva Contraseña (Opcional)</label>
                      <input 
                        type="password" 
                        className="form-control" 
                        placeholder="Ingresa una nueva contraseña si deseas cambiarla..."
                        onChange={(e) => {
                          if (e.target.value.trim().length > 0) {
                            setFormData({ ...formData, password: '••••••••' });
                          }
                        }}
                      />
                    </div>

                    <div className="col-12 d-flex justify-content-end gap-2 mt-4">
                      <button 
                        type="button" 
                        className="btn btn-secondary" 
                        onClick={() => setIsEditing(false)}
                      >
                        Cancelar
                      </button>
                      <button type="submit" className="btn btn-warning fw-bold">
                        Guardar Cambios
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}