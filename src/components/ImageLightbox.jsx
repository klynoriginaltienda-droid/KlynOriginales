import { useState, useRef, useEffect } from 'react';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function ImageLightbox({ images, initialIndex = 0, onClose, productName }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const imageRef = useRef(null);

  const handlePrevImage = () => {
    setCurrentImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1);
    resetZoom();
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1);
    resetZoom();
  };

  const resetZoom = () => {
    setIsZoomed(false);
    setDragOffset({ x: 0, y: 0 });
    setZoomOrigin({ x: 50, y: 50 });
  };

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    if (!isZoomed) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setZoomOrigin({ x, y });
      setIsZoomed(true);
    } else {
      resetZoom();
    }
  };

  const handleMouseDown = (e) => {
    if (!isZoomed) return;
    e.preventDefault();
    isDragging.current = true;
    dragStart.current = { x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y };
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current || !isZoomed) return;
    e.preventDefault();
    setDragOffset({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y
    });
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleTouchStart = (e) => {
    if (isZoomed) return;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (isZoomed) return;
    touchEndX.current = e.changedTouches[0].clientX;
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        handleNextImage();
      } else {
        handlePrevImage();
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') handlePrevImage();
    if (e.key === 'ArrowRight') handleNextImage();
    if (e.key === 'Escape') onClose();
    if (e.key === 'z' || e.key === 'Z') {
      if (isZoomed) {
        resetZoom();
      } else {
        setIsZoomed(true);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  });

  if (!images || images.length === 0) return null;

  const currentImage = images[currentImageIndex];

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center transition-colors z-30"
      >
        <FiX size={24} className="text-white" />
      </button>

      {/* Zoom indicator */}
      {isZoomed && (
        <div className="absolute top-4 left-4 text-white text-xs bg-white/20 px-3 py-1 rounded-full z-30 whitespace-nowrap">
          Zoom 2.5x · Doble clic para salir
        </div>
      )}

      {/* Main Image Container */}
      <div className="flex-1 flex items-center justify-center max-w-5xl w-full mb-4 overflow-hidden">
        {!isZoomed && (
          <button
            onClick={handlePrevImage}
            className="absolute left-4 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center transition-colors z-20"
          >
            <FiChevronLeft size={24} className="text-white" />
          </button>
        )}

        <div
          ref={imageRef}
          onDoubleClick={handleDoubleClick}
          onMouseDown={handleMouseDown}
          className={`relative ${isZoomed ? 'cursor-grab active:cursor-grabbing overflow-hidden' : 'cursor-zoom-in'}`}
          style={{
            width: isZoomed ? '100%' : 'auto',
            height: isZoomed ? '100%' : 'auto',
            maxWidth: isZoomed ? '100%' : '90vw',
            maxHeight: isZoomed ? '100%' : '70vh'
          }}
        >
          <img
            src={currentImage.url || currentImage.url_thumbnail}
            alt={`${productName} ${currentImageIndex + 1}`}
            draggable="false"
            className="max-w-full max-h-[70vh] object-contain rounded-lg select-none"
            style={{
              transform: isZoomed ? `scale(2.5) translate(${dragOffset.x / 2.5}px, ${dragOffset.y / 2.5}px)` : 'scale(1)',
              transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
              transition: isDragging.current ? 'none' : 'transform 0.2s ease-out',
              userSelect: 'none',
              pointerEvents: 'none'
            }}
          />
        </div>

        {!isZoomed && (
          <button
            onClick={handleNextImage}
            className="absolute right-4 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center transition-colors z-20"
          >
            <FiChevronRight size={24} className="text-white" />
          </button>
        )}
      </div>

      {/* Image Counter */}
      <div className="text-white text-sm mb-4">
        {currentImageIndex + 1} / {images.length}
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto pb-2 max-w-5xl w-full">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => { setCurrentImageIndex(i); resetZoom(); }}
            className={`w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
              currentImageIndex === i
                ? 'border-lime-400'
                : 'border-white/30 hover:border-white/60'
            }`}
          >
            <img
              src={img.url_thumbnail || img.url}
              alt={`Thumbnail ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
