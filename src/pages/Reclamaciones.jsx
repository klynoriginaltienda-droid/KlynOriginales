import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiBook, FiSend, FiUser, FiPhone, FiMail, FiAlertCircle, FiArrowLeft } from 'react-icons/fi';
import { reclamacionService } from '../services/reclamacionService';

export default function Reclamaciones() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombres: '',
    telefono: '',
    email: '',
    tipo_reclamo: 'reclamo',
    detalle: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.nombres.trim()) newErrors.nombres = 'El nombre es obligatorio';
    if (!form.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!form.detalle.trim()) newErrors.detalle = 'El detalle es obligatorio';
    else if (form.detalle.trim().length < 20) newErrors.detalle = 'Mínimo 20 caracteres';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await reclamacionService.enviarReclamacion(form);
      setSuccessMsg(true);
      setTimeout(() => {
        navigate('/');
      }, 2500);
    } catch (err) {
      alert('Error al enviar: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (successMsg) {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-sm w-full mx-4 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-blue-700 rounded-full flex items-center justify-center mb-6">
            <FiSend className="text-white text-2xl" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-3">¡Reclamación enviada!</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Gracias por tu aporte. Nos comprometemos a mejorar con su ayuda.
          </p>
          <div className="mt-6 w-10 h-10 border-4 border-blue-700 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-300 flex flex-col">
      <nav className="fixed top-0 inset-x-0 z-50 bg-lime-400/90 backdrop-blur-md border-b border-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <FiArrowLeft size={22} className="text-black" />
              <span className="font-sans font-bold text-2xl lg:text-2xl tracking-widest text-black">
                KLYN ORIGINALES
              </span>
            </button>
            <div className="w-10 h-10" />
          </div>
        </div>
      </nav>

      <div className="flex-grow pt-20 py-12 px-4">
        <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8 justify-center">
          <div className="w-12 h-12 bg-blue-700 rounded-2xl flex items-center justify-center shadow-lg">
            <FiBook className="text-white text-xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-blue-800">Libro de Reclamaciones</h1>
            <p className="text-blue-600 text-sm">Tu opinión nos ayuda a mejorar</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-8 md:p-10 space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">
              <FiUser className="inline mr-1" />Nombres completos *
            </label>
            <input
              type="text"
              name="nombres"
              value={form.nombres}
              onChange={handleChange}
              placeholder="Ej. Juan Pérez López"
              className={`w-full bg-gray-50 border ${errors.nombres ? 'border-red-400' : 'border-gray-200'} rounded-2xl px-5 py-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-sm font-medium`}
            />
            {errors.nombres && <p className="text-red-500 text-xs mt-1 ml-1 flex items-center gap-1"><FiAlertCircle size={12} />{errors.nombres}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">
                <FiPhone className="inline mr-1" />Teléfono (opcional)
              </label>
              <input
                type="tel"
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                placeholder="Ej. 951 234 567"
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-sm font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">
                <FiMail className="inline mr-1" />Correo electrónico *
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="correo@ejemplo.com"
                className={`w-full bg-gray-50 border ${errors.email ? 'border-red-400' : 'border-gray-200'} rounded-2xl px-5 py-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-sm font-medium`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1 ml-1 flex items-center gap-1"><FiAlertCircle size={12} />{errors.email}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">
              Tipo de comunicación *
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setForm(prev => ({ ...prev, tipo_reclamo: 'reclamo' }))}
                className={`py-4 rounded-2xl font-bold text-sm uppercase tracking-wider border-2 transition-all ${form.tipo_reclamo === 'reclamo' ? 'bg-blue-700 text-white border-blue-700 shadow-lg' : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-blue-400'}`}
              >
                Reclamo
              </button>
              <button
                type="button"
                onClick={() => setForm(prev => ({ ...prev, tipo_reclamo: 'queja' }))}
                className={`py-4 rounded-2xl font-bold text-sm uppercase tracking-wider border-2 transition-all ${form.tipo_reclamo === 'queja' ? 'bg-blue-700 text-white border-blue-700 shadow-lg' : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-blue-400'}`}
              >
                Queja
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">
              Detalle del problema *
            </label>
            <textarea
              name="detalle"
              value={form.detalle}
              onChange={handleChange}
              rows={5}
              placeholder="Describa con detalle su reclamo o queja..."
              className={`w-full bg-gray-50 border ${errors.detalle ? 'border-red-400' : 'border-gray-200'} rounded-2xl px-5 py-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-sm font-medium resize-none`}
            />
            {errors.detalle && <p className="text-red-500 text-xs mt-1 ml-1 flex items-center gap-1"><FiAlertCircle size={12} />{errors.detalle}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn btn-primary py-5 rounded-2xl font-bold uppercase tracking-widest shadow-lg shadow-blue-700/20 flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <FiSend className="text-xl" />
                Enviar Reclamación
              </>
            )}
          </button>
        </form>
      </div>
      </div>
    </div>
  );
}