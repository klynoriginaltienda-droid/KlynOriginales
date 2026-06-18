import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';

const cartCSS = `
  @keyframes bounce-cart {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
  }
  .cart-bounce {
    animation: bounce-cart 0.5s ease-in-out infinite;
  }

  @keyframes blink-light {
    0%, 100% {
      box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
      background-color: #dcfce7;
    }
    50% {
      box-shadow: 0 0 12px 4px rgba(34, 197, 94, 0.9);
      background-color: #dcfce7;
    }
  }
  .badge-blink {
    animation: blink-light 2s ease-in-out infinite;
  }

  .ripple-wave {
    position: absolute;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 6px solid rgba(0, 0, 0, 0.5);
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) scale(1);
    pointer-events: none;
    opacity: 0;
    z-index: 1;
    display: none;
  }
  .cart-container.ripple-active .ripple-wave {
    display: block;
    animation: ripple-expand 2.5s infinite cubic-bezier(0, 0, 0.2, 1);
  }
  .cart-container.ripple-active .ripple-wave:nth-child(1) { animation-delay: 0s; }
  .cart-container.ripple-active .ripple-wave:nth-child(2) { animation-delay: 0.8s; }
  .cart-container.ripple-active .ripple-wave:nth-child(3) { animation-delay: 1.6s; }

  @keyframes ripple-expand {
    0% { transform: translate(-35%, -50%) scale(0); opacity: 0.5; }
    15% { opacity: 0.6; }
    100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
  }

  /* Reduce dominance on small screens: smaller button and disable large animations */
  @media (max-width: 640px) {
    .cart-container { width: 40px !important; height: 40px !important; }
    .cart-container .ripple-wave { display: none !important; }
    .cart-bounce { animation: none !important; }
    .badge-blink { animation: none !important; }
  }
`;

export default function Navbar({ onOpenCart, cartCount, cartBounce, cartRef }) {
  const internalRef = useRef(null);
  const buttonRef = cartRef || internalRef;
  const hasItems = cartCount > 0;

  return (
    <>
      <style>{cartCSS}</style>
      <nav className="fixed top-0 inset-x-0 z-50 bg-lime-400/90 backdrop-blur-md border-b border-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to="/" className="flex items-center gap-3">
                <picture>
                  <source srcSet="/logo-klyn.webp" type="image/webp" />
                  <img 
                    src="/logo-klyn.png" 
                    alt="KLYN Originales Logo" 
                    className="h-12 lg:h-14 w-auto"
                  />
                </picture>
                <span className="font-sans font-bold text-xl lg:text-2xl tracking-widest text-black">
                  KLYN ORIGINALES
                </span>
              </Link>

              <div className="flex items-center gap-4">
                <Link
                  to="/about/politicas"
                  className="text-sm font-medium text-gray-800 hover:text-blue-700 transition-colors hidden sm:block"
                >
                  Políticas
                </Link>
                <button
                onClick={onOpenCart}
                className={`relative p-2 sm:p-3 rounded-full flex items-center justify-center hover:bg-white/60 transition-colors ${hasItems ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}
                aria-label="Carrito de compras"
                ref={buttonRef}
              >
                <div className={`cart-container relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center ${hasItems ? 'ripple-active' : ''}`}>
                  <div className="ripple-wave" />
                  <div className="ripple-wave" />
                  <div className="ripple-wave" />
                  <FiShoppingCart
                    size={28}
                    strokeWidth={3.5}
                    className={(cartBounce || hasItems) ? 'cart-bounce' : ''}
                  />
                  {hasItems && (
                    <span className="absolute -top-1.5 -right-1.5 badge-blink text-black font-bold w-6 h-6 rounded-full flex items-center justify-center text-xs shadow-lg">
                      {cartCount}
                    </span>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}