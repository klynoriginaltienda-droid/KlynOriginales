import { FiTruck, FiRefreshCw, FiHeadphones, FiShield } from 'react-icons/fi';

const features = [
  {
    icon: FiTruck,
    title: 'Free Delivery',
    description: 'Free shipping on all orders over S/.150',
  },
  {
    icon: FiRefreshCw,
    title: 'Easy Returns',
    description: '30-day hassle-free returns',
  },
  {
    icon: FiHeadphones,
    title: '24/7 Support',
    description: 'Round-the-clock customer assistance',
  },
  {
    icon: FiShield,
    title: 'Secure Payment',
    description: '100% secure payment processing',
  },
];

export default function FeaturesBanner() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-surface rounded-2xl p-8 lg:p-12">
          <h2 className="font-sans text-2xl lg:text-3xl font-bold text-text text-center mb-10">
            Experience Streamlined Audio Shopping
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <feature.icon size={28} className="text-primary" />
                </div>
                <h3 className="font-sans font-bold text-text mb-2">
                  {feature.title}
                </h3>
                <p className="font-sans text-sm text-muted2">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}