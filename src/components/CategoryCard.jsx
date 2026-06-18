import { FiArrowRight } from 'react-icons/fi';

export default function CategoryCard({ category }) {
  const { name, description, image } = category;

  return (
    <div className="bg-surface rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer group h-full flex flex-col">
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <h3 className="font-sans font-bold text-lg text-text mb-2">
            {name}
          </h3>
          <p className="font-sans text-sm text-muted2 mb-3">
            {description}
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-1 text-primary font-sans font-medium text-sm hover:text-primary2 transition-colors"
          >
            View Products
            <FiArrowRight size={16} />
          </a>
        </div>
      </div>
      <div className="p-4 flex justify-end">
        <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-xl overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      </div>
    </div>
  );
}