import { useState } from 'react';
import { crearMensaje } from '../data/db.js';
import { validarFormularioContacto } from '../utils/validaciones.js';

const VACIO = { nombre: '', email: '', mensaje: '' };

/* Formulario de contacto con validación JS. Guarda el mensaje en db.js. */
export default function ContactSection() {
  const [valores, setValores] = useState(VACIO);
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  const cambiar = (e) => {
    setValores((v) => ({ ...v, [e.target.name]: e.target.value }));
    setEnviado(false);
  };

  const enviar = (e) => {
    e.preventDefault();
    const nuevos = validarFormularioContacto(valores);
    setErrores(nuevos);
    if (Object.keys(nuevos).length) return;
    crearMensaje(valores);
    setValores(VACIO);
    setEnviado(true);
  };

  const campo = (id, etiqueta, props = {}) => (
    <div className="mb-3">
      <label htmlFor={`contacto-${id}`} className="form-label">{etiqueta}</label>
      {props.as === 'textarea' ? (
        <textarea id={`contacto-${id}`} name={id} rows="4" className={`form-control ${errores[id] ? 'is-invalid' : ''}`}
          value={valores[id]} onChange={cambiar} aria-invalid={Boolean(errores[id])} />
      ) : (
        <input id={`contacto-${id}`} name={id} type={props.type || 'text'} className={`form-control ${errores[id] ? 'is-invalid' : ''}`}
          value={valores[id]} onChange={cambiar} aria-invalid={Boolean(errores[id])} />
      )}
      {errores[id] && <div className="invalid-feedback" role="alert">{errores[id]}</div>}
    </div>
  );

  return (
    <section id="contacto" className="lcn-section">
      <div className="container">
        <div className="lcn-panel">
          <header className="lcn-section-title">
            <span>Escríbenos</span>
            <h2>Contacto</h2>
          </header>
          <div className="row justify-content-center">
            <div className="col-lg-7">
              {enviado && <div className="alert alert-success" role="status">¡Gracias! Recibimos tu mensaje y te responderemos pronto.</div>}
              <form onSubmit={enviar} noValidate>
                {campo('nombre', 'Nombre y apellido')}
                {campo('email', 'Correo electrónico', { type: 'email' })}
                {campo('mensaje', 'Mensaje', { as: 'textarea' })}
                <button type="submit" className="btn lcn-btn-primary">Enviar mensaje</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
