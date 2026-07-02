import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const policies = [
  {
    icon: '1',
    title: 'POLÍTICA DE KLYN ORIGINALES',
    points: [
      'La tienda no realiza devolución de dinero para PARES O PRODUCTOS YA ENTREGADOS que fueron comprados en tienda física y/o PEDIDO; pero sí aceptamos cambios.',
      'El cliente tiene la opción de cambiar su producto en un plazo máximo de 7 días, siempre y cuando presente su comprobante de compra y el producto no muestre signos de uso o desvalorización. (No aplica para productos pagados en partes).',
      'Si un PEDIDO presenta demora ajena a nuestra responsabilidad directa (retrasos en la agencia de transporte, desastres o eventos naturales, huelgas, controles de carretera o situaciones propias de la ruta), la tienda no anulará la venta para devolver el dinero.',
      'El tiempo de entrega estimado a Nivel Nacional es de 5 días hábiles en promedio.',
      'Si un producto a pedido presentase demora, el cliente puede decidir: esperar según la información que brinde la tienda, cambiar de modelo aplicando a un descuento especial, o el reembolso del dinero (procesado en un lapso de 5 días hábiles desde su solicitud por procedimiento del almacén principal).',
      'Somos conscientes que todos esperamos nuestros productos con ilusión y que su tiempo es valioso. Si no se concretó la entrega de un pedido, usted tendrá un descuento especial en sus próximas 3 compras.',
      'En los cambios de productos para provincia, el cliente es responsable de los gastos de envío y retorno. Si es error de la tienda, la tienda asume los costos de envío.',
      'No hay devolución, cambio ni reembolso para productos vendidos en ofertas, liquidaciones o pares únicos de exhibición.',
      'La tienda tiene 2 modos de venta: pedidos y separaciones. Los pedidos se pagan completo; la separación se separa con 150 soles y el resto se va pagando en partes (leer políticas de separación).',
    ],
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
                <div className="min-w-0">
                  <h3 className="font-bold text-gray-900 mb-3">{policy.title}</h3>
                  <ul className="space-y-2">
                    {policy.points.map((point, i) => (
                      <li
                        key={i}
                        className="text-gray-600 text-sm leading-relaxed flex gap-2"
                      >
                        <span className="text-lime-500 flex-shrink-0 mt-1">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
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
