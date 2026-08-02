import type { Config } from 'tailwindcss';

export default {
    darkMode: ['class'],
    content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            colors: {
                base: '#f7eee0',
                panel: '#fff7e8',
                surface: '#f9f2e3',
                accent: '#d8b26a',
                accentDark: '#7b4b17',
                text: '#1f1c17',
                muted: '#6f5f49',
                border: '#e1d3bb',
            },
            boxShadow: {
                soft: '0 24px 80px rgba(31, 28, 23, 0.12)',
            },
        },
    },
    plugins: [],
} satisfies Config;
