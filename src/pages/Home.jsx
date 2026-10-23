import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Carousel from '../components/Carousel.jsx';
import CategoriasSection from '../components/CategoriasSection.jsx';
import OfertasSection from '../components/OfertasSection.jsx';
import MenuSection from '../components/MenuSection.jsx';
import About from '../components/About.jsx';
import Historias from '../components/Historias.jsx';
import ContactSection from '../components/ContactSection.jsx';
import Footer from '../components/Footer.jsx';
import ProductDetailModal from '../components/ProductDetailModal.jsx';
import CartPanel from '../components/CartPanel.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { obtenerProductos, obtenerOfertas, CATEGORIAS } from '../data/db.js';

const SLIDES = [
  { imagen: '/img/about.jpg', titulo: 'Nuevos sabores de Italia', texto: 'Descubre los platos que preparamos esta temporada.' },
  { imagen: '/img/events-1.jpg', titulo: 'Ofertas de la semana', texto: 'Pastas, pizzas y entradas con precio especial.' },
  { imagen: '/img/events-2.jpg', titulo: 'Horno de leña desde 1978', texto: 'La receta de la nonna, en tu mesa.' }
];

const irA = (id) => setTimeout(() => document.getElementById(id)?.scrollIntoView?.({ behavior: 'smooth' }), 0);

export default function Home() {
  // Los datos vienen de la "base de datos" (db.js) y se guardan en estado.
  const [productos] = useState(() => obtenerProductos());
  const [ofertas] = useState(() => obtenerOfertas());
  const [categoria, setCategoria] = useState(CATEGORIAS[0]);
  const [busqueda, setBusqueda] = useState('');
  const [detalle, setDetalle] = useState(null);
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [aviso, setAviso] = useState('');
  const { agregar } = useCart();
  const { sesion } = useAuth();
  const { hash } = useLocation();
  const navigate = useNavigate();

  // Una tarjeta por categoría, con la foto de su primer plato.
  const categoriasInfo = useMemo(
    () => CATEGORIAS.map((nombre) => {
      const items = productos.filter((p) => p.categoria === nombre);
      return { nombre, imagen: items[0]?.imagen ?? '', cantidad: items.length };
    }),
    [productos]
  );

  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView?.({ behavior: 'smooth' });
  }, [hash]);

  useEffect(() => {
    if (!aviso) return undefined;
    const t = setTimeout(() => setAviso(''), 3000);
    return () => clearTimeout(t);
  }, [aviso]);

  const buscar = (texto) => { setBusqueda(texto); irA('menu'); };
  const elegirCategoria = (nombre) => { setCategoria(nombre); setBusqueda(''); irA('menu'); };

  const agregarProducto = (producto) => {
    agregar(producto.id);
    setAviso(`${producto.nombre} se agregó al carrito`);
  };

  const realizarPedido = () => {
    setCarritoAbierto(false);
    if (!sesion) { navigate('/login'); return; }
    setAviso('¡Pedido recibido! El pago se implementa en la siguiente etapa.');
  };

  return (
    <div className="lcn-home">
      <Navbar onAbrirCarrito={() => setCarritoAbierto(true)} onBuscar={buscar} onCategoria={elegirCategoria} />
      <main>
        <h1 className="visually-hidden">La Cucina Nostra – Auténtica comida italiana</h1>
        <Carousel slides={SLIDES} />
        <CategoriasSection categorias={categoriasInfo} onSeleccionar={elegirCategoria} />
        <OfertasSection productos={ofertas} onAgregar={agregarProducto} onVerDetalle={setDetalle} />
        <MenuSection
          productos={productos} categorias={CATEGORIAS} categoria={categoria} busqueda={busqueda}
          onCategoria={elegirCategoria} onLimpiar={() => setBusqueda('')}
          onAgregar={agregarProducto} onVerDetalle={setDetalle}
        />
        <About />
        <Historias />
        <ContactSection />
      </main>
      <Footer />

      <ProductDetailModal producto={detalle} onCerrar={() => setDetalle(null)} onAgregar={agregarProducto} />
      <CartPanel abierto={carritoAbierto} onCerrar={() => setCarritoAbierto(false)} onPedir={realizarPedido} />
      {aviso && <div className="lcn-toast" role="status">{aviso}</div>}
    </div>
  );
}
