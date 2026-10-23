export default function Footer() {
  return (
    <footer className="lcn-footer text-center py-4">
      <div className="container">
        <p className="mb-0">
          © {new Date().getFullYear()} <strong>Restaurante La Cucina Nostra</strong> · Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
}
