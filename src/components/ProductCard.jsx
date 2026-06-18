import { FiPlus } from 'react-icons/fi';

export default function ProductCard({ product, onOpenModal }) {
  const precio = product.precio_oferta || product.precio_base;
  const precioAnterior = product.precio_oferta ? product.precio_base : null;
  
  const discount = precioAnterior
    ? Math.round((1 - precio / precioAnterior) * 100)
    : 0;

  const isNew = product.created_at &&
  (Date.now() - new Date(product.created_at).getTime()) < 14 * 24 * 60 * 60 * 1000;
  const isSale = product.precio_oferta && product.precio_base > product.precio_oferta;

  const activeVariantes = product.variantes?.filter(v => v.activo !== false) || [];
  let thumbnail = null;

  if (activeVariantes.length > 0) {
    const firstVariant = activeVariantes[0];
    const images = firstVariant.imagenes?.filter(img => img.orden === 0) || [];
    if (images.length > 0) {
      thumbnail = images[0].url_thumbnail || images[0].url;
    } else {
      const allImages = firstVariant.imagenes || [];
      if (allImages.length > 0) {
        thumbnail = allImages[0].url_thumbnail || allImages[0].url;
      }
    }
  }

  return (
    <div
      className="bg-surface rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.3),0_10px_10px_-5px_rgba(0,0,0,0.1)] cursor-pointer group shadow-[0_8px_15px_-3px_rgba(0,0,0,0.15)]"
      onClick={() => onOpenModal(product)}
    >
      <div className="relative bg-surface2 aspect-square flex items-center justify-center overflow-hidden rounded-t-2xl">
        {isNew && (
          <span className="absolute top-3 left-3 bg-primary text-white font-sans font-bold text-xs px-2 py-1 rounded-full z-10">
            NEW
          </span>
        )}
        {isSale && !isNew && (
          <span className="absolute top-3 left-3 bg-red-500 text-white font-sans font-bold text-xs px-2 py-1 rounded-full z-10">
            SALE
          </span>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); onOpenModal(product); }}
          className="absolute bottom-3 right-3 w-10 h-10 bg-lime-400 hover:bg-lime-500 text-blue-700 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-10"
          title="Ver producto"
        >
          <FiPlus size={20} />
        </button>
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={`${product.marcas?.nombre || ''} ${product.modelo} — Zapatillas originales Piura`}
            loading="lazy"
            width={400}
            height={400}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <span className="text-6xl">🎧</span>
        )}
      </div>

      <div className="p-4">
        <div className="text-muted2 text-xs font-sans font-medium uppercase tracking-wide mb-1">
          {product.marcas?.nombre || 'BRAND'}
        </div>
        <div className="text-text font-sans font-semibold text-sm mb-1 line-clamp-2">
          {product.modelo}
        </div>
        <div className="text-muted2 text-xs font-mono mb-2">
          {product.codigo}
        </div>

        {product.generos?.nombre && (
          <div className="mb-2">
            <span className="inline-block bg-surface2 text-muted2 text-[10px] font-bold px-2 py-0.5 rounded-md border border-gray-200">
              {product.generos.nombre.toUpperCase()}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {precioAnterior && (
              <span className="text-sm text-muted2 line-through font-sans">
                S/.{precioAnterior}
              </span>
            )}
            <span className="text-primary font-sans font-bold text-xl">
              S/.{precio}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}