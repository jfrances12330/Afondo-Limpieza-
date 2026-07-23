# Afondo — ¿Dónde vive de verdad la web?

> Investigación read-only (2026-07-23) para resolver la incógnita del MAPA-ESTETICA
> ("la web pública NO está en el repo — NO VERIFICADO"). **Corrige esa afirmación.**

## TL;DR

La web pública **SÍ vive en este repo**. `afondolimpiezadecampanas.com` es el
**build de este mismo proyecto Vite**, servido desde **Hostinger**, que compila el
repo él mismo (`vite build`) al desplegar por Git. El generador de certificados/PDF
(`/certificado`) es **una ruta más de la MISMA app** — no hay dos aplicaciones.

## a) Qué sirve afondolimpiezadecampanas.com — VERIFICADO

- **Servidor:** cabecera `server: hcdn` → CDN de **Hostinger**. No es Vercel, no es WordPress.
- **Tipo:** SPA **Vite** (sirve `assets/index-B5MMsI1k.js`, referencia `vite`). No hay `wp-content`/`wp-json`.
- **Es este repo (prueba byte a byte):**
  - `<title>` de producción = `Limpieza de Campanas Industriales en Alicante | Certificado UNE`
    — **idéntico** al de `routes.meta.ts` (ruta `/`) y a `index.html` del repo.
  - `routes.meta.ts` usa canónicas `https://afondolimpiezadecampanas.com/...` como fuente de verdad del `<head>`.

## b) Qué produce el build y a dónde se despliega — VERIFICADO

- **Build:** `npm run build` → `vite build` → `dist/`. Un plugin propio
  (`prerenderHeads` en `vite.config.ts`) corre en `closeBundle` y prerenderiza el
  `<head>` por ruta desde `routes.meta.ts` (title/canonical/noindex/OG).
- **Comentario explícito en `vite.config.ts:12`:** el prerender corre "en local y en
  el build del **servidor de Hostinger** (que también hace `vite build`)". → Hostinger
  **compila el repo al desplegar**, no se sube un `dist` precompilado.
- **Trigger de deploy:** patrón `.deploy-ping` (fichero trackeado que se bumpea y
  commitea para forzar redeploy; commit `c5197ea "chore: deploy ping"`). Consistente
  con **auto-deploy de Hostinger al hacer push a `main`**.
- **NO hay** `.github/workflows`, **NO hay** `.vercel`, y **NO existe proyecto Vercel**
  para Afondo (búsqueda API Vercel → `[]`). El único destino de deploy es Hostinger.

### ¿El webhook cubre la web pública, solo el generador, o ambos?

**AMBOS — es un único build.** El generador de certificados vive dentro de la misma
app (`components/CertificateGenerator.tsx`, `components/Calculadora.tsx`, deps
`jspdf` + `html2canvas`) y se expone en la ruta `/certificado` (marcada `noindex` en
`routes.meta.ts`). Un solo `vite build` produce web pública + generador. No hay
webhook/pipeline separado por pieza.

## c) Conclusión con evidencia

- **Código fuente de la web pública:** este repo (`jfrances12330/Afondo-Limpieza-`),
  rama `main`. VERIFICADO.
- **¿El repo puede modificar la web pública hoy?** **SÍ.** Un push a `main` que cambie
  el módulo de la app se reconstruye en Hostinger y se publica. Los cambios en `docs/*.md`
  **no** afectan al bundle (no entran en el grafo de módulos) → el hash de
  `assets/index-<hash>.js` no cambia (gate inverso de la tanda administrativa).
- **Destino/hosting:** Hostinger (Git deploy + build propio). No Vercel, no WordPress.

### Lo NO verificado (prohibido rellenar)

- Configuración exacta del panel de Hostinger (si el auto-deploy está en "on push" vs
  requiere pulsar deploy manual) — **NO VERIFICADO** desde el repo; se infiere del
  patrón `.deploy-ping` + comentario de `vite.config.ts`. Confirmar en el panel de Hostinger.
- Credenciales/URL del webhook de Hostinger — **NO VERIFICADO** (no viven en el repo).
