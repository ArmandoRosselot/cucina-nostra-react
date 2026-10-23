import React, { useState } from 'react';

// Categorías iniciales de un restaurante italiano
const INITIAL_CATEGORIES = [
  { id: 'CAT-01', nombre: 'Masas y Harinas', descripcion: 'Harinas Caputo, levaduras y bases para pizzas y panes.', productosCount: 12, estado: 'Activa' },
  { id: 'CAT-02', nombre: 'Salsas y Conservas', descripcion: 'Tomates San Marzano, passata, pomodoro y conservas.', productosCount: 8, estado: 'Activa' },
  { id: 'CAT-03', nombre: 'Lácteos y Quesos', descripcion: 'Mozzarella di bufala, Parmigiano Reggiano, Ricotta, Gorgonzola.', productosCount: 15, estado: 'Activa' },
  { id: 'CAT-04', nombre: 'Fiambres y Embutidos', descripcion: 'Prosciutto di Parma, Mortadella, Salame Milano, Pancetta.', productosCount: 10, estado: 'Activa' },
  { id: 'CAT-05', nombre: 'Pastas Secas y Frescas', descripcion: 'Fettuccine, Penne, Gnocchi, Ravioli y pastas artesanales.', productosCount: 20, estado: 'Activa' },
  { id: 'CAT-06', nombre: 'Aceites y Condimentos', descripcion: 'Aceites de oliva virgen extra, vinagre balsámico de Módena, orégano.', productosCount: 7, estado: 'Activa' },
  { id: 'CAT-07', nombre: 'Vinos y Licores', descripcion: 'Chianti, Prosecco, Limoncello, Grappa y vinos italianos.', productosCount: 14, estado: 'Activa' }
];

export default function Categorias({ onVolver }) {
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [showForm, setShowForm] = useState(false);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');

  // Agregar nueva categoría
  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!nombre.trim()) return;

    const newCat = {
      id: `CAT-0${categories.length + 1}`,
      nombre: nombre.trim(),
      descripcion: descripcion.trim() || 'Sin descripción',
      productosCount: 0,
      estado: 'Activa'
    };

    setCategories([...categories, newCat]);
    setNombre('');
    setDescripcion('');
    setShowForm(false);
  };

  // Eliminar categoría
  const handleDelete = (id) => {
    if (window.confirm('¿Está seguro de eliminar esta categoría?')) {
      setCategories(categories.filter((cat) => cat.id !== id));
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h1 className="page-title">Categorías de Productos</h1>
          <p className="page-subtitle mb-0">Gestión y clasificación de los insumos e ingredientes del restaurante</p>
        </div>
        <button className="btn btn-outline-secondary btn-sm" onClick={onVolver}>
          ← Volver al Dashboard
        </button>
      </div>

      {/* Barra superior de estado y botón */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body d-flex justify-content-between align-items-center flex-wrap gap-2">
          <span className="fw-bold text-secondary">
            Categorías Registradas: <span className="badge bg-primary fs-6">{categories.length}</span>
          </span>
          <button 
            className={`btn ${showForm ? 'btn-secondary' : 'btn-primary'}`}
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? '✖ Cancelar' : '➕ Nueva Categoría'}
          </button>
        </div>
      </div>

      {/* Formulario para Agregar Categoría */}
      {showForm && (
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-header bg-white py-3">
            <h3 className="h5 mb-0 fw-bold text-primary">➕ Registrar Nueva Categoría</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleAddCategory}>
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label className="form-label fw-bold">Nombre de la Categoría</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ej: Postres e Il Gelato"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label fw-bold">Descripción</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ej: Gelato artesanal, Tiramisú, Panna Cotta..."
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                  />
                </div>
                <div className="col-12 d-flex justify-content-end gap-2 mt-3">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Guardar Categoría
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tabla de Categorías */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="ps-4">ID</th>
                  <th>Nombre de Categoría</th>
                  <th>Descripción</th>
                  <th>Insumos Asociados</th>
                  <th>Estado</th>
                  <th className="text-end pe-4">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr key={cat.id}>
                    <td className="ps-4 fw-bold text-secondary">{cat.id}</td>
                    <td className="fw-bold">{cat.nombre}</td>
                    <td className="text-muted">{cat.descripcion}</td>
                    <td>
                      <span className="badge bg-light text-dark border">
                        {cat.productosCount} productos
                      </span>
                    </td>
                    <td>
                      <span className="badge bg-success">
                        {cat.estado}
                      </span>
                    </td>
                    <td className="text-end pe-4">
                      <button 
                        className="btn btn-sm btn-outline-danger" 
                        onClick={() => handleDelete(cat.id)}
                        title="Eliminar Categoría"
                      >
                        🗑️ Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}