import { FaWhatsapp, FaTiktok } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa6';
import { KLYN_CONFIG, getWhatsAppLink } from '../lib/config';

const marqueeCSS = `
  @keyframes marquee {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .marquee-track {
    display: flex;
    width: max-content;
    animation: marquee 10s linear infinite;
    will-change: transform;
  }
  .marquee-track:hover {
    animation-play-state: paused;
  }
`;

const IMAGES = [
  { src: '/j1.webp', alt: 'J1 originales en stock Piura' },
  { src: '/card.webp', alt: 'Nike originales en stock Piura' },
  { src: '/zaps.webp', alt: 'Adidas originales en stock Piura' },
  { src: '/placa.webp', alt: 'Reebok originales en stock Piura' },
];

export default function HeroSection() {
  const whatsappLink   = getWhatsAppLink();
  const instagramLink  = `https://www.instagram.com/${KLYN_CONFIG.instagram}`;
  const tiktokLink     = `https://www.tiktok.com/@${KLYN_CONFIG.tiktok}`;
  const mapsLink       = KLYN_CONFIG.maps;

  return (
    <section className="pt-20 pb-2 px-4 sm:px-6 lg:px-8 bg-slate-300 w-full">
      <h1 className="text-slate-300 text-sm lg:text-lg font-bold text-center">Zapatillas originales en Piura | Klyn Originales</h1>
      <style>{marqueeCSS}</style>

      <div className="w-full max-w-full mx-0">
        <div className="bg-white rounded-2xl overflow-hidden shadow-xl px-4 py-5 lg:px-10 lg:py-6 w-full">

          <div className="flex flex-col items-center justify-center gap-4 lg:gap-8">

            <div
              className="w-full overflow-hidden rounded-xl min-w-0"
              style={{
                maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 42%, black 58%, transparent 100%)',
              }}
            >
              <div className="marquee-track">
                {[...IMAGES, ...IMAGES].map((img, i) => (
                  <div key={i} className="px-2 lg:px-3 flex-shrink-0">
                    <img
                      src={img.src}
                      alt={img.alt}
                      width={400}
                      height={288}
                      loading={i === 0 ? "eager" : "lazy"}
                      fetchPriority={i === 0 ? "high" : "auto"}
                      className="h-40 sm:h-52 lg:h-72 w-auto object-cover rounded-2xl shadow-lg"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 lg:gap-4 bg-white rounded-xl px-4 lg:px-5 py-3 lg:py-4 shadow-lg w-fit">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer"
                className="w-12 lg:w-16 h-12 lg:h-16 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                title="WhatsApp">
                <FaWhatsapp size={28} className="text-green-500" />
              </a>
              <a href={instagramLink} target="_blank" rel="noopener noreferrer"
                className="w-12 lg:w-16 h-12 lg:h-16 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                title="Instagram">
                <FaInstagram size={28} className="text-pink-600" />
              </a>
              <a href={tiktokLink} target="_blank" rel="noopener noreferrer"
                className="w-12 lg:w-16 h-12 lg:h-16 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                title="TikTok">
                <FaTiktok size={28} className="text-black" />
              </a>
              <a href={mapsLink} target="_blank" rel="noopener noreferrer"
                className="w-12 lg:w-16 h-12 lg:h-16 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                title="Google Maps">
                <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#4285F4">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}