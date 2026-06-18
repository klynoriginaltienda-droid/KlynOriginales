import { FiX, FiMinus, FiPlus, FiTrash2, FiShoppingCart } from 'react-icons/fi';
import { useApp } from '../hooks/useApp';
import { FaWhatsapp } from 'react-icons/fa';
import { getWhatsAppLink } from '../lib/config';

export default function CartDrawer({ isOpen, onClose }) {
  const { cart, cartTotal, cartCount, updateQuantity, removeFromCart } = useApp();

  const handleWhatsApp = () => {
    if (cart.length === 0) return;
    
    const separator = '━━━━━━━━━━━━━━━';
    
    let message = `🛒 *NUEVO PEDIDO - KLYN ORIGINAL*\n\n${separator}\n\n`;
    
    cart.forEach((item, index) => {
      const marca = item.product.marcas?.nombre || '';
      const modelo = item.product.modelo || '';
      const codigo = item.product.codigo || 'N/A';
      const precio = item.product.precio_oferta || item.product.precio_base;
      const precioAnterior = item.product.precio_base > precio ? item.product.precio_base : null;
      
      message += `📦 *Producto ${index + 1}*\n`;
      message += `   🏷️ Marca: ${marca}\n`;
      message += `   📋 Modelo: ${modelo}\n`;
      message += `   🔢 Código: ${codigo}\n`;
      message += `   📏 Talla: T${item.size}\n`;
      message += `   ❌ Cantidad: ${item.qty}\n`;
      message += `   💰 Precio actual: S/. ${precio.toFixed(2)}\n`;
      if (precioAnterior) {
        message += `   ⬇️ Precio anterior: S/. ${precioAnterior.toFixed(2)}\n`;
      }
      message += `   ✅ Subtotal: S/. ${(precio * item.qty).toFixed(2)}\n\n`;
      message += `${separator}\n\n`;
    });
    
    message += `💵 *TOTAL A PAGAR: S/. ${cartTotal.toFixed(2)}*\n\n`;    
    window.open(getWhatsAppLink(message), '_blank');
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <FiShoppingCart />
            Carrito ({cartCount})
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <FiShoppingCart size={48} className="mx-auto mb-4 opacity-50" />
              <p>Tu carrito está vacío</p>
            </div>
          ) : (
            cart.map(item => {
              const precio = item.product.precio_oferta || item.product.precio_base;
              const thumbnail = item.product.variantes?.[0]?.imagenes?.[0]?.url_thumbnail || 
                            item.product.variantes?.[0]?.imagenes?.[0]?.url;
              
              return (
                <div key={item.key} className="flex gap-3 bg-gray-50 rounded-xl p-3">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                    {thumbnail ? (
                      <img
                        src={thumbnail}
                        alt={item.product.modelo}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-2xl">🎧</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-medium text-sm line-clamp-2">
                      {item.product.modelo}
                    </h3>
                    <p className="text-gray-500 text-sm">Talla: T{item.size}</p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.key, -1)}
                          className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-200"
                        >
                          <FiMinus size={14} />
                        </button>
                        <span className="text-sm font-medium w-6 text-center">{item.qty}</span>
                        <button
                          onClick={() => updateQuantity(item.key, 1)}
                          className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-200"
                        >
                          <FiPlus size={14} />
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="font-bold">S/.{precio * item.qty}</span>
                        <button
                          onClick={() => removeFromCart(item.key)}
                          className="w-7 h-7 rounded-full flex items-center justify-center text-red-500 hover:bg-red-50"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-4 border-t space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-medium">Total</span>
              <span className="text-xl font-bold">S/.{cartTotal}</span>
            </div>

            <button onClick={onClose} className="w-full py-4 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-blue-600 transition-colors hover:text-white flex items-center justify-center gap-2">
              Continuar comprando
            </button>

            <button
              onClick={handleWhatsApp}
              className="w-full py-4 bg-black text-white font-bold rounded-xl hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
            >
              <FaWhatsapp size={20} />
              Hablar con el vendedor
            </button>

          </div>
        )}
      </div>
    </>
  );
}
