import { FiChevronDown } from 'react-icons/fi';
import ProductCard from './ProductCard';
import { useApp } from '../hooks/useApp';

export function FeaturedProducts({ products, onOpenModal }) {
  const { hasMore, loadMore, loadingMore, loading } = useApp();
  const displayProducts = products || [];

  return (
    <section id="products" className="py-4 px-4 sm:px-6 lg:px-8 w-full">
      <div className="max-w-7xl mx-auto">
        <div className="bg-surface rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl w-full">
          <div className="mb-6">
            <h2 className="font-sans text-2xl lg:text-3xl font-bold text-text">
              Productos
            </h2>
          </div>

          {loading && displayProducts.length === 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 animate-pulse">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-surface2 aspect-[3/4] rounded-2xl" />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
                {displayProducts.map((product, index) => (
                  <ProductCard
                    key={product.id || index}
                    product={product}
                    onOpenModal={onOpenModal}
                  />
                ))}
              </div>

              {displayProducts.length === 0 && !loading && (
                <div className="text-center py-12">
                  <p className="text-muted2 text-lg">No se encontraron productos</p>
                </div>
              )}

              {hasMore && displayProducts.length > 0 && (
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={loadMore}
                    disabled={loadingMore}
                    className="bg-primary text-white font-sans font-bold px-8 py-3 rounded-xl hover:bg-primary2 transition-all flex items-center gap-2 shadow-lg hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loadingMore ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Cargando...
                      </>
                    ) : (
                      <>
                        Ver más
                        <FiChevronDown size={20} />
                      </>
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}