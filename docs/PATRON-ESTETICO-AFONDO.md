# PATRÓN ESTÉTICO — AFONDO · v1.0

ESTADO: v1.0 VALIDADO por Jorge (23-jul-2026). REGLA DE USO: Franky lee este archivo ANTES de cualquier tarea que toque algo visible en Afondo (web, generador o PDF). Este archivo NO sustituye al bloque de conformidad que llega en cada brief: si brief y archivo se contradicen, STOP y preguntar.

---

> Repo `Afondo-Limpieza-` · branch `main` · commit auditado `b378ae1` (2026-07-16).
> Stack: Vite + React 19 + TypeScript + Tailwind (`darkMode:'class'`) · PDF cliente (jsPDF + html2canvas).
> Fuente completa de evidencia y lista de inconsistencias: `docs/MAPA-ESTETICA-AFONDO.md`.
>
> **AVISO CLAVE — ✅ RESUELTO por Jorge (2026-07-23):** Afondo tiene DOS estéticas que conviven a propósito, y ya **NO es una inconsistencia pendiente** — es la decisión final:
> - **WEB pública** → "dark BOLD", Tailwind, marca **azul `#1a1aff`**. **Es lo único a lo que aplica este patrón** (referencia = la home).
> - **GENERADOR + PDF** (lo que usa/entrega Jaime) → "premium light", estilos inline, marca **violeta `#6A65E3` + oro `#d4af37`**. **CONGELADOS:** no se unifican ni se tocan estéticamente. Cualquier cambio visual ahí = ⛔️ STOP y OK explícito de Jorge.
> El desajuste de marca entre web y generador **es intencionado y queda así por decisión de Jorge**; ya no es la "Inconsistencia #1" a resolver.

---

## 1. TOKENS

### A) WEB — tokens definidos (`tailwind.config.js:17-25`)
| Token | Valor | Uso |
|---|---|---|
| `primary` | `#1a1aff` | marca / acentos / CTAs |
| `primary-dark` | `#0000cc` | hover del primary |
| `surface-light` | `#f8fafc` | fondo claro |
| `surface-dark` | `#0f172a` | fondo oscuro |
| Fuente | `Public Sans` (400/700/900) | todo el texto |
| Iconos | Material Symbols Outlined | toda la iconografía |
| Breakpoint extra | `xs: 480px` | |

Convenciones web: contenedor `max-w-7xl mx-auto px-6 lg:px-12`; sección `py-24`; títulos `font-black uppercase tracking-*`; card `rounded-[2rem]`; modo oscuro con `dark:`. Verdes/rojos/oro vía utilidades Tailwind (`green-500`, `red-600`, `yellow-400`, `amber-500`).

### B/C) GENERADOR + PDF — constantes (`components/CertificateGenerator.tsx:177-182`)
| Const | Valor | Uso |
|---|---|---|
| `BRAND` | `#6A65E3` | marca del generador/PDF |
| `BRAND_DARK` | `#4f48b8` | gradientes |
| `NAVY` | `#0b1020` | fondos cabecera/pie del PDF |
| `INK` | `#0f172a` | texto principal |
| `GOLD` | `#d4af37` | filo / sello dorado |
| `GOLD_LIGHT` | `#f3d98b` | degradado dorado |

Convenciones generador/PDF: **estilos inline** (`style={{}}`), unidades `px`; fuente `"Public Sans", system-ui`; fondo del documento `#fff` (siempre light); pesos 700/800/900; grises `#475569/#64748b/#94a3b8`, bordes `#e2e8f0`. Objetos de estilo reutilizables `input`/`label`/`ayuda` (`:637-663`). Cada bloque cortable lleva `data-pdf-block`.

> Sub-caso: el PDF de presupuesto de la calculadora (`Calculadora.tsx:126-195`) usa hoy azul `#1a1aff` + fuente helvetica → NO alineado con el PDF del certificado (Inconsistencia #2/#3 del MAPA).

---

## 2. HERMANOS DE REFERENCIA

**Botón primario WEB** — `App.tsx:72-77`
```tsx
<button className="bg-primary hover:bg-primary-dark text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg hover:scale-105 active:scale-95">
  Calcular precio online
</button>
```

**Card WEB** — `ServicesSection.tsx:59`
```tsx
<article className="group flex flex-col bg-white dark:bg-slate-900 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100 dark:border-slate-800">
```
(radio dominante de card en el resto del sitio = `rounded-[2rem]`)

**Sección WEB** — `ServicesSection.tsx:45-51`
```tsx
<section className="bg-slate-50 dark:bg-slate-950 py-24">
  <div className="max-w-7xl mx-auto px-6 lg:px-12">
    <div className="mb-16 text-center">
      <span className="text-primary font-bold text-sm tracking-widest uppercase mb-3">Nuestras Soluciones Técnicas</span>
      <h2 className="text-slate-900 dark:text-white text-3xl md:text-5xl font-black ...">
```
> ⚠️ **Corrección de patrón:** el código vivo de `ServicesSection.tsx:45-51` tiene hoy `font-extrabold`, **pero el peso 800 NO está cargado** en Public Sans (solo 400/700/900). El patrón correcto es `font-black`, como se muestra arriba. Al próximo toque de ese componente, corregir `font-extrabold` → `font-black`. (No se toca en esta pasada solo-docs para no alterar el bundle de la web.)

**Botón primario GENERADOR** — `CertificateGenerator.tsx:884-902`
```tsx
<button style={{ background:`linear-gradient(135deg, ${BRAND}, ${BRAND_DARK})`, color:'#fff',
  borderRadius:12, fontSize:16, fontWeight:800, boxShadow:'0 8px 20px rgba(106,101,227,.35)' }}>
  Descargar PDF
</button>
```

**Input GENERADOR (objeto canónico)** — `CertificateGenerator.tsx:647-656`
```tsx
const input: React.CSSProperties = {
  width:'100%', padding:'11px 13px', border:'1.5px solid #e2e8f0',
  borderRadius:10, fontSize:15, outline:'none', fontFamily:'inherit', boxSizing:'border-box' };
```

**Cabecera PDF** — `CertificateGenerator.tsx:974-999`
```tsx
<div data-pdf-block style={{ background:`linear-gradient(125deg, ${NAVY} 0%, ${BRAND_DARK} 60%, ${BRAND} 100%)`, color:'#fff', padding:'30px 40px 28px' }}>
  <div style={{ fontSize:32, fontWeight:900, letterSpacing:1.5 }}>AFONDO</div>
  <div style={{ fontSize:10.5, fontWeight:700, letterSpacing:4, textTransform:'uppercase' }}>Higiene Industrial</div>
  <div style={{ fontSize:17, fontWeight:900, textTransform:'uppercase' }}>Informe Técnico</div>
</div>
```
+ filo dorado `:1001`.

**Bloque de contenido PDF** — `CertificateGenerator.tsx:669-719` (círculo nº en `<text>` SVG + título uppercase + regla degradada).

**Firma/sello PDF** — `CertificateGenerator.tsx:1093-1099` (firma `"Brush Script MT"` `BRAND_DARK`) + sello dorado `:1011-1033`.

---

## 3. ARQUITECTURA

- **Web (A):** Tailwind utility-first inline en JSX. `@tailwind base/components/utilities` en `assets/main.css` (importado en `index.tsx:6`). `tailwind.config.js` con `darkMode:'class'`, `plugins:[]`. Theming por variantes `dark:`. Globales: reset + `.material-symbols-outlined` + `h1,h2,h3{text-wrap:balance}` + `scroll-behavior:smooth`. Fuentes por `<link>` Google Fonts en `index.html:96-108`. React 19/jsPDF vía import map `esm.sh` (`index.html:115-126`).
- **Generador + PDF (B/C):** 100% estilos inline con constantes JS; **sin Tailwind, sin `dark:`** (deliberado: `html2canvas` rasteriza el DOM y el PDF debe salir idéntico e independiente del tema). Único `<style>` embebido = media query del grid del generador (`:1117-1123`).
- **Colisión histórica documentada:** doble Tailwind (CDN `#6A65E3` vs build `#1a1aff`) retirado en Tanda 1; la web quedó en `#1a1aff` pero el generador conserva el `#6A65E3` retirado (`index.html:110-113`). Deuda `html2canvas` sub-píxel mitigada en `onclone` (`:421-449`).

---

## 6. BLOQUE DE CONFORMIDAD ESTÉTICA — AFONDO

> Bloque DEFINITIVO (v1.0 validado por Jorge 2026-07-23). Se pega tal cual en cada brief.

**--- BLOQUE DE CONFORMIDAD ESTÉTICA — AFONDO (pegar en cada brief) ---**

Antes de tocar nada visual, cumple este sistema. No es opcional ni interpretable. Fuente: `docs/PATRON-ESTETICO-AFONDO.md`. **DECISIÓN DE JORGE 23-jul-2026:** el patrón aplica SOLO a la web pública (referencia = la home); el generador y el PDF están **CONGELADOS**.

**A) WEB PÚBLICA (dark BOLD · Tailwind):**

1. Marca = `primary #1a1aff` / hover `primary-dark #0000cc` (tokens de `tailwind.config.js`). PROHIBIDO `#6A65E3` en componentes web.
2. Tipografía Public Sans (pesos cargados: 400/700/900) + iconos Material Symbols Outlined. Ninguna otra familia.
3. Títulos y CTAs en `font-black` + `uppercase` + `tracking-*`. **NUNCA `font-extrabold`:** el peso 800 NO está cargado; si el hermano que copias lo lleva, corrígelo a `font-black`.
4. Contenedor `max-w-7xl mx-auto px-6 lg:px-12` · sección `py-24`.
5. Botón primario: `bg-primary hover:bg-primary-dark text-white font-black uppercase rounded-xl transition-all`.
6. Card: `bg-white dark:bg-slate-900 border slate-100/slate-800` con radio dominante `rounded-[2rem]`, `shadow-* hover:shadow-2xl`.
7. Todo componente web soporta `dark:` (salvo heros sobre imagen y bandas `bg-primary`). Superficies: `surface-light #f8fafc` / `surface-dark #0f172a`; nada de hex sueltos fuera de tokens/utilidades.
8. Verde WhatsApp = `green-500`/`green-600` por utilidad Tailwind, nunca hex.
9. Secciones nuevas se montan SOLO con bloques del CATÁLOGO del PATRON (referencia de composición = la home, `App.tsx`). `TestimonialsSection` está DESACTIVADO: no reactivar sin reseñas reales + OK de Jorge. Tipo de bloque nuevo = ⛔️ STOP y OK explícito de Jorge.

**B) GENERADOR + PDF — CONGELADOS:**

10. No se tocan estéticamente. Si un brief funcional los roza: conservar TAL CUAL constantes (`BRAND #6A65E3`, `BRAND_DARK`, `NAVY`, `INK`, `GOLD`, `GOLD_LIGHT`), estilos inline, fondo blanco (siempre light, sin `dark:`), `data-pdf-block` en cada bloque cortable, filo dorado, sello y firma. Cero Tailwind ahí. Cualquier cambio visual en generador/PDF = ⛔️ STOP y OK explícito de Jorge.

**Autochequeo antes de reportar cierre:** ¿estoy en web (azul `#1a1aff` + Tailwind) sin haber metido violeta? ¿`font-black` (cero extrabold) y `rounded-[2rem]`? ¿tokens/utilidades en vez de hex sueltos? ¿si rocé el generador/PDF quedó visualmente idéntico? ¿todo bloque sale del catálogo? Si alguna respuesta es "no sé" → STOP y preguntar.

**--- FIN DEL BLOQUE ---**

---

## 7. CATÁLOGO DE BLOQUES (orden de Jorge 2026-07-23)

> ⚠️ El catálogo aplica **SOLO a la WEB PÚBLICA** (decisión Jorge 2026-07-23). El **generador
> de certificados + PDF quedan CONGELADOS tal cual** y NO son objeto de unificación → fuera
> de este catálogo. **Referencia de composición = LA HOME** (`App.tsx`, orden de secciones).
> Lista CERRADA, solo lo que existe. Los tipos "sección texto+imagen", "grid de tarjetas", "FAQ"
> y "CTA final" del ejemplo genérico se instancian aquí con estos nombres concretos.

| Tipo de bloque | Ejemplar canónico (sección de la home) |
|---|---|
| **Navbar** | `components/Navbar.tsx` |
| **Hero** | `components/Hero.tsx` (`#inicio`) |
| **Sección de problema/dolor** (texto centrado) | `components/ProblemSection.tsx` (`#problema`) |
| **Grid de tarjetas de servicio** | `components/ServicesSection.tsx` (`#servicios`) — card `rounded-[2rem]` |
| **Bloque explicativo Certificado** | `components/CertificateSection.tsx` (`#certificado`) |
| **Resultados** (antes/después) | `components/ResultsSection.tsx` (`#resultados`) |
| **Banda CTA calculadora** | inline en `App.tsx:66-79` (`bg-primary/5`, botón "Calcular precio online") |
| **FAQ** | `components/FAQSection.tsx` (`#faq`) |
| **Ubicaciones** | `components/LocationSection.tsx` (`#ubicaciones`) |
| **Contacto (sección)** | `components/ContactSection.tsx` (`#contacto-seccion`) |
| **Footer** | `components/Footer.tsx` |
| **Cookie banner** | `components/CookieBanner.tsx` |
| **WhatsApp FAB** | inline en `App.tsx:96-104` (botón flotante `green-500`) |

**Desactivado (NO usar hasta tener reseñas REALES):** `TestimonialsSection` — apagado en tanda 0 por testimonios inventados (`App.tsx:17`). Reintroducir solo con reseñas reales de Google Business.

**Regla de composición (literal, idéntica en los 4 PATRON):**
> Las páginas se montan SOLO con bloques de este catálogo, copiando el ejemplar canónico y adaptando contenido. Un tipo de bloque nuevo o una variante estructural = ⛔️ STOP y OK explícito de Jorge antes de construirlo.
