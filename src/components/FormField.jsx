/* Campo de formulario reutilizable con icono y mensaje de error.
   Props: id, label, icono, error, y el resto (type, value, onChange…) pasa al <input>. */
export default function FormField({ id, label, icono, error, ...inputProps }) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">{label}</label>
      <div className="input-group has-validation">
        <span className="input-group-text"><i className={`bi ${icono}`} aria-hidden="true" /></span>
        <input
          id={id}
          name={id}
          className={`form-control ${error ? 'is-invalid' : ''}`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          {...inputProps}
        />
        {error && <div id={`${id}-error`} className="invalid-feedback" role="alert">{error}</div>}
      </div>
    </div>
  );
}
