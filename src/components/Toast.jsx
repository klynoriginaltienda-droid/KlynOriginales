import { useEffect, useState } from 'react';
import { FiCheck } from 'react-icons/fi';

export default function Toast({ message, onClose, targetRef }) {
  const [animating, setAnimating] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimating(true);
    }, 2500);

    const hideTimer = setTimeout(() => {
      setHidden(true);
    }, 3200);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (hidden) return null;

  return (
    <div className="fixed top-24 right-4 z-[100] pointer-events-none">
      <div
        className={`
          flex items-center gap-2 bg-blue-900 border border-green-200 text-green-500 
          px-4 py-3 rounded-xl shadow-lg font-medium text-sm
          transition-all duration-700 ease-in-out
          ${animating ? 'opacity-0 scale-50 translate-x-[100px]' : 'opacity-100 scale-100 translate-x-0'}
        `}
      >
        <FiCheck className="text-green-500" size={18} />
        {message}
      </div>
    </div>
  );
}
