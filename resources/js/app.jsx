import React from 'react';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';

createInertiaApp({
    resolve: async (name) => {
        const pages = import.meta.glob('./Pages/**/*.jsx');
        const path = `./Pages/${name.replace('.', '/')}.jsx`;
        if (!pages[path]) {
            console.error(`Page not found: ${path}`);
            return () => <div>Page not found</div>; // Fallback React component
        }
        const pageModule = await pages[path]();
        return pageModule.default;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
});

