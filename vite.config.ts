
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import { routes } from './routes.meta';

/**
 * Plugin de prerender de <head> por ruta.
 *
 * Corre en `closeBundle` (dentro de `vite build`), así que se ejecuta igual
 * en local y en el build del servidor de Hostinger (que también hace `vite build`).
 *
 * Lee `dist/index.html` (el generado por Vite), y por cada ruta ≠ "/" definida
 * en routes.meta.ts genera `dist/<path>/index.html` con el <head> reescrito:
 *   - title y canonical propios
 *   - description propia (si tiene)
 *   - noindex,nofollow donde aplica
 *   - OG/Twitter/schema/keywords de la home ELIMINADOS en rutas noindex
 *   - preload de LCP de la home ELIMINADO en rutas noindex
 *
 * En "/" solo se asegura que exista un <link rel="canonical"> (si ya está, no toca).
 */
function prerenderHeads(): Plugin {
  return {
    name: 'afondo-prerender-heads',
    apply: 'build',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist');
      const baseHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');

      // ---- Home: asegurar canonical (regla de oro: title/description INTACTOS) ----
      let homeHtml = baseHtml;
      if (!/<link\s+rel=["']canonical["']/i.test(homeHtml)) {
        homeHtml = homeHtml.replace(
          /<head(\s[^>]*)?>/i,
          (m) => `${m}\n  <link rel="canonical" href="https://afondolimpiezadecampanas.com/" />`
        );
        fs.writeFileSync(path.join(distDir, 'index.html'), homeHtml, 'utf8');
        console.log('[prerender-heads] home: canonical añadido');
      } else {
        console.log('[prerender-heads] home: canonical ya presente, intacta');
      }

      // ---- Rutas ≠ "/": generar dist/<path>/index.html con head reescrito ----
      for (const r of routes) {
        if (r.path === '/') continue;
        let html = baseHtml;

        // 1) Sustituir <title>
        html = html.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(r.title)}</title>`);

        // 2) Sustituir o eliminar meta description
        if (r.description) {
          if (/<meta\s+name=["']description["']/i.test(html)) {
            html = html.replace(
              /<meta\s+name=["']description["']\s+content=["'][^"']*["']\s*\/?>/i,
              `<meta name="description" content="${escapeHtml(r.description)}" />`
            );
          } else {
            html = html.replace(/<head(\s[^>]*)?>/i, (m) => `${m}\n  <meta name="description" content="${escapeHtml(r.description!)}" />`);
          }
        } else {
          html = html.replace(/<meta\s+name=["']description["'][^>]*\/?>\s*/gi, '');
        }

        // 3) Sustituir o añadir canonical
        if (/<link\s+rel=["']canonical["']/i.test(html)) {
          html = html.replace(
            /<link\s+rel=["']canonical["']\s+href=["'][^"']*["']\s*\/?>/i,
            `<link rel="canonical" href="${r.canonical}" />`
          );
        } else {
          html = html.replace(
            /<head(\s[^>]*)?>/i,
            (m) => `${m}\n  <link rel="canonical" href="${r.canonical}" />`
          );
        }

        // 4) noindex,nofollow si aplica
        if (r.noindex) {
          // Eliminar robots previo si lo hay
          html = html.replace(/<meta\s+name=["']robots["'][^>]*\/?>\s*/gi, '');
          html = html.replace(
            /<head(\s[^>]*)?>/i,
            (m) => `${m}\n  <meta name="robots" content="noindex,nofollow" />`
          );
        }

        // 5) Si es una ruta privada/legal (keepHomeOgSchema !== true), limpiar
        //    OG, Twitter Card, keywords, preload de LCP y geo tags (son de la home).
        if (!r.keepHomeOgSchema) {
          html = html.replace(/<meta\s+property=["']og:[^"']*["'][^>]*\/?>\s*/gi, '');
          html = html.replace(/<meta\s+name=["']twitter:[^"']*["'][^>]*\/?>\s*/gi, '');
          html = html.replace(/<meta\s+name=["']keywords["'][^>]*\/?>\s*/gi, '');
          html = html.replace(/<meta\s+name=["']geo\.[^"']*["'][^>]*\/?>\s*/gi, '');
          html = html.replace(/<meta\s+name=["']ICBM["'][^>]*\/?>\s*/gi, '');
          // Eliminar <link rel="preload" as="image" ...> (LCP de la home)
          html = html.replace(/<link\s+rel=["']preload["'][^>]*as=["']image["'][^>]*\/?>\s*/gi, '');
          // Eliminar JSON-LD embebido en index.html si lo hay (no en esta versión, pero por si acaso)
          html = html.replace(/<script[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>\s*/gi, '');
        }

        // 6) Inyectar JSON-LD si la ruta trae uno (schema.org). Se inserta ANTES
        //    del cierre de </head> para que aparezca dentro del <head> del HTML servido.
        if (r.jsonLd) {
          const ld = JSON.stringify(r.jsonLd);
          html = html.replace(
            /<\/head>/i,
            `  <script type="application/ld+json">${ld}</script>\n</head>`
          );
        }

        // 7) Escribir dist/<path>/index.html
        const outDir = path.join(distDir, r.path.replace(/^\//, ''));
        fs.mkdirSync(outDir, { recursive: true });
        fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
        console.log(`[prerender-heads] ${r.path} → ${path.relative(distDir, path.join(outDir, 'index.html'))}`);
      }
    },
  };
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export default defineConfig({
  plugins: [react(), prerenderHeads()],
  // Base absoluta: necesaria para que los assets referenciados como /assets/… funcionen
  // también desde subdirectorios prerenderizados (/certificado/index.html, etc.).
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
});
