import { useState, useEffect, useRef } from 'react';
import { FiChevronLeft, FiChevronRight, FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const images = [
  '/recomendacion/1.png',
  '/recomendacion/2.png',
  '/recomendacion/3.png',
  '/recomendacion/4.png',
  '/recomendacion/5.png',
];

export default function AboutPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-300 via-gray-200 to-gray-300">
      <header className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-b border-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to="/" className="flex items-center gap-2">
              <span className="font-sans font-bold text-xl lg:text-2xl tracking-widest text-text">
                KLYN ORIGINAL
              </span>
            </Link>
            <Link 
              to="/"
              className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
            >
              <FiArrowLeft size={20} />
              <span className="font-medium">Volver</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl lg:text-4xl font-bold text-center text-text mb-8">
            Sobre Nosotros
          </h1>

          <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="relative aspect-[4/3] flex items-center justify-center">
              <img
                src={images[currentIndex]}
                alt={`Recomendación ${currentIndex + 1}`}
                className="max-w-full max-h-full object-contain"
              />
              
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/20 hover:bg-black/40 rounded-full flex items-center justify-center transition-colors"
              >
                <FiChevronLeft size={24} className="text-white" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/20 hover:bg-black/40 rounded-full flex items-center justify-center transition-colors"
              >
                <FiChevronRight size={24} className="text-white" />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i === currentIndex ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Mapa de ubicación */}
          <div className="mt-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-center text-text mb-4">
              Nuestra Ubicación
            </h2>
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3969.8!2d-80.6274529!3d-5.1956059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x904a116c6395846f%3A0x4c8e5e8edb03c522!2sKLYN%20ORIGINALES%20PIURA!5e0!3m2!1ses!2spe!4v1700000000000!5m2!1ses!2spe"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de KLYN ORIGINAL"
                className="w-full"
              ></iframe>
            </div>
            <p className="text-center text-gray-600 mt-2">
              KLYN ORIGINALES PIURA - Av. Buenos Aires, Piura
            </p>
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/about/politicas"
              className="inline-flex items-center gap-2 px-6 py-3 bg-lime-400 text-blue-700 font-semibold rounded-full hover:bg-lime-500 transition-colors"
            >
              Ver Políticas de la Tienda
            </Link>
          </div>

          <div className="mt-8 text-center">
            <Link 
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary2 transition-colors"
            >
              <FiArrowLeft size={20} />
              Volver a la tienda
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}