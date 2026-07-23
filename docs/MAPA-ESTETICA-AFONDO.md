# MAPA-ESTETICA-AFONDO

> Auditoría read-only del repo `Afondo-Limpieza-` (branch `main`, último commit `b378ae1` · 2026-07-16 · "tanda 2.5 · vuelta a 2.3.3 dark BOLD conservando bloque Informe técnico light validado").
> Stack real verificado: **Vite + React 19 + TypeScript + Tailwind** (`darkMode: 'class'`), PDF 100% cliente (`jsPDF` + `html2canvas`). Sin backend.
> **Regla de evidencia:** todo dato lleva `archivo:línea`. Lo indeterminable va como **NO VERIFICADO**.

El producto tiene **TRES caras** que se documentan por separado en cada sección:

- **A) Web pública** (`afondolimpiezadecampanas.com`) — landing dark BOLD + rutas: home (`App.tsx`), calculadora (`Calculadora.tsx`), contacto, legales, landing SEO conductos (`pages/LimpiezaConductos.tsx`).
- **B) Zona privada / generador de certificados** — la UI que usa Jaime en `/certificado` (`components/CertificateGenerator.tsx`), gate por código.
- **C) El PDF generado** — la plantilla visual rasterizada por `html2canvas`+`jsPDF` dentro de `CertificateGenerator.tsx` (líneas ~942-1110). Es el output que ve el cliente final de Jaime. Hay además un **segundo PDF** distinto: el presupuesto de la calculadora, dibujado con la API vectorial de jsPDF (`Calculadora.tsx:126-195`) — se documenta como sub-caso de C.

## ⚠️ Convivencia de dos estéticas — CONFIRMADA por código

El commit habla de "dark BOLD conservando bloque Informe técnico light". **Se confirma que conviven dos sistemas estéticos distintos y deliberados:**

- **Web pública (A):** Tailwind + `darkMode:'class'`, color `primary #1a1aff` (azul eléctrico), estética "dark BOLD" (heros oscuros, `font-black`, uppercase, gradientes, sombras de color). Evidencia: `tailwind.config.js:18`, `Hero.tsx:38-52`, `ProblemSection.tsx:36-47`.
- **Generador + PDF (B/C):** estilos **inline** (`style={{…}}`), NO Tailwind, paleta propia con constantes `BRAND #6A65E3` (violeta) + oro `#d4af37`. Estética "premium light" (fondo blanco, cabecera navy→violeta, filo dorado, sello). Evidencia: `CertificateGenerator.tsx:177-182`, `:974`, `:1001`.

**Conflicto de marca sin resolver (documentado, NO resuelto):** el color de marca NO es el mismo en las dos caras. Web = **azul `#1a1aff`**; generador/PDF = **violeta `#6A65E3`**. `index.html:110-113` documenta que el `#6A65E3` era el viejo primary del CDN de Tailwind que se retiró de la WEB por el `#1a1aff`… pero ese mismo `#6A65E3` sigue vivo como `BRAND` del generador/PDF. Es decir: el generador quedó con el color de marca **antiguo** de la web. Cuál es el vigente es una decisión de Jorge, no del auditor. → ver INCONSISTENCIA #1.

---

# FASE 0 — Documentación de diseño existente

| Fuente | Ruta | Fecha (git/mtime) | ¿Diseño? | Alineación |
|---|---|---|---|---|
| README del repo | `/root/repos/Afondo-Limpieza-/README.md` | 2025-12-29 (git) | ❌ NO | Plantilla genérica "Run and deploy your AI Studio app" (Google AI Studio). CERO contenido de estética/marca. Menciona `GEMINI_API_KEY` que el código actual NO usa. **Desfasado / irrelevante para diseño.** |
| MOC del cliente (vault) | `/root/vault/clientes/afondo-limpieza/MOC.md` | 2026-06-09 (updated) | ⚠️ PARCIAL | Índice del cliente + datos fiscales + descripción funcional del generador. **NO contiene guía de estilo, tokens ni paleta.** Sí aporta contexto: acceso `Jaimitopiensa`, deploy **Hostinger** (no Vercel), señal de deploy = cambio de hash `assets/index-<hash>.js`. Alineado con el código en lo funcional. |
| RETOMA (vault) | `/root/vault/clientes/afondo-limpieza/RETOMA-2026-06-03.md` | 2026-06-02 (created) | ❌ NO | Prompt de retoma. **Desfasado en un dato clave:** dice "deploy auto en **Vercel**"; el MOC (más reciente, 2026-06-09) lo corrige a **Hostinger**. Conflicto histórico → prevalece el MOC por recencia. Sin info de diseño. |
| Comentarios en `index.html` | `index.html:110-113` | 2026-07-16 (git) | ⚠️ decisión de color | Único registro "vivo" de decisión de color: doble Tailwind eliminado, `primary` web fijado a `#1a1aff` (antes CDN `#6A65E3`). Alineado con `tailwind.config.js`. |

**Conclusiones FASE 0:**
1. **No existe guía de estilo formal de Afondo** en repo ni en vault. La "documentación de diseño" son comentarios sueltos en código + un MOC funcional.
2. Los ficheros mencionados en el MOC (`ficha-empresa-generador-2026-06-02.md`, `investigacion-normativa-…md`) están **enlazados pero NO presentes** en `/root/vault/clientes/afondo-limpieza/` (solo hay `MOC.md` y `RETOMA-2026-06-03.md`). → NO VERIFICADO su contenido.
3. Conflicto histórico Vercel (RETOMA) vs Hostinger (MOC): documentado, no resuelto aquí; el MOC es más reciente.

---

# FASE 1 — MAPEO

## 1. TOKENS REALES

### A) Web pública

**Colores — definidos (Tailwind `theme.extend`, `tailwind.config.js:17-22`):**
| Token | Hex | Archivo:línea |
|---|---|---|
| `primary` | `#1a1aff` | `tailwind.config.js:18` |
| `primary-dark` | `#0000cc` | `tailwind.config.js:19` |
| `surface-light` | `#f8fafc` | `tailwind.config.js:20` |
| `surface-dark` | `#0f172a` | `tailwind.config.js:21` |

`body` por defecto: `bg-surface-light dark:bg-surface-dark text-slate-900 dark:text-slate-100` (`index.html:129`). `<html class="light">` (`index.html:2`) → arranca en claro; el toggle añade/quita `.dark` (`App.tsx:24-25`).

**Colores — hardcodeados en la web (escapan a los tokens):**
- `bg-[#0a0a1a]` (bloque total oscuro calculadora) — `Calculadora.tsx:499`
- `bg-[#1f2128] hover:bg-[#2a2d36]` (botón PDF) — `Calculadora.tsx:508`
- `bg-[#22c55e] hover:bg-[#1db053]` (botón WhatsApp; equivale a `green-500`/`green-600` de Tailwind escritos a mano) — `Calculadora.tsx:511`
- Paletas semánticas por utilidades Tailwind directas, muy recurrentes: `slate-*` (texto/superficies), `green-500`/`green-600` (WhatsApp, `App.tsx:100`, `ContactSection.tsx:44,53`), `red-*`/`orange-*` (alerta riesgo/incendio, `Hero.tsx:88`, `Calculadora.tsx:438`), `yellow-400`/`amber-500` (pegatina/certificado, `CertificateSection.tsx:115`, `Calculadora.tsx:490`).

**Tipografía y jerarquía:**
- Familia única: **Public Sans** (`tailwind.config.js:24`, cargada en `index.html:96`, pesos 400/700/900). Fallback `system-ui` mientras carga (`index.html:74`).
- Iconografía: **Material Symbols Outlined** (`index.html:96-100`, clase `.material-symbols-outlined` en `assets/main.css:10-24` e inline `index.html:79-92`).
- Jerarquía dominante: H1 hero `text-4xl … sm:text-7xl lg:text-[5.5rem] font-black` (`Hero.tsx:51`); H2 sección `text-3xl md:text-5xl font-black`/`font-extrabold` (`ProblemSection.tsx:37`, `ServicesSection.tsx:49`); eyebrow/kicker `text-[10px]…text-sm font-black/bold uppercase tracking-[0.2em..0.3em] text-primary` (`ProblemSection.tsx:36`, `ServicesSection.tsx:48`, `ContactSection.tsx:17`). **Peso dominante = `font-black`; casi todo título/CTA en `uppercase` + `tracking-*`.**
- `h1,h2,h3 { text-wrap: balance }` global (`assets/main.css:26-28`); `html { scroll-behavior: smooth }` (`assets/main.css:6-8`).

**Espaciados recurrentes:** contenedor `max-w-7xl mx-auto px-6 lg:px-12` (canónico, aparece en `Hero.tsx:41`, `ProblemSection.tsx:34`, `ServicesSection.tsx:46`, `Footer.tsx:59`, `ContactSection.tsx:15`, `App.tsx:67`). Padding vertical de sección: `py-24` dominante (`ServicesSection.tsx:45`, `CertificateSection.tsx:13`, `ContactSection.tsx:14`), con `py-32` en `ProblemSection.tsx:33` y `py-16` en el CTA de `App.tsx:66`. Grid de tarjetas `gap-8`.

**Radios (border-radius):** muy variados. `rounded-xl` (botones, `App.tsx:74`), `rounded-2xl` (badges/logo, `Navbar.tsx:59`), `rounded-3xl` (cards servicios, `ServicesSection.tsx:59`), `rounded-[2rem]` (cards problem/contacto, `ProblemSection.tsx:47`, `ContactSection.tsx:32`), `rounded-[2.5rem]` (card certificado, `CertificateSection.tsx:44`; calculadora, `Calculadora.tsx:262`), `rounded-[2rem]` botón hero (`Hero.tsx:62`), `rounded-full` (badges/FAB). **No hay escala de radios unificada.** → ver INCONSISTENCIA #4.

**Sombras:** `shadow-sm`, `shadow-xl`, `shadow-2xl` (Tailwind) + sombras de color propias: `shadow-[0_25px_50px_rgba(26,26,255,0.45)]` (hero CTA, `Hero.tsx:62`), `shadow-[0_10px_25px_rgba(34,197,94,0.4)]` (FAB WhatsApp, `App.tsx:100`), `shadow-primary/20`, `shadow-primary/30`, `shadow-green-500/20`.

**Transiciones:** `transition-all` dominante; `hover:scale-105`/`hover:-translate-y-1`/`hover:-translate-y-2` recurrentes; `group-hover:scale-110`, `duration-300`/`500`/`700`. Animación custom `animate-in fade-in slide-in-from-right-4 duration-500` en pasos de calculadora (`Calculadora.tsx:267` etc. — requiere plugin/util `tailwindcss-animate`; **NO VERIFICADO** que esté instalado, no aparece en `tailwind.config.js` plugins que está vacío `:31`).

### B) Zona privada / generador (UI de Jaime)

**Colores — constantes JS (NO son tokens Tailwind), `CertificateGenerator.tsx:177-182`:**
| Const | Hex | Uso |
|---|---|---|
| `BRAND` | `#6A65E3` | violeta de marca del generador (botones, acentos, checkbox) |
| `BRAND_DARK` | `#4f48b8` | gradientes |
| `NAVY` | `#0b1020` | fondos oscuros cabecera/pie |
| `INK` | `#0f172a` | texto principal (= `surface-dark` de la web, coincidencia) |
| `GOLD` | `#d4af37` | filo/sello dorado |
| `GOLD_LIGHT` | `#f3d98b` | degradado dorado |

**Colores hardcodeados adicionales del formulario (fuera de las constantes):** `#e2e8f0` (bordes inputs, ~10 usos: `:576,650,715,789,808,834,856,870,1036`), `#64748b`/`#94a3b8`/`#475569`/`#334155` (grises texto), `#dc2626` (error, `:614`), `#e9ebf2` (fondo página del generador, `:725`), `#fff`. Verdes de éxito `#16a34a`/`#15803d` (botón compartir, `:911`).

**Tipografía:** `fontFamily: '"Public Sans", system-ui, sans-serif'` declarada inline repetidamente (`:537,726`) — misma familia que la web, pero **sin heredar de Tailwind** (el generador vive en su propio árbol de estilos inline). Pesos vía `fontWeight` numérico: 700/800/900. Uso intensivo de `textTransform:'uppercase'` + `letterSpacing`.

**Espaciados/radios/sombras:** todo en `px` numéricos inline. Radios: `borderRadius: 24` (card acceso, `:544`), `18` (card formulario, `:764`), `12`/`11`/`10` (inputs/botones). Sombras: `0 25px 60px rgba(0,0,0,.45)` (`:548`), `0 4px 20px rgba(15,23,42,.06)` (`:764`), `0 8px 20px rgba(106,101,227,.35)` (botón, `:898`).

### C) El PDF generado

El PDF es una rasterización (`html2canvas`) del nodo `#afondo-pdf-root` (`CertificateGenerator.tsx:942-1111`), luego troceado a páginas A4 en `jsPDF` (`:457-509`). Sus tokens = las constantes de B, aplicadas así:

| Elemento PDF | Valor | Archivo:línea |
|---|---|---|
| Fondo página | `#fff` | `:947` |
| Cabecera | `linear-gradient(125deg, NAVY 0% → BRAND_DARK 60% → BRAND 100%)`, texto `#fff` | `:974` |
| Filo dorado | `linear-gradient(90deg, GOLD, GOLD_LIGHT, GOLD)`, `height:4` | `:1001` |
| Franja datos empresa | fondo `INK`, texto `#cbd5e1`, `fontSize 10.5` | `:1004-1007` |
| Sello "Servicio Verificado" | círculo 96px, `border 2px GOLD`, `radial-gradient(#fffdf5,#fbf3da)`, `rotate(-10deg)` | `:1011-1033` |
| Nº bloque | círculo 22px `linear-gradient(135deg, BRAND, BRAND_DARK)`, dígito en `<text>` SVG | `:676-703` |
| Marca de agua | "AFONDO" `fontSize 150`, `color rgba(106,101,227,0.04)`, `rotate(-24deg)` | `:956-971` |
| Firma | `fontFamily:'"Brush Script MT", cursive'`, `fontSize 22`, `BRAND_DARK` | `:1095` |
| Pie corporativo | fondo `NAVY`, texto `#94a3b8`, acento `GOLD_LIGHT` | `:1104-1109` |
| Etiqueta foto Antes/Después | gradientes `#ef4444→#b91c1c` / `#22c55e→#15803d` | `:1077` |

**Sub-caso PDF de la calculadora (`Calculadora.tsx:126-195`, jsPDF vectorial, NO html2canvas):**
- Header `setFillColor(26,26,255)` = **`#1a1aff`** (¡el primary de la WEB, no el BRAND del generador!) — `:130`.
- Texto cuerpo `setTextColor(30,41,59)` = `#1e293b` (`slate-800`), `:141`. Caja total `setFillColor(248,250,252)` = `#f8fafc` (`:181`). Fuente **helvetica** (built-in jsPDF), NO Public Sans (`:134,146`). → Este PDF NO comparte estética con el PDF del certificado; usa el azul de la web. → ver INCONSISTENCIA #2.

---

## 2. COMPONENTES CANÓNICOS (hermano de referencia)

### A) Web pública

**Botón primario (hermano: hero CTA / CTA banner):**
`App.tsx:72-77`
```tsx
<button
  onClick={() => navigate('/calculadora')}
  className="bg-primary hover:bg-primary-dark text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg hover:scale-105 active:scale-95"
>
  Calcular precio online
</button>
```
Patrón dominante del botón primario web: `bg-primary hover:bg-primary-dark text-white font-bold/font-black uppercase rounded-xl transition-all` (+ a veces `active:scale-95`, `shadow-primary/20`). Confirmado en `Navbar.tsx:102`, `Calculadora.tsx:549`, `ContactSection.tsx:80`.

**Botón secundario (hermano: navbar sobre fondo oscuro):**
`Navbar.tsx:100-105`
```tsx
<button
  onClick={onNavigateCalculadora}
  className={`${isLightPage ? 'bg-primary text-white' : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'} px-6 py-2.5 rounded-xl text-sm font-black uppercase tracking-wider transition-all backdrop-blur-md`}
>
  Calculadora
</button>
```
Variante "ghost sobre dark": `bg-white/10 border border-white/20 backdrop-blur-md`. También botón outline: `border-2 border-slate-200 dark:border-slate-700` (`Calculadora.tsx:541`).

**Card (hermano: tarjeta de servicio):**
`ServicesSection.tsx:59`
```tsx
<article className="group flex flex-col bg-white dark:bg-slate-900 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100 dark:border-slate-800">
```
Patrón card dominante: `bg-white dark:bg-slate-900 rounded-[2rem|3xl] border border-slate-100 dark:border-slate-800 shadow-* hover:shadow-2xl hover:-translate-y-2 transition-all`. Confirmado en `ProblemSection.tsx:47`, `ContactSection.tsx:32`.

**Sección (hermano: ServicesSection):**
`ServicesSection.tsx:45-47`
```tsx
<section className="bg-slate-50 dark:bg-slate-950 py-24" aria-labelledby="servicios-titulo">
  <div className="max-w-7xl mx-auto px-6 lg:px-12">
    <div className="mb-16 text-center">
      <span className="text-primary font-bold text-sm tracking-widest uppercase mb-3">Nuestras Soluciones Técnicas</span>
      <h2 className="text-slate-900 dark:text-white text-3xl md:text-5xl font-extrabold ...">
```
Patrón sección: `<section className="bg-{white|slate-50|slate-950|primary} py-24">` → `<div className="max-w-7xl mx-auto px-6 lg:px-12">` → header centrado con eyebrow `text-primary uppercase tracking-widest` + H2 `font-black`.

**Formulario / inputs (web):** la web casi no tiene inputs de texto; usa **steppers/sliders/botones-selección**. Hermano = input range calculadora `Calculadora.tsx:346`:
```tsx
<input type="range" min="0" max="30" step="1" value={ductsVertical}
  onChange={(e) => setDuctsVertical(parseInt(e.target.value))}
  className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary" />
```
Selección tipo "toggle card": `border-2` que pasa a `border-primary bg-primary/5` al activarse (`Calculadora.tsx:280,390,409`).

**Header (hermano: Navbar):** `Navbar.tsx:53` — nav `absolute` transparente sobre heros oscuros, `relative bg-white shadow-sm` en páginas light. Logo = cuadro `bg-primary rounded-xl` + icono Material + "AFONDO" `font-black uppercase` (`:59-64`).

**Footer:** `Footer.tsx:54` — `bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 py-12`, columnas Servicios/Legal/Contacto, links `text-slate-500 hover:text-primary`.

### B) Generador (UI de Jaime)

**Botón primario (hermano: "Descargar PDF"):**
`CertificateGenerator.tsx:884-902`
```tsx
<button onClick={generarPDF} disabled={generando}
  style={{ width:'100%', marginTop:22, padding:'16px 26px',
    background:`linear-gradient(135deg, ${BRAND}, ${BRAND_DARK})`,
    color:'#fff', border:'none', borderRadius:12, fontSize:16, fontWeight:800,
    cursor: generando ? 'not-allowed':'pointer',
    boxShadow:'0 8px 20px rgba(106,101,227,.35)' }}>
  {generando ? 'Generando…' : 'Descargar PDF'}
</button>
```
Patrón botón primario generador: `linear-gradient(135deg, BRAND, BRAND_DARK)`, blanco, `borderRadius 12`, `fontWeight 800`, sombra violeta. Mismo patrón en el botón "Ver vista previa" activo (`:740`).

**Botón secundario/éxito (hermano: "Compartir PDF"):** `:905-922` — `linear-gradient(135deg, #16a34a, #15803d)` (verde WhatsApp).

**Card (hermano: card formulario):** `:764` — `background:'#fff', borderRadius:18, padding:26, boxShadow:'0 4px 20px rgba(15,23,42,.06)'`.

**Input (hermano: objeto `input` reutilizado):** `:647-656`
```tsx
const input: React.CSSProperties = {
  width:'100%', padding:'11px 13px', border:'1.5px solid #e2e8f0',
  borderRadius:10, fontSize:15, outline:'none',
  fontFamily:'inherit', boxSizing:'border-box' };
```
Con `label` (`:637-646`, uppercase 12px 800 `#475569`) y `ayuda` (`:657-663`, 12.5px `#94a3b8`). **Este es el patrón canónico de formulario del generador** (objeto de estilo compartido, buena práctica local).

**Checkbox de servicio (hermano):** `:781-802` — `<label>` con `border 1.5px` que pasa a `BRAND` + fondo `rgba(106,101,227,0.08)` al marcar, `accentColor: BRAND`.

### C) PDF — cabecera, tabla, firma/sello

**Cabecera PDF:** `:974-999`
```tsx
<div data-pdf-block style={{ position:'relative',
  background:`linear-gradient(125deg, ${NAVY} 0%, ${BRAND_DARK} 60%, ${BRAND} 100%)`,
  color:'#fff', padding:'30px 40px 28px', overflow:'hidden' }}>
  {/* burbujas decorativas rgba(255,255,255,0.06) */}
  <div style={{ fontSize:32, fontWeight:900, letterSpacing:1.5 }}>AFONDO</div>
  <div style={{ fontSize:10.5, fontWeight:700, letterSpacing:4, textTransform:'uppercase' }}>Higiene Industrial</div>
  <div style={{ fontSize:17, fontWeight:900, textTransform:'uppercase' }}>Informe Técnico</div>
  {/* badge Nº informe pill rgba(255,255,255,0.14) */}
</div>
```

**"Tabla"/meta del PDF (hermano):** no hay `<table>`; el patrón es la **franja meta** con labels micro-uppercase `:1036-1051`:
```tsx
<div style={{ display:'flex', gap:40, borderBottom:'1px solid #e2e8f0', paddingBottom:16 }}>
  <div>
    <div style={{ fontSize:9, fontWeight:900, color:'#94a3b8', textTransform:'uppercase', letterSpacing:1 }}>Nº de informe</div>
    <div style={{ fontSize:15, fontWeight:800 }}>{nInforme}</div>
  </div>
  {/* Fecha, Factura… */}
</div>
```
Y el componente `Bloque` numerado (`:669-719`) es la unidad de contenido repetida (círculo con nº SVG + título uppercase + regla degradada).

**Firma/sello (hermano):** firma `:1093-1099`
```tsx
<div style={{ fontFamily:'"Brush Script MT", cursive', fontSize:22, color:BRAND_DARK }}>Afondo</div>
<div style={{ width:190, borderBottom:'1.5px solid #94a3b8' }} />
<div style={{ fontSize:12, fontWeight:900 }}>{EMPRESA.tecnico}</div>
<div style={{ fontSize:10, color:'#64748b' }}>Técnico responsable · Afondo</div>
```
Sello redondo dorado "Servicio Verificado" `:1011-1033`.

---

## 3. ARQUITECTURA CSS

**Global de verdad:**
- Tailwind con `@tailwind base/components/utilities` en `assets/main.css:2-4`, importado una sola vez en `index.tsx:6`.
- `tailwind.config.js` con `content` apuntando a `index.html`, `*.tsx` de `components/` y `pages/`, `routes.meta.ts`, `data/`. `darkMode:'class'`. `plugins: []` (vacío).
- Reglas CSS globales reales: `.material-symbols-outlined` (`assets/main.css:10-24` + duplicada inline en `index.html:79-92`), `html{scroll-behavior}` (`main.css:6`), `h1,h2,h3{text-wrap:balance}` (`main.css:26`), reset `*{box-sizing/margin/padding}` inline (`index.html:67-71`).
- Fuentes cargadas por `<link>` desde Google Fonts en `index.html:96-108` (Public Sans 400/700/900 + Material Symbols).
- Import map en `index.html:115-126` sirve React 19, jsPDF, vite desde `esm.sh` (CDN). `html2canvas` NO está en el import map → viene de `package.json`/node. (**NO VERIFICADO** el detalle de resolución de bundling.)

**Cómo se estila cada cara:**
- **A) Web:** 100% **Tailwind utility classes** inline en JSX. Sin CSS modules. Modo oscuro por variante `dark:` (patrón dominante: `bg-white dark:bg-slate-900`, `text-slate-900 dark:text-white`).
- **B/C) Generador + PDF:** 100% **estilos inline `style={{}}`** con constantes JS y objetos `React.CSSProperties`. **NO usa Tailwind ni `dark:`** (deliberado: el PDF debe rasterizarse igual en cualquier tema y `html2canvas` no interpreta el theming de clases). Único `<style>` embebido: media query responsive del grid del generador (`:1117-1123`).

**Qué archivos usan `dark:` (web) vs no:**
- CON `dark:` (web, theming): `Navbar, Footer, ServicesSection, ProblemSection, ResultsSection, ContactSection, ContactPage, LocationSection, FAQSection, CookieBanner, Breadcrumbs, Calculadora, App.tsx`.
- SIN `dark:`: `Hero.tsx` (hero siempre oscuro por diseño, overlay `slate-900`), `CertificateSection.tsx` (fondo `bg-primary` fijo), `pages/LimpiezaConductos.tsx` (landing light, **NO VERIFICADO si es omisión o decisión**), `TestimonialsSection.tsx` (desactivado), y `CertificateGenerator.tsx` (inline, no aplica).

**Colisiones conocidas (documentadas en el propio código):**
- Doble Tailwind resuelto: `index.html:110-113` narra que había CDN `cdn.tailwindcss.com` + build local con dos definiciones de `primary` en conflicto (CDN `#6A65E3` vs build `#1a1aff`); se retiró el CDN y quedó `#1a1aff`. **Efecto colateral vivo:** el generador conserva el `#6A65E3` retirado como `BRAND`.
- `html2canvas` sub-píxel: bug upstream #2775 mitigado con saneado del clon (`:436-449`) y `transform:scale` neutralizado en `onclone` (`:421-432`). Es deuda de renderizado, no de estética.

---

## 4. EXCEPCIONES LEGÍTIMAS

1. **Generador/PDF con estilos inline y sin Tailwind (B/C):** legítima y deliberada. `html2canvas` rasteriza el DOM; usar `dark:`/utilidades introduciría dependencia del tema y de la purga de Tailwind. Los estilos inline garantizan que el PDF salga idéntico. Evidencia: `CertificateGenerator.tsx` completo + comentarios `:685-688,:436-449`.
2. **`Hero.tsx` sin `dark:`:** legítima. El hero va SIEMPRE sobre imagen con overlay oscuro (`:38`), el texto es blanco en ambos temas por diseño. No necesita variante dark.
3. **`CertificateSection.tsx` con fondo `bg-primary` fijo (sin dark):** legítima; es una banda de marca a todo color, la card interior es blanca a propósito para simular el papel del informe.
4. **Firma con `Brush Script MT` (`:1095`):** fuente de sistema fuera de Public Sans, legítima por semántica (imita firma manuscrita). Riesgo: no está garantizada en todos los SO → puede caer a cursiva genérica. Aceptable para un sello decorativo.
5. **PDF con paleta violeta+oro distinta de la web azul:** documentada como excepción de marca *si* Jorge la valida; hoy es ambigua (ver Inconsistencia #1). No se afirma que sea legítima sin su OK.

---

## 5. INCONSISTENCIAS / IMPROVISACIONES

> Dominante = patrón más frecuente en el código, no opinión.

1. **Color de marca divergente entre caras (raíz).** Web `primary = #1a1aff` (`tailwind.config.js:18`) vs Generador/PDF `BRAND = #6A65E3` (`CertificateGenerator.tsx:177`). `index.html:110-113` confirma que `#6A65E3` es el color **retirado** de la web. Dominante de "marca Afondo" en la web = `#1a1aff`. El generador quedó con el viejo. **Decisión de Jorge, no del auditor.**
2. **El PDF de la calculadora usa el azul de la web, el PDF del certificado usa violeta.** `Calculadora.tsx:130` (`setFillColor(26,26,255)` = `#1a1aff`) vs cabecera certificado violeta (`CertificateGenerator.tsx:974`). Dos PDFs de la misma empresa con dos marcas de color distintas. Debería unificarse al color vigente.
3. **Fuente de los dos PDFs distinta.** Certificado = Public Sans (vía html2canvas). Presupuesto calculadora = **helvetica** built-in de jsPDF (`Calculadora.tsx:134,146`). Dominante de la marca = Public Sans.
4. **Escala de radios no unificada (web).** Conviven `rounded-xl` (12px), `rounded-2xl`, `rounded-3xl`, `rounded-[2rem]`, `rounded-[2.5rem]` para elementos del mismo rango (cards): `ServicesSection.tsx:59` (`3xl`) vs `ProblemSection.tsx:47` (`[2rem]`) vs `CertificateSection.tsx:44` (`[2.5rem]`). Dominante en cards = `rounded-[2rem]`. Debería fijarse una escala.
5. **Peso de título inconsistente: `font-black` vs `font-extrabold`.** Dominante = `font-black` (`ProblemSection.tsx:37`, `Hero.tsx:51`, `CertificateSection.tsx:25`, `Calculadora.tsx:268`). Excepción sin motivo: `ServicesSection.tsx:49` usa `font-extrabold`. Debería ser `font-black`.
6. **Verde WhatsApp escrito de tres formas.** `bg-green-500`/`hover:bg-green-600` (`App.tsx:100`, `ContactSection.tsx:53`) vs hex literal `bg-[#22c55e] hover:bg-[#1db053]` (`Calculadora.tsx:511`) vs gradiente `#16a34a→#15803d` (`CertificateGenerator.tsx:911`). Dominante = utilidades `green-500/600`. Los hex literales deberían migrar a la utilidad.
7. **Bloque oscuro de la calculadora hardcodeado.** `bg-[#0a0a1a]` y `bg-[#1f2128]/#2a2d36` (`Calculadora.tsx:499,508`) no corresponden a ningún token; el equivalente del sistema sería `surface-dark #0f172a` / `slate-950`. Improvisación de color puntual.
8. **`Footer.tsx:106` copyright "© 2025".** Año fijo 2025; a fecha del último commit (2026-07) está desfasado. Detalle, pero visible al cliente.
9. **Duplicación de la regla `.material-symbols-outlined`** en `index.html:79-92` (inline critical) y `assets/main.css:10-24`, con `font-weight` distinto (`400` inline vs `normal` en css). Redundancia; convergen visualmente pero conviene una sola fuente.
10. **`plugins: []` vacío pero se usa `animate-in fade-in slide-in-from-right-4`** (`Calculadora.tsx:267` y otros pasos). Esas utilidades vienen de `tailwindcss-animate`, que NO figura en `tailwind.config.js:31`. **NO VERIFICADO** si está instalado por otra vía; si no, esas animaciones NO se aplican (fallo silencioso).
11. **Eyebrow/kicker con dos pesos+tracking distintos.** `font-bold text-sm tracking-widest` (`ServicesSection.tsx:48`, `ContactSection.tsx:17`) vs `font-black text-[10px] tracking-[0.3em]` (`ProblemSection.tsx:36`, `Hero.tsx:48`). Dominante mixto; conviene fijar uno.

---

## 6. BORRADOR — "BLOQUE DE CONFORMIDAD ESTÉTICA — AFONDO"

> Reglas imperativas, verificables, con valores exactos extraídos del código. Como web y generador tienen estéticas distintas, se divide en dos subapartados. NO se inventan reglas sin respaldo en el código.

### 6.A — WEB PÚBLICA (dark BOLD · Tailwind)

1. **Color de marca web = `primary #1a1aff`** (hover `primary-dark #0000cc`). Definido en `tailwind.config.js:18-19`. PROHIBIDO introducir `#6A65E3` en componentes web.
2. **Tipografía = Public Sans** (400/700/900) para todo texto; iconos = Material Symbols Outlined. No añadir otras familias en la web.
3. **Títulos de sección/hero en `font-black`** (nunca `font-extrabold`), y por convención `uppercase` + `tracking-*` en H1/H2, CTAs y eyebrows.
4. **Contenedor canónico:** `max-w-7xl mx-auto px-6 lg:px-12`. Padding vertical de sección por defecto `py-24`.
5. **Botón primario:** `bg-primary hover:bg-primary-dark text-white font-black uppercase rounded-xl transition-all` (+ `active:scale-95` opcional). Nada de hex de color literales para el azul.
6. **Card:** `bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] shadow-* hover:shadow-2xl hover:-translate-y-2 transition-all`. Radio de card = `rounded-[2rem]`.
7. **Todo componente de la web soporta modo oscuro** con variantes `dark:` (`bg-white dark:bg-slate-900`, `text-slate-900 dark:text-white`), salvo heros sobre imagen (siempre oscuros) y bandas `bg-primary`.
8. **Verde WhatsApp = utilidades `green-500`/`green-600`** (no `#22c55e`/`#1db053` literales).
9. **Superficies:** claro `surface-light #f8fafc` (`slate-50`), oscuro `surface-dark #0f172a` (`slate-950`/`slate-900`). No usar `#0a0a1a`/`#1f2128` sueltos.
10. **Iconografía siempre Material Symbols** con `text-primary` como color de acento por defecto.

### 6.B — GENERADOR + PDF (premium light · inline)

1. **Paleta fija del generador/PDF:** `BRAND #6A65E3`, `BRAND_DARK #4f48b8`, `NAVY #0b1020`, `INK #0f172a`, `GOLD #d4af37`, `GOLD_LIGHT #f3d98b` (`CertificateGenerator.tsx:177-182`). Usar estas constantes, nunca hex sueltos equivalentes.
2. **Fondo del documento = blanco `#fff`.** El PDF es siempre LIGHT; no aplicar theming `dark:`.
3. **Cabecera del PDF:** `linear-gradient(125deg, NAVY 0% → BRAND_DARK 60% → BRAND 100%)` + filo dorado `linear-gradient(90deg, GOLD, GOLD_LIGHT, GOLD)` de `4px`.
4. **Botón primario del generador:** `linear-gradient(135deg, BRAND, BRAND_DARK)`, blanco, `borderRadius 12`, `fontWeight 800`, `boxShadow 0 8px 20px rgba(106,101,227,.35)`.
5. **Inputs:** usar el objeto `input`/`label`/`ayuda` ya definidos (`:637-663`): `border 1.5px #e2e8f0`, `borderRadius 10`, `fontSize 15`; label uppercase 12px `800` `#475569`.
6. **Tipografía inline = `"Public Sans", system-ui, sans-serif`** (coincide con la web). Pesos 700/800/900. Firma decorativa = `"Brush Script MT", cursive` solo en el sello de firma.
7. **Todo bloque de contenido va con `data-pdf-block`** para el corte de página seguro (`:407`, `:674`) — no eliminarlo al editar la plantilla.
8. **Estructura de bloque = componente `Bloque`** (círculo nº en `<text>` SVG + título uppercase 11.5px `900` + regla degradada). No inventar otra maquetación de sección.

### Autochequeo final (5 preguntas antes de dar por buena una edición)

1. ¿El componente es **web** (usa `primary #1a1aff` + Tailwind + `dark:`) o **generador/PDF** (usa constantes `BRAND…` + inline, sin `dark:`)? ¿He respetado la paleta de esa cara?
2. ¿He usado **algún hex literal** que ya existe como token (`primary`, `surface-*`) o constante (`BRAND`, `GOLD`…)? Si sí → reemplázalo por el token.
3. ¿Los títulos están en `font-black` (no `font-extrabold`) y las cards en `rounded-[2rem]`?
4. Si toqué la plantilla del PDF: ¿mantuve los `data-pdf-block`, el filo dorado, el sello y la firma? ¿Sigue siendo blanco el fondo?
5. ¿El cambio deja la web en **azul** y el certificado en **violeta+oro** como está hoy, o estoy mezclando marcas sin que Jorge lo haya validado? Si mezclo → STOP y preguntar.
