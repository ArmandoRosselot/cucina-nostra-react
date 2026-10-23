/* ============================================================
   validaciones.js
   Funciones puras de validación (sin React, sin DOM).
   Cada validador devuelve '' si el valor es válido, o el
   mensaje de error si no lo es. Así son fáciles de probar.
   ============================================================ */

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const REGEX_NOMBRE = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?:[ '\-.][A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)*\.?$/;
const REGEX_TELEFONO_CL = /^(?:\+?56)?9\d{8}$/;

export const limpiar = (valor) => String(valor ?? '').trim();

export function validarNombre(valor) {
  const nombre = limpiar(valor);
  if (!nombre) return 'El nombre es obligatorio.';
  if (nombre.length < 3) return 'El nombre debe tener al menos 3 caracteres.';
  if (nombre.length > 60) return 'El nombre no puede superar los 60 caracteres.';
  if (!REGEX_NOMBRE.test(nombre)) return 'El nombre solo puede contener letras y espacios.';
  if (nombre.split(/\s+/).length < 2) return 'Ingresa tu nombre y apellido.';
  return '';
}

export function validarEmail(valor) {
  const email = limpiar(valor);
  if (!email) return 'El correo es obligatorio.';
  if (email.length > 100) return 'El correo no puede superar los 100 caracteres.';
  if (!REGEX_EMAIL.test(email)) return 'Ingresa un correo válido, por ejemplo nombre@correo.cl.';
  return '';
}

export function validarConfirmacionEmail(email, confirmacion) {
  if (!limpiar(confirmacion)) return 'Confirma tu correo.';
  if (limpiar(email).toLowerCase() !== limpiar(confirmacion).toLowerCase()) {
    return 'Los correos no coinciden.';
  }
  return '';
}

export function validarPassword(valor) {
  const password = String(valor ?? '');
  if (!password) return 'La contraseña es obligatoria.';
  if (password.length < 8) return 'La contraseña debe tener al menos 8 caracteres.';
  if (password.length > 50) return 'La contraseña no puede superar los 50 caracteres.';
  if (!/[a-z]/.test(password)) return 'Debe incluir al menos una letra minúscula.';
  if (!/[A-Z]/.test(password)) return 'Debe incluir al menos una letra mayúscula.';
  if (!/\d/.test(password)) return 'Debe incluir al menos un número.';
  return '';
}

export function validarConfirmacionPassword(password, confirmacion) {
  if (!confirmacion) return 'Confirma tu contraseña.';
  if (password !== confirmacion) return 'Las contraseñas no coinciden.';
  return '';
}

/* El teléfono es opcional. Si se escribe, debe ser celular chileno
   (9 XXXX XXXX), con o sin +56. */
export function validarTelefono(valor) {
  const telefono = limpiar(valor).replace(/[\s-]/g, '');
  if (!telefono) return '';
  if (!REGEX_TELEFONO_CL.test(telefono)) {
    return 'Ingresa un celular válido, por ejemplo +56 9 1234 5678.';
  }
  return '';
}

/* Validador para el buscador del menú. */
export function validarBusqueda(valor) {
  const texto = String(valor ?? '');
  if (texto.length > 40) return 'La búsqueda no puede superar los 40 caracteres.';
  if (/[<>]/.test(texto)) return 'La búsqueda contiene caracteres no permitidos.';
  return '';
}

export function validarMensaje(valor) {
  const mensaje = limpiar(valor);
  if (!mensaje) return 'El mensaje es obligatorio.';
  if (mensaje.length < 10) return 'El mensaje debe tener al menos 10 caracteres.';
  if (mensaje.length > 500) return 'El mensaje no puede superar los 500 caracteres.';
  return '';
}

/* ---- Validadores de formularios completos ---------------- */

const soloConErrores = (errores) =>
  Object.fromEntries(Object.entries(errores).filter(([, mensaje]) => mensaje));

export function validarFormularioLogin({ email, password }) {
  return soloConErrores({
    email: validarEmail(email),
    password: String(password ?? '') ? '' : 'La contraseña es obligatoria.'
  });
}

export function validarFormularioRegistro(valores) {
  return soloConErrores({
    nombre: validarNombre(valores.nombre),
    email: validarEmail(valores.email),
    confirmarEmail: validarConfirmacionEmail(valores.email, valores.confirmarEmail),
    password: validarPassword(valores.password),
    confirmarPassword: validarConfirmacionPassword(valores.password, valores.confirmarPassword),
    telefono: validarTelefono(valores.telefono)
  });
}

export function validarFormularioContacto({ nombre, email, mensaje }) {
  return soloConErrores({
    nombre: validarNombre(nombre),
    email: validarEmail(email),
    mensaje: validarMensaje(mensaje)
  });
}

/* Formatea un número como precio chileno: 5500 -> "$5.500". */
export function formatearPrecio(monto) {
  const numero = Math.round(Number(monto) || 0);
  return '$' + String(numero).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
