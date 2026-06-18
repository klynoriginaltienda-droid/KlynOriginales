import { KLYN_CONFIG, getWhatsAppLink } from './config';

export function generateWhatsAppLink(cart, total) {
  if (!cart || !cart.length) return '';

  const items = cart.map((item, index) => {
    const product = item.product;
    if (!product) return '';
    
    const marca = product.marcas?.nombre || 'Marca';
    const modelo = product.modelo || 'Sin modelo';
    const codigo = product.codigo ? `#${product.codigo}` : '';
    const precio = product.precio_oferta || product.precio_base || 0;
    const size = item.size || 'N/A';
    const qty = item.qty || 1;
    
    return `${index + 1}. *${marca}* ${modelo} ${codigo}%0A   Talla: ${size} | Cant: ${qty} | S/. ${precio * qty}`;
  }).filter(Boolean).join('%0A%0A');

  const message = `*NUEVO PEDIDO - KLYN ORIGINAL*%0A%0A${items}%0A%0A━━━━━━━━━━━━━━━━━━%0A*TOTAL: S/. ${total?.toFixed(2) || '0.00'}*%0A━━━━━━━━━━━━━━━━━━%0A%0A`;

  return getWhatsAppLink(message);
}