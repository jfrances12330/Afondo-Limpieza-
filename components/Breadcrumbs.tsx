
import React from 'react';

const Breadcrumbs: React.FC = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Inicio",
                "item": "https://afondolimpiezadecampanas.com/"
            }
        ]
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            <nav aria-label="Breadcrumb" className="bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 py-3">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <ol className="flex items-center gap-2 text-xs font-medium">
                        <li>
                            <a href="/" className="text-slate-500 dark:text-slate-400 hover:text-primary transition-colors flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm">home</span>
                                Inicio
                            </a>
                        </li>
                    </ol>
                </div>
            </nav>
        </>
    );
};

export default Breadcrumbs;
