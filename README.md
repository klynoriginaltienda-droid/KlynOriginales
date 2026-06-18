# KLYN Original — Catálogo Web

Catálogo online de la tienda **KLYN Original** (Lima, Perú), especializada en zapatillas y calzado urbano. Permite a los clientes explorar el catálogo, filtrar productos, ver detalles con galería de imágenes, agregarlos al carrito y enviar el pedido directamente por WhatsApp al vendedor.

## Stack Tecnológico

- **React 19** — UI declarativa con componentes funcionales y hooks
- **Vite 8** — Bundler y dev server con HMR
- **React Router 7** — Enrutamiento SPA (`/`, `/about`, `/about/politicas`, `/reclamaciones`)
- **Tailwind CSS 3** — Estilos utility-first
- **Supabase** — Backend: productos, marcas, reclamaciones (libro de reclamaciones)
- **Cloudinary** — Almacenamiento y optimización de imágenes
- **react-icons** — Iconografía (Feather Icons)
- **Sharp** — Script de optimización de imágenes a WebP

## Funcionalidades

- **Catálogo con scroll infinito / paginación** desde Supabase
- **Filtros** por marca, género, categoría, precio, color, tallas y búsqueda textual
- **Vista modal de producto** con galería, selector de tallas y zoom (lightbox)
- **Carrito de compras** con drawer lateral y contador animado
- **Pedido por WhatsApp** — genera un mensaje formateado con productos, tallas, cantidades y total
- **Hero section** con carrusel de imágenes y CTA
- **Libro de Reclamaciones** integrado con Supabase (cumplimiento INDECOPI)
- **Sección "Sobre nosotros"** con recomendaciones y carrusel
- **Políticas de la tienda** (envíos, devoluciones, términos)
- **SEO**: meta tags, Open Graph, `robots.txt`, `sitemap.xml`
- **PWA-ready**: assets en `public/` con versiones `.webp` optimizadas
- **Responsive**: mobile-first con breakpoints `lg:` para desktop
- **Botón "Volver arriba"** y scroll suave
- **Toast de confirmación** al agregar al carrito
- **Animación de "floating trigger"** al añadir producto (vuela hacia el carrito)

## Estructura del Proyecto

```
catalogo/
├── public/                  # Assets estáticos (imágenes .webp/.jpg, sitemap, robots)
├── scripts/
│   └── optimize-images.js   # Convierte imágenes a WebP con Sharp
├── src/
│   ├── components/          # Navbar, Footer, ProductCard, ProductModal, CartDrawer, etc.
│   ├── pages/               # HomePage, About, Policies, Reclamaciones, FloatingElements
│   ├── hooks/               # useApp (estado global del carrito y filtros)
│   ├── lib/                 # supabase.js, whatsapp.js, config.js, floatingTrigger.js
│   ├── services/            # reclamacionService.js
│   ├── App.jsx              # Rutas principales
│   ├── main.jsx             # Entry point
│   └── index.css            # Estilos globales + Tailwind
├── .env                     # Variables de entorno (NO se sube al repo)
├── .gitignore
├── vercel.json              # Config de deploy en Vercel
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## Variables de Entorno

Crea un archivo `.env` en la raíz con:

```env
VITE_SUPABASE_URL=https://<tu-proyecto>.supabase.co
VITE_SUPABASE_ANON_KEY=<tu-anon-key>

VITE_CLOUDINARY_CLOUD_NAME=<tu-cloud-name>
VITE_CLOUDINARY_API_KEY=<tu-api-key>
VITE_CLOUDINARY_API_SECRET=<tu-api-secret>
```

## Instalación y Desarrollo

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo (http://localhost:5173)
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview

# Optimizar imágenes a WebP
npm run optimize-images

# Linter
npm run lint
```

## Modelo de Datos (Supabase)

- **`productos`** — id, modelo, codigo, descripcion, precio_base, precio_oferta, imagenes[], marca_id, categoria, genero
- **`marcas`** — id, nombre, logo
- **`reclamaciones`** — id, nombre, dni, email, telefono, direccion, tipo, detalle, pedido (cumplimiento Ley N° 29571)

## Despliegue

Configurado para **Vercel** (`vercel.json`). Cada push a `main` despliega automáticamente.

```bash
# Build output: dist/
npm run build
```

## Licencia

Proyecto privado — © KLYN Original. Todos los derechos reservados.
