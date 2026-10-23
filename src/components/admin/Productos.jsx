import React, { useState } from 'react';

const INITIAL_PRODUCTS = [
  { id: 'PROD-001', nombre: 'Harina 00 Caputo 25kg', categoria: 'Masas y Harinas', stock: 12, stockCritico: 15, precio: 38500, proveedor: 'Importadora Italia S.A.', descripcion: 'Harina de trigo de fuerza especial para masa de pizza napolitana.' },
  { id: 'PROD-002', nombre: 'Tomate San Marzano DOP 800g', categoria: 'Salsas y Conservas', stock: 85, stockCritico: 20, precio: 4200, proveedor: 'Consorcio San Marzano', descripcion: 'Tomates pelados en conserva con denominación de origen protegida.' },
  { id: 'PROD-003', nombre: 'Mozzarella di Bufala 250g', categoria: 'Lácteos y Quesos', stock: 8, stockCritico: 10, precio: 6800, proveedor: 'Latteria Campania', descripcion: 'Queso fresco de búfala para pizzas gourmet y ensalada Caprese.' },
  { id: 'PROD-004', nombre: 'Aceite de Oliva EV Monini 5L', categoria: 'Aceites y Condimentos', stock: 14, stockCritico: 5, precio: 45000, proveedor: 'Oli d\'Italia', descripcion: 'Aceite de oliva virgen extra de primera extracción en frío.' },
  { id: 'PROD-005', nombre: 'Parmigiano Reggiano DOP 1kg', categoria: 'Lácteos y Quesos', stock: 4, stockCritico: 6, precio: 28900, proveedor: 'Caseificio Parma', descripcion: 'Queso madurado 24 meses para rallado sobre pastas y risottos.' },
  { id: 'PROD-006', nombre: 'Prosciutto di Parma 24M 1kg', categoria: 'Fiambres y Embutidos', stock: 18, stockCritico: 5, precio: 32000, proveedor: 'Parma Gourmet', descripcion: 'Jamón curado italiano laminado para antipastos y pizzas.' },
  { id: 'PROD-007', nombre: 'Pasta Fettuccine De Cecco 500g', categoria: 'Pastas Secas', stock: 120, stockCritico: 30, precio: 2900, proveedor: 'Distribuidora Abruzzo', descripcion: 'Pasta de sémola de trigo duro trefilada en bronce.' },
  { id: 'PROD-008', nombre: 'Vino Chianti Classico DOCG', categoria: 'Vinos y Licores', stock: 3, stockCritico: 10, precio: 18500, proveedor: 'Toscana Wines', descripcion: 'Vino tinto italiano para maridaje de carnes y pastas rojas.' }
];

export default function Productos({ onVolver }) {
  const [productSubView, setProductSubView] = useState('list');
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    nombre: '',
    categoria: 'Masas y Harinas',
    stock: 0,
    stockCritico: 5,
    precio: 0,
    proveedor: '',
    descripcion: ''
  });

  const productosCriticos = products.filter(p => p.stock <= p.stockCritico);

  const handleShowProduct = (product) => {
    setSelectedProduct(product);
    setProductSubView('show');
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setFormData({
      nombre: product.nombre,
      categoria: product.categoria,
      stock: product.stock,
      stockCritico: product.stockCritico,
      precio: product.precio,
      proveedor: product.proveedor,
      descripcion: product.descripcion
    });
    setProductSubView('edit');
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id: `PROD-00${products.length + 1}`,
      ...formData,
      stock: Number(formData.stock),
      stockCritico: Number(formData.stockCritico),
      precio: Number(formData.precio)
    };
    setProducts([...products, newProduct]);
    setProductSubView('list');
    resetForm();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedProducts = products.map(p => 
      p.id === selectedProduct.id 
        ? { ...p, ...formData, stock: Number(formData.stock), stockCritico: Number(formData.stockCritico), precio: Number(formData.precio) }
        : p
    );
    setProducts(updatedProducts);
    setProductSubView('list');
    resetForm();
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('¿Está seguro de eliminar este producto del inventario?')) {
      setProducts(products.filter(p => p.id !== id));
      if (productSubView === 'show' || productSubView === 'edit') {
        setProductSubView('list');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      nombre: '',
      categoria: 'Masas y Harinas',
      stock: 0,
      stockCritico: 5,
      precio: 0,
      proveedor: '',
      descripcion: ''
    });
    setSelectedProduct(null);
  };

  const productosFiltrados = products.filter(p => 
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h1 className="page-title">Administración de Productos</h1>
          <p className="page-subtitle mb-0">Gestión de insumos e ingredientes para La Cucina Nostra</p>
        </div>
        <button className="btn btn-outline-secondary btn-sm" onClick={onVolver}>
          ← Volver al Dashboard
        </button>
      </div>

      {/* Navegación interna de Productos */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body d-flex flex-wrap gap-2 align-items-center justify-content-between">
          <div className="btn-group flex-wrap" role="group">
            <button 
              className={`btn ${productSubView === 'list' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setProductSubView('list')}
            >
              📦 Listado General ({products.length})
            </button>
            <button 
              className={`btn ${productSubView === 'new' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => { resetForm(); setProductSubView('new'); }}
            >
              ➕ Nuevo Producto
            </button>
            <button 
              className={`btn ${productSubView === 'critical' ? 'btn-danger' : 'btn-outline-danger'}`}
              onClick={() => setProductSubView('critical')}
            >
              ⚠️ Stock Crítico ({productosCriticos.length})
            </button>
            <button 
              className={`btn ${productSubView === 'reports' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setProductSubView('reports')}
            >
              📊 Reportes de Inventario
            </button>
          </div>

          {productSubView === 'list' && (
            <div className="col-12 col-md-4 mt-2 mt-md-0">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Buscar por nombre, código o categoría..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}
        </div>
      </div>

      {/* 1. Listado General */}
      {productSubView === 'list' && (
        <div className="card border-0 shadow-sm">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="ps-4">Código</th>
                    <th>Producto</th>
                    <th>Categoría</th>
                    <th>Stock Actual</th>
                    <th>Stock Crítico</th>
                    <th>Precio Unit.</th>
                    <th>Estado</th>
                    <th className="text-end pe-4">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productosFiltrados.length > 0 ? (
                    productosFiltrados.map((item) => {
                      const isCritical = item.stock <= item.stockCritico;
                      return (
                        <tr key={item.id}>
                          <td className="ps-4 fw-bold text-secondary">{item.id}</td>
                          <td className="fw-bold">{item.nombre}</td>
                          <td><span className="badge bg-light text-dark border">{item.categoria}</span></td>
                          <td className={`fw-bold ${isCritical ? 'text-danger' : 'text-success'}`}>
                            {item.stock} u.
                          </td>
                          <td className="text-muted">{item.stockCritico} u.</td>
                          <td className="fw-bold">${item.precio.toLocaleString('es-CL')}</td>
                          <td>
                            <span className={`badge ${isCritical ? 'bg-danger' : 'bg-success'}`}>
                              {isCritical ? 'Stock Crítico' : 'Suficiente'}
                            </span>
                          </td>
                          <td className="text-end pe-4">
                            <div className="btn-group btn-group-sm">
                              <button className="btn btn-outline-info" title="Mostrar" onClick={() => handleShowProduct(item)}>
                                👁️
                              </button>
                              <button className="btn btn-outline-warning" title="Editar" onClick={() => handleEditProduct(item)}>
                                ✏️
                              </button>
                              <button className="btn btn-outline-danger" title="Eliminar" onClick={() => handleDeleteProduct(item.id)}>
                                🗑️
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center py-4 text-muted">
                        No se encontraron productos que coincidan con la búsqueda.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 2. Nuevo Producto */}
      {productSubView === 'new' && (
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white py-3">
            <h3 className="h5 mb-0 fw-bold text-primary">➕ Agregar Nuevo Producto o Insumo</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleCreateSubmit}>
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label className="form-label fw-bold">Nombre del Producto</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Ej: Salsa Pomodoro Mutti 400g"
                    required 
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label fw-bold">Categoría</label>
                  <select 
                    className="form-select"
                    value={formData.categoria}
                    onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                  >
                    <option value="Masas y Harinas">Masas y Harinas</option>
                    <option value="Salsas y Conservas">Salsas y Conservas</option>
                    <option value="Lácteos y Quesos">Lácteos y Quesos</option>
                    <option value="Fiambres y Embutidos">Fiambres y Embutidos</option>
                    <option value="Pastas Secas">Pastas Secas</option>
                    <option value="Aceites y Condimentos">Aceites y Condimentos</option>
                    <option value="Vinos y Licores">Vinos y Licores</option>
                  </select>
                </div>
                <div className="col-12 col-md-4">
                  <label className="form-label fw-bold">Stock Inicial (unidades)</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    min="0"
                    required 
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  />
                </div>
                <div className="col-12 col-md-4">
                  <label className="form-label fw-bold">Nivel Stock Crítico</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    min="1"
                    required 
                    value={formData.stockCritico}
                    onChange={(e) => setFormData({ ...formData, stockCritico: e.target.value })}
                  />
                </div>
                <div className="col-12 col-md-4">
                  <label className="form-label fw-bold">Precio Unitario ($)</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    min="0"
                    required 
                    value={formData.precio}
                    onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label fw-bold">Proveedor / Distribuidor</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Ej: Distribuidora Italia Mía"
                    value={formData.proveedor}
                    onChange={(e) => setFormData({ ...formData, proveedor: e.target.value })}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label fw-bold">Descripción del Insumo</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Uso gastronómico habitual..."
                    value={formData.descripcion}
                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  />
                </div>
                <div className="col-12 d-flex justify-content-end gap-2 mt-4">
                  <button type="button" className="btn btn-secondary" onClick={() => setProductSubView('list')}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Guardar Producto
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Mostrar Producto */}
      {productSubView === 'show' && selectedProduct && (
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white d-flex justify-content-between align-items-center py-3">
            <h3 className="h5 mb-0 fw-bold text-dark">👁️ Detalle del Producto: {selectedProduct.nombre}</h3>
            <span className="badge bg-primary fs-6">{selectedProduct.id}</span>
          </div>
          <div className="card-body">
            <div className="row g-4">
              <div className="col-12 col-md-6">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between">
                    <strong className="text-muted">Categoría:</strong>
                    <span>{selectedProduct.categoria}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <strong className="text-muted">Stock Actual:</strong>
                    <span className={`fw-bold ${selectedProduct.stock <= selectedProduct.stockCritico ? 'text-danger' : 'text-success'}`}>
                      {selectedProduct.stock} unidades
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <strong className="text-muted">Límite Stock Crítico:</strong>
                    <span>{selectedProduct.stockCritico} unidades</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <strong className="text-muted">Precio Unitario:</strong>
                    <span className="fw-bold">${selectedProduct.precio.toLocaleString('es-CL')}</span>
                  </li>
                </ul>
              </div>

              <div className="col-12 col-md-6">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between">
                    <strong className="text-muted">Proveedor:</strong>
                    <span>{selectedProduct.proveedor || 'No especificado'}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <strong className="text-muted">Estado:</strong>
                    <span className={`badge ${selectedProduct.stock <= selectedProduct.stockCritico ? 'bg-danger' : 'bg-success'}`}>
                      {selectedProduct.stock <= selectedProduct.stockCritico ? 'Reabastecimiento Necesario' : 'Óptimo'}
                    </span>
                  </li>
                  <li className="list-group-item">
                    <strong className="text-muted d-block mb-1">Descripción:</strong>
                    <p className="mb-0 text-dark">{selectedProduct.descripcion || 'Sin descripción ingresada.'}</p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
              <button className="btn btn-outline-secondary" onClick={() => setProductSubView('list')}>
                ← Volver al Listado
              </button>
              <button className="btn btn-warning" onClick={() => handleEditProduct(selectedProduct)}>
                ✏️ Editar Producto
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Editar Producto */}
      {productSubView === 'edit' && selectedProduct && (
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white py-3">
            <h3 className="h5 mb-0 fw-bold text-dark">✏️ Editar Producto: {selectedProduct.id}</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleEditSubmit}>
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label className="form-label fw-bold">Nombre del Producto</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    required 
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label fw-bold">Categoría</label>
                  <select 
                    className="form-select"
                    value={formData.categoria}
                    onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                  >
                    <option value="Masas y Harinas">Masas y Harinas</option>
                    <option value="Salsas y Conservas">Salsas y Conservas</option>
                    <option value="Lácteos y Quesos">Lácteos y Quesos</option>
                    <option value="Fiambres y Embutidos">Fiambres y Embutidos</option>
                    <option value="Pastas Secas">Pastas Secas</option>
                    <option value="Aceites y Condimentos">Aceites y Condimentos</option>
                    <option value="Vinos y Licores">Vinos y Licores</option>
                  </select>
                </div>
                <div className="col-12 col-md-4">
                  <label className="form-label fw-bold">Stock Actual</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    min="0"
                    required 
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  />
                </div>
                <div className="col-12 col-md-4">
                  <label className="form-label fw-bold">Stock Crítico</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    min="1"
                    required 
                    value={formData.stockCritico}
                    onChange={(e) => setFormData({ ...formData, stockCritico: e.target.value })}
                  />
                </div>
                <div className="col-12 col-md-4">
                  <label className="form-label fw-bold">Precio Unitario ($)</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    min="0"
                    required 
                    value={formData.precio}
                    onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label fw-bold">Proveedor</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={formData.proveedor}
                    onChange={(e) => setFormData({ ...formData, proveedor: e.target.value })}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label fw-bold">Descripción</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={formData.descripcion}
                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  />
                </div>
                <div className="col-12 d-flex justify-content-end gap-2 mt-4">
                  <button type="button" className="btn btn-secondary" onClick={() => setProductSubView('list')}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-warning">
                    Actualizar Producto
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. Stock Crítico */}
      {productSubView === 'critical' && (
        <div>
          <div className="alert alert-danger d-flex align-items-center mb-4" role="alert">
            <div>
              <strong>Atención de Cocina:</strong> Los siguientes insumos italianos están en nivel crítico y requieren reabastecimiento urgente.
            </div>
          </div>

          <div className="card border-0 shadow-sm">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-danger">
                    <tr>
                      <th className="ps-4">Código</th>
                      <th>Producto</th>
                      <th>Categoría</th>
                      <th>Stock Actual</th>
                      <th>Mínimo Requerido</th>
                      <th>Proveedor</th>
                      <th className="text-end pe-4">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productosCriticos.length > 0 ? (
                      productosCriticos.map((item) => (
                        <tr key={item.id}>
                          <td className="ps-4 fw-bold">{item.id}</td>
                          <td className="fw-bold">{item.nombre}</td>
                          <td><span className="badge bg-light text-dark border">{item.categoria}</span></td>
                          <td className="fw-bold text-danger">{item.stock} u.</td>
                          <td className="fw-bold">{item.stockCritico} u.</td>
                          <td>{item.proveedor || 'Sin asignación'}</td>
                          <td className="text-end pe-4">
                            <button className="btn btn-sm btn-outline-warning me-2" onClick={() => handleEditProduct(item)}>
                              Aumentar Stock
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center py-4 text-success fw-bold">
                          ¡Excelente! No hay insumos en nivel crítico actualmente.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. Reportes */}
      {productSubView === 'reports' && (
        <div>
          <div className="row g-4 mb-4">
            <div className="col-12 col-md-4">
              <div className="card border-0 shadow-sm p-3 text-center">
                <span className="text-muted small fw-bold">VALOR TOTAL INVENTARIO</span>
                <h3 className="fw-bold text-primary my-2">
                  ${products.reduce((acc, p) => acc + (p.stock * p.precio), 0).toLocaleString('es-CL')}
                </h3>
                <span className="text-secondary small">Calculado según precio unitario</span>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="card border-0 shadow-sm p-3 text-center">
                <span className="text-muted small fw-bold">TOTAL UNIDADES EN STOCK</span>
                <h3 className="fw-bold text-success my-2">
                  {products.reduce((acc, p) => acc + p.stock, 0)} u.
                </h3>
                <span className="text-secondary small">Distribuidas en {products.length} insumos</span>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="card border-0 shadow-sm p-3 text-center">
                <span className="text-muted small fw-bold">INSUMOS CRÍTICOS</span>
                <h3 className="fw-bold text-danger my-2">
                  {productosCriticos.length}
                </h3>
                <span className="text-secondary small">Porcentaje del total: {((productosCriticos.length / products.length) * 100).toFixed(1)}%</span>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm p-4">
            <h4 className="h6 fw-bold mb-3">Distribución por Categoría de Cocina Italiana</h4>
            <div className="table-responsive">
              <table className="table table-bordered align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Categoría</th>
                    <th>Cantidad de Productos</th>
                    <th>Stock Total</th>
                    <th>Valorización Estimada</th>
                  </tr>
                </thead>
                <tbody>
                  {['Masas y Harinas', 'Salsas y Conservas', 'Lácteos y Quesos', 'Fiambres y Embutidos', 'Pastas Secas', 'Aceites y Condimentos', 'Vinos y Licores'].map((cat) => {
                    const itemsCat = products.filter(p => p.categoria === cat);
                    const totalStockCat = itemsCat.reduce((acc, p) => acc + p.stock, 0);
                    const totalValorCat = itemsCat.reduce((acc, p) => acc + (p.stock * p.precio), 0);
                    return (
                      <tr key={cat}>
                        <td className="fw-bold">{cat}</td>
                        <td>{itemsCat.length}</td>
                        <td>{totalStockCat} u.</td>
                        <td>${totalValorCat.toLocaleString('es-CL')}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}