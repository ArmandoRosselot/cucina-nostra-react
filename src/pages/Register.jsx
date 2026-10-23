import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormField from '../components/FormField.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { registrarUsuario } from '../data/db.js';
import { validarFormularioRegistro } from '../utils/validaciones.js';

const VACIO = { nombre: '', email: '', confirmarEmail: '', password: '', confirmarPassword: '', telefono: '' };

export default function Register() {
  const [valores, setValores] = useState(VACIO);
  const [errores, setErrores] = useState({});
  const [tocados, setTocados] = useState({});
  const [errorGeneral, setErrorGeneral] = useState('');
  const { entrar } = useAuth();
  const navigate = useNavigate();

  // Valida en vivo, pero solo muestra el error de los campos que el usuario ya tocó.
  const revalidar = (nuevosValores, camposTocados) => {
    const todos = validarFormularioRegistro(nuevosValores);
    setErrores(Object.fromEntries(Object.entries(todos).filter(([campo]) => camposTocados[campo])));
  };

  const cambiar = (e) => {
    const nuevos = { ...valores, [e.target.name]: e.target.value };
    setValores(nuevos);
    setErrorGeneral('');
    revalidar(nuevos, tocados);
  };

  const alSalir = (e) => {
    const nuevosTocados = { ...tocados, [e.target.name]: true };
    setTocados(nuevosTocados);
    revalidar(valores, nuevosTocados);
  };

  const enviar = (e) => {
    e.preventDefault();
    const nuevos = validarFormularioRegistro(valores);
    setTocados(Object.fromEntries(Object.keys(VACIO).map((c) => [c, true])));
    setErrores(nuevos);
    if (Object.keys(nuevos).length) return;

    const resultado = registrarUsuario(valores);
    if (!resultado.ok) {
      setErrorGeneral(resultado.error);
      return;
    }
    entrar(resultado.usuario);
    navigate('/');
  };

  const campo = (id, label, icono, extra = {}) => (
    <FormField id={id} label={label} icono={icono} value={valores[id]}
      onChange={cambiar} onBlur={alSalir} error={errores[id]} {...extra} />
  );

  return (
    <main className="auth-page">
      <div className="card-box">
        <h3>Crear Cuenta</h3>

        {errorGeneral && <div className="alert alert-danger py-2" role="alert">{errorGeneral}</div>}

        <form onSubmit={enviar} noValidate>
          {campo('nombre', 'Nombre Completo', 'bi-person-fill', { type: 'text', placeholder: 'Ingrese su nombre completo', autoComplete: 'name' })}
          {campo('email', 'Correo Electrónico', 'bi-envelope-fill', { type: 'email', placeholder: 'Ingrese su email', autoComplete: 'email' })}
          {campo('confirmarEmail', 'Confirmar Correo Electrónico', 'bi-envelope-fill', { type: 'email', placeholder: 'Confirme su email', autoComplete: 'off' })}
          {campo('password', 'Ingrese Una Contraseña', 'bi-lock-fill', { type: 'password', placeholder: 'Crear una contraseña', autoComplete: 'new-password' })}
          {campo('confirmarPassword', 'Confirmar Contraseña', 'bi-lock-fill', { type: 'password', placeholder: 'Repite la contraseña', autoComplete: 'new-password' })}
          {campo('telefono', 'Teléfono (opcional)', 'bi-telephone-fill', { type: 'tel', placeholder: '+56 9 1234 5678', autoComplete: 'tel' })}
          <button type="submit" className="btn-main">Crear cuenta</button>
        </form>

        <p className="text-center mt-3 small">
          ¿Ya tienes cuenta? <Link to="/login">Iniciar Sesión</Link>
        </p>
        <p className="text-center small mb-0"><Link to="/">← Volver al inicio</Link></p>
      </div>
    </main>
  );
}
