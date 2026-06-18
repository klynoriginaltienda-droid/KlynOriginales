export const KLYN_CONFIG = {
  whatsapp: '51929889877',
  instagram: 'klynoriginales',
  tiktok: 'klynoriginales2.0',
  maps: 'https://maps.app.goo.gl/ew6BUxX2zz5S8o3M7',
  direccion: 'Av. Buenos Aires, Piura',
};

export const getWhatsAppLink = (mensaje = '') =>
  `https://wa.me/${KLYN_CONFIG.whatsapp}${mensaje ? `?text=${encodeURIComponent(mensaje)}` : ''}`;
