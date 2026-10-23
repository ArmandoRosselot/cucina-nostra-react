/* ============================================================
   db.js  —  "Base de datos" simulada en JavaScript
   Persistencia en localStorage. Expone funciones CRUD para:
     - productos (platos del menú)
     - carrito
     - usuarios y sesión (registro / inicio de sesión)
   Ningún componente toca localStorage directamente: todo pasa
   por este archivo, así es fácil de probar con mocks.
   ============================================================ */

export const KEYS = {
  PRODUCTOS: 'lcn_productos',
  CARRITO: 'lcn_carrito',
  USUARIOS: 'lcn_usuarios',
  SESION: 'lcn_sesion',
  MENSAJES: 'lcn_mensajes'
};

const foto = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=700&q=80`;

export const CATEGORIAS = ['Entradas', 'Desayuno', 'Almuerzo', 'Cena'];

const PRODUCTOS_BASE = [
  { id: 1, categoria: 'Entradas', nombre: 'Bruschetta tradicional', ingredientes: 'Ciabatta, tomate, ajo, albahaca y aceite de oliva', precio: 5500, imagen: foto('photo-1594978583693-8dfdfc93f052') },
  { id: 2, categoria: 'Entradas', nombre: 'Ensalada Caprese', ingredientes: 'Tomate, mozzarella, albahaca y aceite de oliva', precio: 8900, imagen: foto('photo-1665877417637-a20691d6ee8b') },
  { id: 3, categoria: 'Entradas', nombre: 'Carpaccio de res o salmón', ingredientes: 'Finas láminas de res o salmón, rúcula, parmesano y aceite de oliva', precio: 12900, imagen: foto('photo-1571770110109-46c4d1cfcd21') },
  { id: 4, categoria: 'Entradas', nombre: 'Caponata siciliana', ingredientes: 'Berenjena, tomate, cebolla, alcaparras y aceitunas', precio: 9900, imagen: foto('photo-1651494774473-94a7cb9bd514') },
  { id: 5, categoria: 'Entradas', nombre: 'Arancini', ingredientes: 'Bolitas de arroz rellenas de queso y salsa de tomate', precio: 10500, imagen: foto('photo-1632778140142-d62dee6e124c') },
  { id: 6, categoria: 'Desayuno', nombre: 'Cornetto con Cappuccino', ingredientes: 'Croissant relleno de crema o chocolate con un cappuccino', precio: 7900, imagen: foto('photo-1706698319512-499cd769990a') },
  { id: 7, categoria: 'Desayuno', nombre: 'Bomboloni', ingredientes: 'Donas italianas rellenas de crema, chocolate o mermelada', precio: 3900, imagen: foto('photo-1589199750869-334ae4187406') },
  { id: 8, categoria: 'Desayuno', nombre: 'Uova in Purgatorio', ingredientes: 'Huevos escalfados en salsa de tomate con pan tostado', precio: 8900, imagen: foto('photo-1612950365425-dbf12ef9a1a8') },
  { id: 9, categoria: 'Desayuno', nombre: 'Frittata Italiana', ingredientes: 'Tortilla de huevo con verduras, queso y hierbas', precio: 9900, imagen: foto('photo-1579592886462-5dd9d955124c') },
  { id: 10, categoria: 'Desayuno', nombre: 'Tostada de Burrata', ingredientes: 'Pan tostado con burrata, tomate cherry y pesto', precio: 11500, imagen: foto('photo-1616412689611-ccfc4ad24939') },
  { id: 11, categoria: 'Almuerzo', nombre: 'Pizza Margherita', ingredientes: 'Tomate, mozzarella y albahaca', precio: 9900, imagen: foto('photo-1574071318508-1cdbab80d002') },
  { id: 12, categoria: 'Almuerzo', nombre: 'Pasta al Pesto', ingredientes: 'Pesto, parmesano y albahaca', precio: 10900, imagen: foto('photo-1551183053-bf91a1d81141') },
  { id: 13, categoria: 'Almuerzo', nombre: 'Lasagna della Nonna', ingredientes: 'Carne, pasta, salsa y queso', precio: 11900, imagen: foto('photo-1547592180-85f173990554') },
  { id: 14, categoria: 'Cena', nombre: 'Pizza Prosciutto', ingredientes: 'Prosciutto, mozzarella y rúcula', precio: 12500, imagen: foto('photo-1571997478779-2adcbbe9ab2f') },
  { id: 15, categoria: 'Cena', nombre: 'Spaghetti Carbonara', ingredientes: 'Pasta, huevo, queso y panceta', precio: 10500, imagen: foto('photo-1473093295043-cdd812d0e601') },
  { id: 16, categoria: 'Cena', nombre: 'Ravioli di Ricotta', ingredientes: 'Ricotta, espinaca y salsa pomodoro', precio: 11500, imagen: foto('photo-1563379926898-05f4575a45d8') }
];

/* Precios de oferta (id -> precio rebajado). */
const OFERTAS = { 2: 6900, 5: 7900, 9: 7500, 12: 8900, 13: 9900, 15: 8500 };

export const PRODUCTOS_INICIALES = PRODUCTOS_BASE.map((p) =>
  OFERTAS[p.id] ? { ...p, precioOferta: OFERTAS[p.id] } : p
);

/* ---------- utilidades internas ---------- */

function leer(clave, porDefecto) {
  try {
    const crudo = localStorage.getItem(clave);
    return crudo === null ? porDefecto : JSON.parse(crudo);
  } catch {
    return porDefecto;
  }
}

function escribir(clave, valor) {
  localStorage.setItem(clave, JSON.stringify(valor));
}

/* ============================================================
   PRODUCTOS  (CRUD)
   ============================================================ */

/* READ: lista completa. Si es la primera visita, siembra los datos. */
export function obtenerProductos() {
  const guardados = leer(KEYS.PRODUCTOS, null);
  if (!Array.isArray(guardados)) {
    escribir(KEYS.PRODUCTOS, PRODUCTOS_INICIALES);
    return [...PRODUCTOS_INICIALES];
  }
  return guardados;
}

/* READ: un producto por id (o null). */
export function obtenerProductoPorId(id) {
  return obtenerProductos().find((p) => p.id === Number(id)) ?? null;
}

/* READ: productos de una categoría. */
export function obtenerProductosPorCategoria(categoria) {
  return obtenerProductos().filter((p) => p.categoria === categoria);
}

/* READ: productos con precio de oferta vigente. */
export function obtenerOfertas() {
  return obtenerProductos().filter((p) => p.precioOferta != null && p.precioOferta < p.precio);
}

/* CREATE */
export function crearProducto({ nombre, categoria, ingredientes, precio, imagen = '' }) {
  const productos = obtenerProductos();
  const siguienteId = productos.length ? Math.max(...productos.map((p) => p.id)) + 1 : 1;
  const nuevo = {
    id: siguienteId,
    nombre: String(nombre).trim(),
    categoria,
    ingredientes: String(ingredientes ?? '').trim(),
    precio: Number(precio),
    imagen
  };
  escribir(KEYS.PRODUCTOS, [...productos, nuevo]);
  return nuevo;
}

/* UPDATE: devuelve el producto actualizado o null si no existe. */
export function actualizarProducto(id, cambios) {
  const productos = obtenerProductos();
  const indice = productos.findIndex((p) => p.id === Number(id));
  if (indice === -1) return null;
  const actualizado = { ...productos[indice], ...cambios, id: productos[indice].id };
  if (cambios.precio !== undefined) actualizado.precio = Number(cambios.precio);
  if (cambios.precioOferta !== undefined && cambios.precioOferta !== null) {
    actualizado.precioOferta = Number(cambios.precioOferta);
  }
  productos[indice] = actualizado;
  escribir(KEYS.PRODUCTOS, productos);
  return actualizado;
}

/* DELETE: devuelve true si eliminó algo. */
export function eliminarProducto(id) {
  const productos = obtenerProductos();
  const restantes = productos.filter((p) => p.id !== Number(id));
  if (restantes.length === productos.length) return false;
  escribir(KEYS.PRODUCTOS, restantes);
  return true;
}

export function restablecerProductos() {
  escribir(KEYS.PRODUCTOS, PRODUCTOS_INICIALES);
}

/* ============================================================
   CARRITO  (persistencia)
   Cada ítem: { id, cantidad }
   ============================================================ */

export function obtenerCarrito() {
  const carrito = leer(KEYS.CARRITO, []);
  return Array.isArray(carrito) ? carrito : [];
}

export function guardarCarrito(items) {
  escribir(KEYS.CARRITO, items);
}

export function vaciarCarritoGuardado() {
  localStorage.removeItem(KEYS.CARRITO);
}

/* ============================================================
   USUARIOS Y SESIÓN
   (Simulación académica: en un sistema real la contraseña
   nunca se guarda en texto plano ni en el navegador.)
   ============================================================ */

export function obtenerUsuarios() {
  const usuarios = leer(KEYS.USUARIOS, []);
  return Array.isArray(usuarios) ? usuarios : [];
}

export function buscarUsuarioPorEmail(email) {
  const buscado = String(email).trim().toLowerCase();
  return obtenerUsuarios().find((u) => u.email.toLowerCase() === buscado) ?? null;
}

/* Devuelve { ok:true, usuario } o { ok:false, error }. */
export function registrarUsuario({ nombre, email, password, telefono = '' }) {
  if (buscarUsuarioPorEmail(email)) {
    return { ok: false, error: 'Ya existe una cuenta registrada con ese correo.' };
  }
  const usuarios = obtenerUsuarios();
  const usuario = {
    id: usuarios.length ? Math.max(...usuarios.map((u) => u.id)) + 1 : 1,
    nombre: String(nombre).trim(),
    email: String(email).trim().toLowerCase(),
    password,
    telefono: String(telefono).trim()
  };
  escribir(KEYS.USUARIOS, [...usuarios, usuario]);
  return { ok: true, usuario };
}

/* Devuelve { ok:true, usuario } o { ok:false, error }. */
export function autenticarUsuario(email, password) {
  const usuario = buscarUsuarioPorEmail(email);
  if (!usuario || usuario.password !== password) {
    return { ok: false, error: 'Correo o contraseña incorrectos.' };
  }
  return { ok: true, usuario };
}

export function iniciarSesion(usuario) {
  escribir(KEYS.SESION, { id: usuario.id, nombre: usuario.nombre, email: usuario.email });
}

export function obtenerSesion() {
  return leer(KEYS.SESION, null);
}

export function cerrarSesion() {
  localStorage.removeItem(KEYS.SESION);
}

/* ============================================================
   MENSAJES DE CONTACTO  (CREATE / READ / DELETE)
   ============================================================ */

export function obtenerMensajes() {
  const mensajes = leer(KEYS.MENSAJES, []);
  return Array.isArray(mensajes) ? mensajes : [];
}

export function crearMensaje({ nombre, email, mensaje }) {
  const mensajes = obtenerMensajes();
  const nuevo = {
    id: mensajes.length ? Math.max(...mensajes.map((m) => m.id)) + 1 : 1,
    nombre: String(nombre).trim(),
    email: String(email).trim().toLowerCase(),
    mensaje: String(mensaje).trim(),
    fecha: new Date().toISOString()
  };
  escribir(KEYS.MENSAJES, [...mensajes, nuevo]);
  return nuevo;
}

export function eliminarMensaje(id) {
  const mensajes = obtenerMensajes();
  const restantes = mensajes.filter((m) => m.id !== Number(id));
  if (restantes.length === mensajes.length) return false;
  escribir(KEYS.MENSAJES, restantes);
  return true;
}
