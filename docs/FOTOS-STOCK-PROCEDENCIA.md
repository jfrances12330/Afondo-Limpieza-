# Fotos de archivo: de dónde sale cada una

Toda imagen del repo cuyo nombre empieza por `stock-` está en esta tabla. Si no
está aquí, **no debe publicarse**.

Regla que las gobierna: **el stock ilustra, nunca demuestra.** Puede ocupar un
hueco decorativo (el hero, una tarjeta de servicio). No puede ocupar un hueco
donde la foto sirva de prueba de que Afondo hizo ese trabajo: resultados,
certificado, la página de trabajos realizados, ni el `og:image` ni los datos
estructurados.

Ninguna de estas fotos lleva personas, ni marcas legibles de terceros, ni pie de
foto que sugiera que sea un trabajo de Afondo. El `alt` de cada una describe
únicamente lo que se ve.

## Tabla

| Fichero base | Dónde se usa | Fuente | Autor | Licencia | Original |
|---|---|---|---|---|---|
| `stock-equipo-extraccion-cubierta-1` | `components/Hero.tsx` (hero de la portada) y su `preload` en `index.html` | [Pexels 36360393](https://www.pexels.com/photo/industrial-hvac-system-on-rooftop-in-kuwait-city-36360393/) | Optical Chemist · https://www.pexels.com/@optical-chemist-340351297/ | https://www.pexels.com/license/ — uso comercial, **sin atribución obligatoria** | 7562 × 4759, subida 28-feb-2026 |
| `stock-campana-industrial-cocina-1` | `components/ServicesSection.tsx` · tarjeta «Limpieza de Campanas» | [Pexels 33986701](https://www.pexels.com/photo/spacious-industrial-kitchen-interior-with-stainless-steel-appliances-33986701/) | klgeoges · https://www.pexels.com/@klgeoges-2155269405/ | https://www.pexels.com/license/ — uso comercial, **sin atribución obligatoria** | 3840 × 2160, subida 21-sep-2025 |

## Qué se les hizo

Recorte centrado a la proporción del hueco y reescalado. Nada más: ni filtros,
ni retoque, ni montaje.

Se reconstruye el píxel antes de guardar (`Image.frombytes`), así que los
ficheros publicados **no heredan un solo byte de metadatos** del original: sin
EXIF, sin XMP, sin perfil ICC, sin GPS. Se sirven en WebP con reserva JPG.

| Fichero base | Anchos servidos | Proporción |
|---|---|---|
| `stock-equipo-extraccion-cubierta-1` | 800 / 1280 / 1920 | 4:3 |
| `stock-campana-industrial-cocina-1` | 400 / 800 / 1200 | 4:3 |

Los tres anchos del hero son exactamente los que apunta el `imagesrcset` del
`preload` en `index.html`. Si se cambia uno hay que cambiar el otro, o el
navegador se descarga el hero dos veces.

## Dónde está prohibido el stock

- `components/ResultsSection.tsx` — es el antes/después de un trabajo real.
- `components/CertificateSection.tsx` — es el respaldo del certificado.
- `/trabajos-realizados-alicante` — la página entera.
- `og:image`, `twitter:image` y la propiedad `image` de los datos estructurados.

## Fuentes admitidas

Pexels y Unsplash, y solo con licencia comercial sin atribución obligatoria.
**No se busca una tercera fuente por iniciativa propia**: si las dos fallan, se
para y se pide la foto.
