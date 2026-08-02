import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
    title: 'Irfan Hariyanto — Portofolio Desain Grafis & WhatsApp Bot Developer',
    description: 'Portofolio resmi Irfan Hariyanto, desainer grafis dan pengembang WhatsApp bot dari Indonesia. Temukan karya desain, brand, foto, video, dan project web profesional.',
    keywords: ['Irfan Hariyanto', 'portfolio Irfan Hariyanto', 'desainer grafis', 'WhatsApp bot developer', 'personal brand', 'web desain'],
    authors: [{ name: 'Irfan Hariyanto' }],
    creator: 'Irfan Hariyanto',
    openGraph: {
        title: 'Irfan Hariyanto — Portofolio Desain Grafis & WhatsApp Bot Developer',
        description: 'Portofolio resmi Irfan Hariyanto, desainer grafis dan pengembang WhatsApp bot dari Indonesia.',
        type: 'website',
        siteName: 'Irfan Hariyanto',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Irfan Hariyanto — Portofolio Desain Grafis & WhatsApp Bot Developer',
        description: 'Portofolio resmi Irfan Hariyanto, desainer grafis dan pengembang WhatsApp bot dari Indonesia.',
        creator: '@rtwone',
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
