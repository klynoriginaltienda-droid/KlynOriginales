import { supabase } from '../lib/supabase';

function sanitizarTexto(texto) {
  if (!texto) return texto;
  return texto
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}

export const reclamacionService = {
  async enviarReclamacion(data) {
    const { nombres, telefono, email, tipo_reclamo, detalle } = data;

    if (!['reclamo', 'queja'].includes(tipo_reclamo)) {
      throw new Error('Tipo de comunicacion invalido');
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      throw new Error('Email invalido');
    }

    if (detalle.trim().length < 10) {
      throw new Error('El detalle debe tener al menos 10 caracteres');
    }

    const { error } = await supabase
      .from('reclamaciones')
      .insert({
        nombres: sanitizarTexto(nombres),
        telefono: telefono ? sanitizarTexto(telefono) : null,
        email: email.trim().toLowerCase(),
        tipo_reclamo,
        detalle: sanitizarTexto(detalle),
        estado: 'pendiente',
      });

    if (error) throw new Error(error.message);
    return { success: true };
  },
};