import { useState, useRef } from 'react';
import { FiX, FiMinus, FiPlus, FiShoppingCart, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ImageLightbox from './ImageLightbox';

export default function ProductModal({ product, onClose, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [showImageLightbox, setShowImageLightbox] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const precio = product?.precio_oferta || product?.precio_base;
  const precioAnterior = product?.precio_oferta ? product?.precio_base : null;

  const activeVariantes = product?.variantes?.filter(v => v.activo !== false) || [];
  
  const allImages = selectedVariant?.imagenes || 
    (activeVariantes[0]?.imagenes || []) ||
    [];

   const availableSizes = [];
   if (selectedVariant?.variantes_tallas) {
     for (const vt of selectedVariant.variantes_tallas) {
       if (vt.stock > 0) {
         availableSizes.push({
           valor: vt.tallas?.valor,
           stock: vt.stock
         });
       }
     }
   } else if (activeVariantes.length > 0) {
     for (const v of activeVariantes) {
       if (v.variantes_tallas) {
         for (const vt of v.variantes_tallas) {
           if (vt.stock > 0) {
             availableSizes.push({
               valor: vt.tallas?.valor,
               stock: vt.stock
             });
           }
         }
       }
     }
   }

   // Ordenar tallas de menor a mayor (incluyendo decimales)
   availableSizes.sort((a, b) => {
     const numA = parseFloat(a.valor);
     const numB = parseFloat(b.valor);
     if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
     return a.valor.localeCompare(b.valor);
   });

  const handlePrevImage = () => {
    setCurrentImageIndex(prev => prev === 0 ? allImages.length - 1 : prev - 1);
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prev => prev === allImages.length - 1 ? 0 : prev + 1);
  };

   const handleTouchStart = (e) => {
     touchStartX.current = e.targetTouches[0].clientX;
   };

   const handleTouchEnd = () => {
     const swipeThreshold = 50;
     const diff = touchStartX.current - touchEndX.current;
     
     if (Math.abs(diff) > swipeThreshold) {
       if (diff > 0) {
         handleNextImage();
       } else {
         handlePrevImage();
       }
     }
     touchStartX.current = 0;
     touchEndX.current = 0;
   };

  const handleAddToCart = (e) => {
    if (selectedSize) {
      onAddToCart(product, selectedSize, qty, e.currentTarget);
      onClose();
    }
  };

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <FiX size={20} />
        </button>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Images */}
             <div className="space-y-3">
               {allImages.length > 0 ? (
                 <div 
                   className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 cursor-pointer"
                   onTouchStart={handleTouchStart}
                   onTouchEnd={handleTouchEnd}
                   onClick={() => setShowImageLightbox(true)}
                 >
                   <img
                     src={allImages[currentImageIndex]?.url || allImages[currentImageIndex]?.url_thumbnail}
                     alt={product.modelo}
                     className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                   />
                   
                   {/* Navigation arrows */}
                   {allImages.length > 1 && (
                     <>
                       <button
                         onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                         className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full items-center justify-center hover:bg-white transition-colors shadow-md"
                       >
                         <FiChevronLeft size={18} />
                       </button>
                       <button
                         onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                         className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full items-center justify-center hover:bg-white transition-colors shadow-md"
                       >
                         <FiChevronRight size={18} />
                       </button>
                       <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-2 py-1 rounded-full pointer-events-none">
                         {currentImageIndex + 1} / {allImages.length}
                       </div>
                     </>
                   )}
                 </div>
               ) : (
                 <div className="aspect-square rounded-xl bg-gray-100 flex items-center justify-center">
                   <span className="text-6xl">🎧</span>
                 </div>
               )}
              
              {allImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {allImages.map((img, i) => (
                    <button
                       key={i}
                       onClick={() => {
                         setCurrentImageIndex(i);
                       }}
                      className={`w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border-2 transition-colors ${
                        currentImageIndex === i
                          ? 'border-primary'
                          : 'border-transparent hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={img.url_thumbnail || img.url}
                        alt={`${product.modelo} ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <div className="text-sm text-gray-500 font-medium uppercase tracking-wide mb-1">
                {product.marcas?.nombre || 'BRAND'}
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                {product.modelo}
              </h2>
              <div className="text-sm text-gray-500 font-mono mb-2">
                {product.codigo}
              </div>
              
              <div className="flex items-center gap-3 mb-4">
                {precioAnterior && (
                  <span className="text-gray-500 line-through">
                    S/.{precioAnterior}
                  </span>
                )}
                <span className="text-2xl font-bold text-primary">
                  S/.{precio}
                </span>
              </div>

              {/* Colors */}
              {activeVariantes.length > 1 && (
                <div className="mb-4">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Color:
                  </label>
                  <div className="flex gap-2">
                    {activeVariantes.map((v, i) => (
                       <button
                         key={i}
                         onClick={() => {
                           setSelectedVariant(v);
                           setCurrentImageIndex(0);
                         }}
                        className={`w-8 h-8 rounded-full border-2 ${
                          selectedVariant?.id === v.id || (!selectedVariant && i === 0)
                              ? 'border-primary'
                              : 'border-gray-300'
                        }`}
                        style={{ 
                          backgroundColor: v.colores?.hex || '#gray' 
                        }}
                        title={v.colores?.nombre}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Talla:
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableSizes.map((size, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedSize(size.valor)}
                      className={`px-4 py-2 rounded-lg border-2 font-medium transition-colors ${
                        selectedSize === size.valor
                          ? 'border-primary bg-blue-700 text-white'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      T{size.valor}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Cantidad:
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-gray-400"
                  >
                    <FiMinus size={18} />
                  </button>
                  <span className="text-xl font-bold w-8 text-center">{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-gray-400"
                  >
                    <FiPlus size={18} />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors ${
                  selectedSize
                    ? 'bg-lime-400 text-blue-700 hover:bg-lime-500'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <FiShoppingCart size={20} />
                {selectedSize ? 'Agregar para hablar con el vendedor' : 'Selecciona una talla'}
              </button>
            </div>
           </div>
         </div>
       </div>
       
       {/* Image Lightbox */}
       {showImageLightbox && (
         <ImageLightbox
           images={allImages}
           initialIndex={currentImageIndex}
           onClose={() => setShowImageLightbox(false)}
           productName={product.modelo}
         />
       )}
     </div>
   );
 }
