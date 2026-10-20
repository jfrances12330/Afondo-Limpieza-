import React from 'react';

/**
 * Piezas comunes del restyling de oct-2026 (solo web pública).
 * Regla: aquí no vive copy. Todo el texto lo pasa la página que llama, para que
 * el control de texto antes/después compare lo mismo.
 */

export const Container: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className = '' }) => (
  <div className={`mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

export const Eyebrow: React.FC<React.PropsWithChildren<{ className?: string; tone?: 'light' | 'dark' }>> = ({ children, className = '', tone = 'light' }) => (
  <span className={`eyebrow mb-4 inline-flex items-center gap-2 ${tone === 'dark' ? 'text-[#9fb0ff]!' : ''} ${className}`}>
    <span className={`h-px w-5 ${tone === 'dark' ? 'bg-[#9fb0ff]' : 'bg-brand'}`} aria-hidden="true"></span>
    {children}
  </span>
);

type Tone = 'light' | 'dark';

export const SectionHead: React.FC<{
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  lead?: React.ReactNode;
  id?: string;
  tone?: Tone;
  align?: 'left' | 'center';
  as?: 'h2' | 'h3';
  className?: string;
}> = ({ eyebrow, title, lead, id, tone = 'light', align = 'left', as = 'h2', className = '' }) => {
  const H = as;
  const center = align === 'center';
  return (
    <div className={`mb-12 md:mb-14 max-w-3xl ${center ? 'mx-auto text-center flex flex-col items-center' : ''} ${className}`}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <H id={id} className={`text-[1.9rem] leading-[1.12] sm:text-[2.5rem] font-semibold tracking-[-0.02em] ${tone === 'dark' ? 'text-white' : 'text-ink'}`}>
        {title}
      </H>
      {lead && (
        <p className={`mt-5 text-[1.0625rem] leading-relaxed ${tone === 'dark' ? 'text-slate-300' : 'text-muted'}`}>{lead}</p>
      )}
    </div>
  );
};

const btnBase = 'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors duration-150 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 whitespace-nowrap';
const btnSize = { md: 'h-11 px-5 text-[15px]', lg: 'h-12 px-6 text-base' };
const btnVariant = {
  primary: 'bg-brand text-white hover:bg-brand-dark shadow-[0_1px_0_rgba(255,255,255,.15)_inset,0_1px_2px_rgba(11,19,36,.2)]',
  secondary: 'bg-white text-ink border border-line hover:border-ink/25 hover:bg-mist',
  whatsapp: 'bg-[#1fa855] text-white hover:bg-[#178a45]',
  ghostDark: 'bg-white/5 text-white border border-white/15 hover:bg-white/10',
  light: 'bg-white text-ink hover:bg-slate-100',
};

type BtnProps = {
  variant?: keyof typeof btnVariant;
  size?: keyof typeof btnSize;
  icon?: string;
  className?: string;
};

export const ButtonLink: React.FC<React.PropsWithChildren<BtnProps & React.AnchorHTMLAttributes<HTMLAnchorElement>>> = ({ variant = 'primary', size = 'lg', icon, className = '', children, ...rest }) => (
  <a className={`${btnBase} ${btnSize[size]} ${btnVariant[variant]} ${className}`} {...rest}>
    {icon && <span className="material-symbols-outlined text-[20px]" aria-hidden="true">{icon}</span>}
    {children}
  </a>
);

export const Button: React.FC<React.PropsWithChildren<BtnProps & React.ButtonHTMLAttributes<HTMLButtonElement>>> = ({ variant = 'primary', size = 'lg', icon, className = '', children, ...rest }) => (
  <button className={`${btnBase} ${btnSize[size]} ${btnVariant[variant]} ${className}`} {...rest}>
    {icon && <span className="material-symbols-outlined text-[20px]" aria-hidden="true">{icon}</span>}
    {children}
  </button>
);

/** Icono pequeño en línea con el texto, sin cajita de color. */
export const Icon: React.FC<{ name: string; className?: string }> = ({ name, className = '' }) => (
  <span className={`material-symbols-outlined ${className}`} aria-hidden="true">{name}</span>
);

/** Marca de verificación fina para listas. */
export const Check: React.FC<{ tone?: Tone }> = ({ tone = 'light' }) => (
  <svg viewBox="0 0 16 16" className={`mt-[3px] h-4 w-4 shrink-0 ${tone === 'dark' ? 'text-[#9fb0ff]' : 'text-brand'}`} fill="none" aria-hidden="true">
    <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Logotipo de texto común a cabecera y pie. */
export const Brand: React.FC<{ tone?: Tone; sub?: React.ReactNode; name?: React.ReactNode }> = ({ tone = 'light', sub, name }) => (
  <span className="flex items-center gap-3">
    <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${tone === 'dark' ? 'bg-white text-ink' : 'bg-ink text-white'}`}>
      <span className="material-symbols-outlined text-[20px]" aria-hidden="true">cleaning_services</span>
    </span>
    <span className="flex flex-col text-left leading-none">
      <span className={`text-[17px] font-semibold tracking-[-0.01em] ${tone === 'dark' ? 'text-white' : 'text-ink'}`}>{name}</span>
      {sub && <span className={`mt-1 font-mono text-[10.5px] ${tone === 'dark' ? 'text-white/55' : 'text-muted'}`}>{sub}</span>}
    </span>
  </span>
);

/** Botón flotante de WhatsApp, más discreto que la bola verde con brillo. */
export const WhatsAppFab: React.FC<{ href: string }> = ({ href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#1fa855] text-white shadow-lift ring-4 ring-white/70 transition-colors hover:bg-[#178a45]"
    aria-label="Contactar por WhatsApp"
  >
    <span className="material-symbols-outlined text-[28px]">chat</span>
  </a>
);
