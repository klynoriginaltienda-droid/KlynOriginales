import { FiInstagram } from 'react-icons/fi';
import { FaWhatsapp, FaTiktok } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { KLYN_CONFIG, getWhatsAppLink } from '../lib/config';

const marqueeCSS = `
  @keyframes marquee {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .footer-marquee-track {
    display: flex;
    width: max-content;
    animation: marquee 12s linear infinite;
    will-change: transform;
  }
  .footer-marquee-track:hover {
    animation-play-state: paused;
  }
`;

const carouselImages = [
  '/recomendacion/1.webp',
  '/recomendacion/2.webp',
  '/recomendacion/3.webp',
  '/recomendacion/4.webp',
  '/recomendacion/5.webp',
  '/recomendacion/6.webp',
  '/recomendacion/7.webp',
  '/recomendacion/8.webp',
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-700 text-white py-8 px-4 sm:px-6 lg:px-8">
      <style>{marqueeCSS}</style>

      <div className="max-w-7xl mx-auto space-y-8">

        {/* Marquee — reemplaza el carousel */}
        <div
          className="overflow-hidden rounded-xl bg-white shadow-xl py-6"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          }}
        >
          <div className="footer-marquee-track">
            {[...carouselImages, ...carouselImages].map((src, i) => (
              <div key={i} className="px-4 flex-shrink-0">
                <img
                  src={src}
                  alt={`Productos recomendados KLYN Originales ${(i % carouselImages.length) + 1}`}
                  width={200}
                  height={150}
                  loading="lazy"
                  className="w-auto object-cover rounded-lg"
                  style={{ height: '150px', width: 'auto' }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-sans font-bold text-xl">KLYN ORIGINALES</span>
            </div>
            <p className="text-gray-300 text-sm font-sans">
              Tu tienda de confianza para productos originales.
            </p>
          </div>

          <div>
            <h4 className="font-sans font-bold mb-4">Dirección</h4>
            <div className="mt-4 rounded-lg overflow-hidden h-32">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3969.8!2d-80.6274529!3d-5.1956059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x904a116c6395846f%3A0x4c8e5e8edb03c522!2sKLYN%20ORIGINALES%20PIURA!5e0!3m2!1ses!2spe!4v1700000000000!5m2!1ses!2spe"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación"
              />
            </div>
          </div>

          <div>
            <h4 className="font-sans font-bold mb-4">Síguenos</h4>
            <div className="flex flex-row items-center gap-2">
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <FaWhatsapp size={20} />
              </a>
              <a href={`https://www.instagram.com/${KLYN_CONFIG.instagram}`} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <FiInstagram size={20} />
              </a>
              <a href={`https://www.tiktok.com/@${KLYN_CONFIG.tiktok}`} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <FaTiktok size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-sans font-bold mb-4">Navegación</h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-gray-300 hover:text-white transition-colors text-sm">Inicio</Link>
              <Link to="/about" className="text-gray-300 hover:text-white transition-colors text-sm">Nosotros</Link>
              <Link to="/about/politicas" className="text-gray-300 hover:text-white transition-colors text-sm">Políticas</Link>
              <Link to="/reclamaciones" className="block">
                <img
                  src="/img-libro-reclamacion.webp"
                  alt="Libro de Reclamaciones"
                  className="h-16 w-auto hover:opacity-80 transition-opacity cursor-pointer"
                  loading="lazy"
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-300 font-sans">
            © {currentYear} KLYN ORIGINALES. Todos los derechos reservados.
          </p>
          <p className="text-sm text-gray-300 font-sans">
             Developed{' '}
            <a href="https://wa.me/51905679279" target="_blank" rel="noopener noreferrer"
              className="text-blue-300 hover:underline">
              Eduardo Musayon
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}