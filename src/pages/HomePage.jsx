import { useState, useRef, useEffect } from 'react';
import { useApp } from '../hooks/useApp';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ActiveFiltersSticky from '../components/ActiveFiltersSticky';
import { FeaturedProducts } from '../components/ProductSections';
import FilterBar from '../components/FilterBar';
import ProductModal from '../components/ProductModal';
import CartDrawer from '../components/CartDrawer';
import Footer from '../components/Footer';
import Toast from '../components/Toast';
import { getFloatingTrigger } from '../lib/floatingTrigger';
import { FiChevronUp } from 'react-icons/fi';

export default function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastKey, setToastKey] = useState(0);
  const [cartBounce, setCartBounce] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const cartRef = useRef(null);
  const { filteredProducts, cartCount, addToCart } = useApp();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCart = () => setCartOpen(true);
  const handleCloseCart = () => setCartOpen(false);
  const handleOpenModal = (product) => setSelectedProduct(product);
  const handleCloseModal = () => setSelectedProduct(null);

  const handleAddToCart = (product, size, qty, buttonEl) => {
    addToCart(product, size, qty);
    setToastKey(prev => prev + 1);
    setToastVisible(true);
    setCartBounce(true);
    setTimeout(() => setCartBounce(false), 700);
    if (buttonEl) {
      const trigger = getFloatingTrigger();
      trigger?.(buttonEl, product.modelo || product.marcas?.nombre || 'Producto', cartRef.current);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-300">
      <Navbar onOpenCart={handleOpenCart} cartCount={cartCount} cartBounce={cartBounce} cartRef={cartRef} />
      <main className="flex-grow w-full">
        <HeroSection />
        
        {/* Sticky Filters Container - Keeps both filters visible together */}
        <div className="sticky top-16 lg:top-20 z-30 w-full">
          <FilterBar />
          <ActiveFiltersSticky />
        </div>
        
        <FeaturedProducts products={filteredProducts} onOpenModal={handleOpenModal} />
      </main>
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} onAddToCart={handleAddToCart} />
      )}
      <CartDrawer isOpen={cartOpen} onClose={handleCloseCart} />
      {toastVisible && (
        <Toast key={toastKey} message="Su producto se agregó correctamente al carrito" onClose={() => setToastVisible(false)} />
      )}
      
      {/* Botón Volver Arriba - Bajado un poco para no tapar filtros */}
      <button
        onClick={scrollToTop}
        className={`fixed top-56 lg:top-64 right-4 lg:right-8 z-50 p-3 bg-blue-700 text-white rounded-full shadow-[0_10px_25px_-5px_rgba(29,78,216,0.5)] transition-all duration-500 ease-in-out hover:bg-blue-800 hover:scale-110 active:scale-95 ${cartOpen || selectedProduct ? 'hidden' : (showScrollTop ? 'translate-y-0 opacity-100 visible' : 'translate-y-12 opacity-0 invisible')}`}
        aria-label="Volver arriba"
      >
        <FiChevronUp size={28} strokeWidth={3} />
      </button>

      <Footer />
    </div>
  );
}