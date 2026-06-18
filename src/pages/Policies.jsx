import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const policies = [
  {
    icon: '1',
    title: 'Cambio de producto',
    text: 'El cliente tiene la opción de cambiar su producto en un plazo máximo de 7 días, siempre y cuando presente su comprobante de compra, y el producto no muestre signos de uso o desvalorización.',
  },
  {
    icon: '2',
    title: 'Sin devolución de dinero',
    text: 'La tienda no hace devolución de dinero para PARES YA ENTREGADOS que fueron comprados en tienda presencial o vía online, pero sí aceptamos cambios.',
  },
  {
    icon: '3',
    title: 'Pedidos enviados',
    text: 'Si un pedido YA FUE ENVIADO y cuenta con guía y clave de recojo, y se presenta alguna demora por parte de la agencia de transporte debido a eventos naturales o situaciones propias de la ruta, la tienda no está obligada a anular la venta ni devolver el dinero.',
  },
  {
    icon: '4',
    title: 'Tiempo de entrega',
    text: 'El tiempo de entrega estimado a Nivel Nacional es de 5 días hábiles en promedio.',
  },
  {
    icon: '5',
    title: 'Pedido excedido',
    text: 'Si un pedido aún no ha sido entregado y ha superado los 5 días hábiles de espera, el cliente puede decidir esperar, cambiar de modelo o pedir su reembolso, el cual será procesado en un plazo de 5 días hábiles desde el día que se solicita.',
  },
  {
    icon: '6',
    title: 'Cambios a provincia',
    text: 'En los cambios de productos para provincia, el cliente es responsable de los gastos de envío y retorno.',
  },
  {
    icon: '7',
    title: 'Ofertas y liquidaciones',
    text: 'No hay devolución, cambio ni reembolso para pares vendidos en ofertas y liquidaciones.',
  },
];

export default function PoliciesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-300 via-gray-200 to-gray-300">
      <Navbar />

      <main className="flex-grow pt-24 px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Link
              to="/"
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-lime-400 transition-colors"
            >
              <FiArrowLeft size={20} className="text-gray-700" />
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">
              Políticas de la Tienda
            </h1>
          </div>

          <div className="space-y-4">
            {policies.map((policy) => (
              <div
                key={policy.icon}
                className="bg-white rounded-xl p-5 shadow-lg border-l-4 border-lime-400 flex gap-4"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-lime-400 rounded-full flex items-center justify-center font-bold text-blue-700 text-sm">
                  {policy.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{policy.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{policy.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-lime-400 text-blue-700 font-semibold rounded-full hover:bg-lime-500 transition-colors"
            >
              <FiArrowLeft size={20} />
              Volver a la tienda
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}