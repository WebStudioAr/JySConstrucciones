# Assets — JyS Jonathan Construcción

Colocá las imágenes en esta carpeta con **exactamente estos nombres**.
Mientras un archivo no exista, la web muestra un bloque gris con el nombre y la
resolución esperada; al subir la imagen, el bloque queda cubierto automáticamente.

Las filas marcadas con ✅ ya están puestas.

| Archivo | Resolución (mín.) | Formato | Dónde se usa |
|---|---|---|---|
| `logo-jys.svg` | vectorial | SVG | (opcional) reemplazo del logo tipográfico del header |
| ✅ `hero-construccion.jpg` | 1642 × 958 px | JPG | Hero — fondo desktop. Obra residencial al atardecer |
| ✅ `hero-construccion-mobile.jpg` | 718 × 958 px | JPG | Hero — fondo mobile (recorte vertical de la de desktop) |
| `obra-estructura.webp` | 1200 × 1600 px | WebP | Presentación — foto vertical de estructura en obra |
| `servicios-construccion.webp` | 1600 × 2000 px | WebP | Servicios 01 — construcción desde cero |
| `servicios-remodelacion.webp` | 1600 × 2000 px | WebP | Servicios 02 — remodelación integral |
| `servicios-revestimientos.webp` | 1600 × 2000 px | WebP | Servicios 03 — colocación de revestimientos |
| `servicios-terminaciones.webp` | 1600 × 2000 px | WebP | Servicios 04 — pintura / impermeabilización |
| `servicios-instalaciones.webp` | 1600 × 2000 px | WebP | Servicios 05 — electricidad / plomería |
| ✅ `textura-ceramica.jpg` | 640 × 640 px | JPG | Revestimientos — miniatura del selector (**tileable**) |
| ✅ `textura-porcelanato.jpg` | 640 × 640 px | JPG | Revestimientos — miniatura del selector (**tileable**) |
| ✅ `textura-baldosa.jpg` | 640 × 640 px | JPG | Revestimientos — miniatura del selector (**tileable**) |
| ✅ `textura-laja.jpg` | 640 × 640 px | JPG | Revestimientos — miniatura del selector (**tileable**) |
| ✅ `textura-adoquin.jpg` | 640 × 640 px | JPG | Revestimientos — miniatura del selector (**tileable**) |
| ✅ `fondo-ceramica.jpg` | 1536 × 1024 px | JPG | Revestimientos — **fondo de toda la sección** con cerámicas |
| ✅ `fondo-porcelanato.jpg` | 1536 × 1024 px | JPG | Revestimientos — **fondo de toda la sección** con porcelanato |
| ✅ `fondo-baldosa.jpg` | 1536 × 1024 px | JPG | Revestimientos — **fondo de toda la sección** con baldosas |
| ✅ `fondo-laja.jpg` | 1536 × 1024 px | JPG | Revestimientos — **fondo de toda la sección** con lajas |
| ✅ `fondo-adoquin.jpg` | 1536 × 1024 px | JPG | Revestimientos — **fondo de toda la sección** con adoquines |
| ✅ `obra-panoramica.jpg` | 1774 × 887 px | JPG | Statement — panorámica de obra con anotaciones técnicas |
| `proceso-01-idea.webp` | 1400 × 1900 px | WebP | Proceso 01 — planos, relevamiento, mediciones (vertical) |
| `proceso-02-planificacion.webp` | 1400 × 1900 px | WebP | Proceso 02 — replanteo, materiales, inicio de obra (vertical) |
| `proceso-03-obra.webp` | 1400 × 1900 px | WebP | Proceso 03 — vivienda en construcción, hormigón, equipo (vertical) |
| `proceso-04-terminaciones.webp` | 1400 × 1900 px | WebP | Proceso 04 — interiores avanzados, revestimientos (vertical) |
| `proceso-05-entrega.webp` | 1400 × 1900 px | WebP | Proceso 05 — vivienda terminada (vertical) |
| `proceso-detalle-planos.webp` | 900 × 1100 px | WebP | Proceso — recorte secundario "Idea" (se muestra en gris) |
| `confianza-01-atencion.webp` | 1000 × 620 px | WebP | Confianza — manos revisando planos / charla de obra |
| `confianza-02-presupuesto.webp` | 1000 × 620 px | WebP | Confianza — calculadora, documentos técnicos |
| `confianza-03-materiales.webp` | 1000 × 620 px | WebP | Confianza — revestimientos y materiales reales |
| `confianza-04-garantia.webp` | 1000 × 620 px | WebP | Confianza — equipo trabajando en obra |
| `confianza-05-entrega.webp` | 1000 × 620 px | WebP | Confianza — interior terminado |
| `proyecto-01.webp` | 2000 × 1125 px | WebP | Proyectos — obra nueva (horizontal protagonista) |
| `proyecto-02.webp` | 1200 × 1600 px | WebP | Proyectos — remodelación integral (vertical) |
| `proyecto-03.webp` | 1200 × 1600 px | WebP | Proyectos — exteriores (vertical) |
| `proyecto-04.webp` | 2400 × 1000 px | WebP | Proyectos — terminaciones (panorámica full-width) |
| `cta-casa-terminada.webp` | 2400 × 1400 px | WebP | Proceso — recorte secundario "Entrega": vivienda terminada |
| `concrete-grain.png` | 320 × 320 px | PNG con alfa | Overlay de grano, se repite sobre las secciones oscuras |

## Notas

- **Texturas tileables**: las 5 `textura-*.webp` tienen que repetirse sin costuras
  visibles (seamless). Si una textura tiene un borde marcado, se va a notar la grilla.
- **Serie `proceso-*`**: idealmente son cinco tomas de **la misma obra** en distintas
  etapas. Verticales, misma paleta y misma hora del día si se puede: al hacer scroll
  se cruzan una sobre otra y la coherencia entre ellas es lo que vende la sección.
- **Serie `servicios-*`**: en desktop son la foto grande de cada servicio y se
  recortan casi a toda la altura de la sección, con un panel oscuro encima del
  tercio derecho. Dejá el motivo principal hacia la izquierda del encuadre.
- **Serie `confianza-*`**: las cinco van en una franja horizontal alineada, así que
  necesitan el mismo encuadre y el mismo tratamiento de color.
- **Serie `fondo-*`**: es el fondo de **toda** la sección de revestimientos y cambia
  al elegir cada material. Se aplica con `cover`, así que conviene que las cinco
  sean el mismo ambiente desde el mismo punto de vista: al cruzarse una sobre otra
  parece que el material cambia en el lugar. Encima va un degradado negro a la
  izquierda que garantiza la lectura del texto.
- **Serie `textura-*`**: son las miniaturas del selector. Alcanza con un parche
  chico del material; se muestran con `cover`, no repetidas.
- Los originales en PNG quedaron en `assets/imagenes/` (unos 29 MB en total). Ya
  están convertidos y optimizados en `assets/`, así que esa carpeta se puede
  borrar antes de subir el sitio.
- **Peso**: apuntar a menos de 300 KB por foto y menos de 150 KB por textura.
- Si tenés las fotos en JPG, se pueden convertir a WebP antes de subirlas.
- Las rutas ya están escritas en el HTML: no hace falta tocar código, solo dejar
  los archivos acá con el nombre exacto.
