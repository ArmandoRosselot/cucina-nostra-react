import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormField from '../components/FormField.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { autenticarUsuario } from '../data/db.js';
import { validarFormularioLogin } from '../utils/validaciones.js';

export default function Login() {
  const [valores, setValores] = useState({ email: '', password: '' });
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState('');
  const { entrar } = useAuth();
  const navigate = useNavigate();

  const cambiar = (e) => {
    setValores((v) => ({ ...v, [e.target.name]: e.target.value }));
    setErrorGeneral('');
  };

  const enviar = (e) => {
    e.preventDefault();
    const nuevos = validarFormularioLogin(valores);
    setErrores(nuevos);
    if (Object.keys(nuevos).length) return;

    const resultado = autenticarUsuario(valores.email, valores.password);
    if (!resultado.ok) {
      setErrorGeneral(resultado.error);
      return;
    }
    entrar(resultado.usuario);
    navigate('/');
  };

  return (
    <main className="auth-page">
      <div className="card-box">
        <div className="text-center">
          <img src="/img/logo.jpg" alt="Logo La Cucina Nostra" className="login-logo" />
        </div>
        <h3>Iniciar Sesión</h3>

        {errorGeneral && <div className="alert alert-danger py-2" role="alert">{errorGeneral}</div>}

        <form onSubmit={enviar} noValidate>
          <FormField id="email" label="Correo Electrónico" icono="bi-envelope-fill" type="email"
            placeholder="Ingrese su email" autoComplete="email"
            value={valores.email} onChange={cambiar} error={errores.email} />
          <FormField id="password" label="Contraseña" icono="bi-lock-fill" type="password"
            placeholder="••••••••" autoComplete="current-password"
            value={valores.password} onChange={cambiar} error={errores.password} />
          <button type="submit" className="btn-main">Entrar</button>
        </form>

        <p className="text-center mt-3 small">
          ¿No tienes cuenta? <Link to="/register">Registrarse</Link>
        </p>
        <p className="text-center small mb-0"><Link to="/">← Volver al inicio</Link></p>
      </div>
    </main>
  );
}
