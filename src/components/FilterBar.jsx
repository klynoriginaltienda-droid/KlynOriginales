import { FiX, FiSearch } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { useApp } from '../hooks/useApp';

export default function FilterBar() {
  const {
    genders,
    marcas,
    selectedGender,
    setSelectedGender,
    selectedMarca,
    setSelectedMarca,
    searchQuery,
    setSearchQuery,
    clearFilters,
  } = useApp();

  const [localQuery, setLocalQuery] = useState(searchQuery);

  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const t = setTimeout(() => setSearchQuery(localQuery), 250);
    return () => clearTimeout(t);
  }, [localQuery]);

  const hasFilters =
    selectedGender !== 'all' || selectedMarca !== 'all' || searchQuery !== '';

  const pillBase =
    'px-4 py-2 sm:px-4 sm:py-2 rounded-full text-[14px] sm:text-[13px] font-bold transition-all duration-150 cursor-pointer select-none whitespace-nowrap';
  const pillActive = 'bg-blue-700 text-white shadow-md scale-[1.02]';
  const pillInactive = 'bg-white text-black hover:bg-white/90 border border-black/20 shadow-sm';

  return (
    <div className="w-full bg-lime-400/95 backdrop-blur-md border-b border-black/5 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-1.5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
        
        {/* Filters Scrollable - Now First to push search to the right */}
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar flex-grow order-2 sm:order-1">
          <div className="flex items-center gap-1 border-r border-black/10 pr-2">
            <button
              onClick={() => setSelectedGender('all')}
              className={`${pillBase} ${selectedGender === 'all' ? pillActive : pillInactive}`}
            >
              Todos
            </button>
            {genders.map((g) => (
              <button
                key={g.id}
                onClick={() => setSelectedGender(g.id.toString())}
                className={`${pillBase} ${
                  selectedGender === g.id.toString() ? pillActive : pillInactive
                }`}
              >
                {g.nombre}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setSelectedMarca('all')}
              className={`${pillBase} ${selectedMarca === 'all' ? pillActive : pillInactive}`}
            >
              Marcas
            </button>
            {marcas.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedMarca(m.id.toString())}
                className={`${pillBase} ${
                  selectedMarca === m.id.toString() ? pillActive : pillInactive
                }`}
              >
                {m.nombre}
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Search & Clear Button */}
        <div className="flex items-center gap-2 order-1 sm:order-2 self-end sm:self-auto">
          {/* Search */}
          <div className="relative group w-full sm:w-40 md:w-56 flex-shrink-0 mb-1 sm:mb-0">
            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-black/50 group-focus-within:text-black transition-colors"
              size={14}
            />
            <input
              type="text"
              placeholder="Buscar..."
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              onBlur={() => {
                if (localQuery.trim() === '') setSearchQuery('');
              }}
              className="w-full pl-9 pr-10 py-2 sm:py-1 rounded-full border border-black/10
                         focus:outline-none focus:border-black/50 transition-all duration-200
                         text-sm sm:text-[11px] text-black placeholder:text-black/50 bg-white"
            />
            {localQuery && (
              <button
                onClick={() => { setLocalQuery(''); setSearchQuery(''); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-black/50 hover:text-black
                           w-7 h-7 sm:w-5 sm:h-5 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
                aria-label="Limpiar búsqueda"
              >
                <FiX size={12} />
              </button>
            )}
          </div>

           {/* Clear Button - Hidden on mobile, shown on sm and up */}
           {hasFilters && (
             <button
               onClick={clearFilters}
               className="hidden sm:flex items-center gap-2 text-sm font-black text-red-600 hover:text-red-800
                          bg-white px-3 py-1.5 rounded-full transition-all duration-150 border border-black/5 flex-shrink-0"
             >
               <FiX size={14} />
               <span className="inline">LIMPIAR</span>
             </button>
           )}
        </div>
      </div>
    </div>
  );
}
