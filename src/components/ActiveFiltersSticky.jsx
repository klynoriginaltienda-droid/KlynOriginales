import { FiX } from 'react-icons/fi';
import { useApp } from '../hooks/useApp';

export default function ActiveFiltersSticky() {
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

  const hasFilters =
    selectedGender !== 'all' || selectedMarca !== 'all' || searchQuery !== '';

  const activeChips = [];
  if (selectedGender !== 'all') {
    const g = genders.find(x => x.id.toString() === selectedGender);
    if (g) activeChips.push({ label: g.nombre, onRemove: () => setSelectedGender('all') });
  }
  if (selectedMarca !== 'all') {
    const m = marcas.find(x => x.id.toString() === selectedMarca);
    if (m) activeChips.push({ label: m.nombre, onRemove: () => setSelectedMarca('all') });
  }
  if (searchQuery) {
    activeChips.push({ label: `"${searchQuery}"`, onRemove: () => setSearchQuery('') });
  }

  return (
    <div className={`px-4 sm:px-6 lg:px-8 py-3 bg-slate-300/95 backdrop-blur-md transition-all duration-300 border-b border-white/20 shadow-sm ${hasFilters ? 'translate-y-0 opacity-100 h-auto visible' : '-translate-y-full opacity-0 h-0 overflow-hidden invisible'}`}>
      <div className="max-w-7xl mx-auto flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
        <span className="text-[10px] font-black text-blue-800 uppercase tracking-tighter flex-shrink-0">
          Filtros Activos:
        </span>
        {activeChips.map((chip, i) => (
          <button
            key={i}
            onClick={chip.onRemove}
            className="flex items-center gap-1.5 bg-blue-700 text-white px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap shadow-sm hover:bg-blue-800 transition-colors"
          >
            {chip.label}
            <FiX size={12} />
          </button>
        ))}
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="ml-auto flex items-center gap-2 text-sm font-bold text-red-600 hover:text-red-800 bg-white px-3 py-1 rounded-full shadow-sm"
          >
            <FiX size={14} />
            Limpiar todo
          </button>
        )} 
      </div>
    </div>
  );
}