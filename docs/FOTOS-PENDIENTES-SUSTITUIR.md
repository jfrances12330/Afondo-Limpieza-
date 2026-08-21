# Fotos pendientes de sustituir

Lista de la compra. Cada fila es un hueco de la web que **todavía no enseña una
foto real de un trabajo de Jaime**. Se borra la fila cuando la foto real entra.

Última revisión: **21-ago-2026** · medido sobre el repo, no de memoria:

```
grep -rn "lh3.googleusercontent.com" --include=*.tsx --include=*.html .
```

## Huecos con imagen pendiente

| # | Dónde | Qué enseña ahora | Qué hace falta | Bloqueado por |
|---|---|---|---|---|
| 1 | `components/Hero.tsx` · **el hero de la portada** | Foto de archivo `stock-equipo-extraccion-cubierta-1` (Pexels) | Foto real de Jaime que aguante apaisado y vertical y no distraiga | Jaime tiene que mandarla. **Es el hueco nº1 de la lista: en cuanto llegue material bueno, este se cambia el primero** |
| 9 | `components/ServicesSection.tsx` · tarjeta **Limpieza de Campanas** | Foto de archivo `stock-campana-industrial-cocina-1` (Pexels) | Foto real de una campana industrial con sus filtros | Jaime tiene que mandarla |
| — | `components/CertificateSection.tsx:88` · **Estado Inicial** | Imagen de IA (`lh3`) | Foto real de campana **sucia**, antes de limpiar | Jaime tiene que mandarlas |
| — | `components/CertificateSection.tsx:97` · **Estado Final** | Imagen de IA (`lh3`) | Foto real de la **misma** campana ya limpia | Jaime tiene que mandarlas |

⚠️ Las dos filas de stock ilustran, **no demuestran**: ninguna de las dos dice
ni sugiere que sea un trabajo de Afondo, y su `alt` describe solo lo que se ve.
Procedencia y licencia en `docs/FOTOS-STOCK-PROCEDENCIA.md`.

⚠️ Los dos huecos del certificado **no admiten stock**: ahí la foto *demuestra*
que Jaime hizo ese trabajo, y una foto de stock sería un testimonio falso.
Solo valen fotos reales suyas. El bloque ya avisa de que es un ejemplo.

## Consecuencia técnica mientras queden filas

`index.html` conserva el `preconnect` y el `dns-prefetch` a
`lh3.googleusercontent.com` (líneas 13 y 60). **No se quitan hasta que el
barrido completo dé cero**, porque si se quitan antes las imágenes que quedan
cargan más lento.

## Ya resueltos

| Hueco | Dónde | Foto real que entró |
|---|---|---|
| 10 | ServicesSection · Desengrase de Conductos | `instalacion-conductos-falso-techo-alicante-2` |
| 11 | ServicesSection · Mantenimiento de Turbinas | `instalacion-extraccion-azotea-alicante-2` |
| 12 | `pages/LimpiezaConductos.tsx` (hero, CTA y contenido) | `instalacion-conductos-falso-techo-alicante-1` |
