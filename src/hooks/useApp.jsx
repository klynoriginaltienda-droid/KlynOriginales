import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const ITEMS_PER_PAGE = 30;

  const [genders, setGenders] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [tallas, setTallas] = useState([]);

  // Filtros sincronizados con la URL
  const searchQuery = searchParams.get('q') || '';
  const selectedGender = searchParams.get('genero') || 'all';
  const selectedMarca = searchParams.get('marca') || 'all';
  const selectedCategoria = searchParams.get('categoria') || 'all';

  const updateFilters = (newParams, replace = false) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      Object.entries(newParams).forEach(([key, value]) => {
        if (value === 'all' || value === '' || value === null) {
          next.delete(key);
        } else {
          next.set(key, value);
        }
      });
      return next;
    }, { replace });
  };

  const setSearchQuery = (q) => updateFilters({ q }, true); // replace: true para el buscador
  const setSelectedGender = (genero) => updateFilters({ genero });
  const setSelectedMarca = (marca) => updateFilters({ marca });
  const setSelectedCategoria = (categoria) => updateFilters({ categoria });

  const clearFilters = () => {
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('klyn_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('klyn_cart', JSON.stringify(cart));
    } catch {
      console.warn('No se pudo persistir el carrito');
    }
  }, [cart]);

  useEffect(() => {
    loadMetadata();
  }, []);

  useEffect(() => {
    fetchProducts(0, true);
  }, [searchQuery, selectedGender, selectedMarca, selectedCategoria]);

  async function loadMetadata() {
    try {
      const [gendersRes, marcaRes, categoriasRes, tallasRes] = await Promise.all([
        supabase.from('generos').select('*').order('nombre'),
        supabase.from('marcas').select('*').order('nombre'),
        supabase.from('categorias').select('*').order('nombre'),
        supabase.from('tallas').select('*').order('valor')
      ]);

      setGenders(gendersRes.data || []);
      
      const marcaOrder = ['Nike', 'Jordan', 'Adidas', 'Reebok', 'New Balance', 'Puma'];
      const reorderedMarcas = [...(marcaRes.data || [])].sort((a, b) => {
        const aIndex = marcaOrder.indexOf(a.nombre);
        const bIndex = marcaOrder.indexOf(b.nombre);
        return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
      });
      setMarcas(reorderedMarcas);
      
      const categoriaOrder = ['Zapatillas', 'Ropa y accesorios', 'Sandalias'];
      const reorderedCategorias = [...(categoriasRes.data || [])].sort((a, b) => {
        const aIndex = categoriaOrder.indexOf(a.nombre);
        const bIndex = categoriaOrder.indexOf(b.nombre);
        return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
      });
      setCategorias(reorderedCategorias);
      setTallas(tallasRes.data || []);
    } catch (err) {
      console.error('Error loading metadata:', err);
    }
  }

  async function fetchProducts(pageNumber, reset = false) {
    if (reset) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }
    
    const from = pageNumber * ITEMS_PER_PAGE;
    const to = from + ITEMS_PER_PAGE - 1;

    try {
      let query = supabase
        .from('productos')
        .select(`
          *,
          marcas(nombre, slug),
          generos(nombre),
          categorias(nombre, slug),
          variantes(
            *,
            colores(nombre, hex),
            imagenes(*),
            variantes_tallas(*, tallas(valor))
          )
        `)
        .eq('estado', 'activo')
        .is('deleted_at', null)
        .order('created_at', { ascending: false })
        .range(from, to);

      if (searchQuery) {
        query = query.or(`modelo.ilike.%${searchQuery}%,codigo.ilike.%${searchQuery}%`);
      }

      if (selectedGender !== 'all') {
        const genderId = parseInt(selectedGender);
        const gender = genders.find(g => g.id === genderId);
        if (gender?.nombre === 'Hombre' || gender?.nombre === 'Mujer') {
          const unisex = genders.find(g => g.nombre === 'Unisex');
          if (unisex) {
            query = query.in('id_genero', [genderId, unisex.id]);
          } else {
            query = query.eq('id_genero', genderId);
          }
        } else {
          query = query.eq('id_genero', genderId);
        }
      }

      if (selectedMarca !== 'all') {
        query = query.eq('id_marca', parseInt(selectedMarca));
      }

      if (selectedCategoria !== 'all') {
        query = query.eq('id_categoria', parseInt(selectedCategoria));
      }

      const { data, error } = await query;

      if (error) throw error;

      if (reset) {
        setProducts(data || []);
      } else {
        setProducts(prev => [...prev, ...(data || [])]);
      }

      setHasMore(data.length === ITEMS_PER_PAGE);
      setPage(pageNumber);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }

  async function loadMore() {
    if (loadingMore || !hasMore) return;
    await fetchProducts(page + 1);
  }

  const filteredProducts = useMemo(() => {
    return products.map(p => {
      const activeVariantes = p.variantes?.filter(v => v.activo !== false) || [];
      const availableSizes = [];
      
      for (const variante of activeVariantes) {
        if (variante.variantes_tallas) {
          for (const vt of variante.variantes_tallas) {
            if (vt.stock > 0) {
              const tallaValor = vt.tallas?.valor || '';
              if (!availableSizes.includes(tallaValor)) {
                availableSizes.push(tallaValor);
              }
            }
          }
        }
      }
      
      availableSizes.sort((a, b) => {
        const numA = parseFloat(a);
        const numB = parseFloat(b);
        if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
        return a.localeCompare(b);
      });

      return { ...p, availableSizes };
    });
  }, [products]);

  const cartTotal = cart.reduce((sum, item) => {
    const precio = item.product.precio_oferta || item.product.precio_base;
    return sum + (precio * item.qty);
  }, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  function addToCart(product, size, qty = 1) {
    const key = `${product.id}-${size}`;
    setCart(prev => {
      const existing = prev.find(item => item.key === key);
      if (existing) {
        return prev.map(item => 
          item.key === key ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [...prev, { key, product, size, qty }];
    });
  }

  function updateQuantity(key, delta) {
    setCart(prev => prev.map(item => {
      if (item.key === key) {
        return { ...item, qty: Math.max(0, item.qty + delta) };
      }
      return item;
    }).filter(item => item.qty > 0));
  }

  function removeFromCart(key) {
    setCart(prev => prev.filter(item => item.key !== key));
  }

  return (
    <AppContext.Provider value={{
      products,
      genders,
      marcas,
      categorias,
      tallas,
      loading,
      loadingMore,
      hasMore,
      loadMore,
      filteredProducts,
      searchQuery,
      setSearchQuery,
      selectedGender,
      setSelectedGender,
      selectedMarca,
      setSelectedMarca,
      selectedCategoria,
      setSelectedCategoria,
      clearFilters,
      cart,
      cartTotal,
      cartCount,
      addToCart,
      updateQuantity,
      removeFromCart
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}