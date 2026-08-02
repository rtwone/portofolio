"use client";

import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { projects } from '@/lib/projects';
import { useEffect, useState } from 'react';

const localI18n = {
    en: {
        allProjects: 'All Projects',
        description: 'A curated selection of repositories and code-based work for websites, bots, and automation tools.',
        back: 'Back to Home',
        repoLabel: 'Repository',
        previewUnavailable: 'Preview unavailable',
    },
    id: {
        allProjects: 'Semua Projek',
        description: 'Koleksi repositori dan pekerjaan berbasis kode untuk website, bot, dan alat otomatisasi.',
        back: 'Kembali ke Beranda',
        repoLabel: 'Repository',
        previewUnavailable: 'Preview tidak tersedia',
    },
};

export default function ProjectsPage() {
    const [lang, setLang] = useState<'en' | 'id'>('en');

    useEffect(() => {
        try {
            const stored = localStorage.getItem('lang');
            if (stored === 'en' || stored === 'id') setLang(stored);
        } catch (e) { }
    }, []);
    return (
        <main className="relative min-h-screen overflow-x-hidden bg-[var(--bg)] text-[var(--text)]">
            <div className="mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-14">
                <div className="mb-10 flex flex-col gap-6 rounded-[32px] border border-[var(--border)] bg-[var(--panel)] p-10 shadow-soft-ring">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--accent-strong)]">{localI18n[lang].allProjects}</p>
                        <h1 className="mt-3 text-4xl font-black text-[var(--text)] sm:text-5xl">{localI18n[lang].allProjects}</h1>
                        <p className="mt-4 max-w-3xl text-base leading-7 text-[#d98888] dark:text-[var(--muted)]">{localI18n[lang].description}</p>
                    </div>
                    <a href="/" className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-6 py-3 text-sm font-semibold text-[var(--text)] transition hover:bg-[#9fe4b8]">
                        {localI18n[lang].back} <ArrowRight size={18} />
                    </a>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.repo}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.05, y: -4 }}
                            whileTap={{ scale: 0.995 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.06, default: { duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }, hover: { duration: 0.12, ease: [0.2, 0.8, 0.2, 1], delay: 0 } }}
                            className="transform-gpu will-change-transform group relative overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--panel)] p-5 shadow-soft-ring"
                        >
                            <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
                                <div className="rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-3">
                                    {project.previewImage ? (
                                        <img
                                            src={project.previewImage}
                                            alt={`${project[lang].name} preview`}
                                            className="aspect-[16/9] w-full rounded-[20px] object-cover"
                                        />
                                    ) : (
                                        <div className="aspect-[16/9] rounded-[20px] bg-[#191919] dark:bg-[#101214] flex items-center justify-center px-4 text-center text-[10px] uppercase tracking-[0.32em] text-[var(--muted)]">
                                            {localI18n[lang].previewUnavailable}
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-4">
                                    <div className="flex flex-wrap items-center justify-between gap-3">
                                        <span className="text-[10px] uppercase tracking-[0.32em] text-[var(--accent-strong)]">{project[lang].category}</span>
                                        <a href={project.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-[11px] font-semibold text-[var(--text)]">
                                            {localI18n[lang].repoLabel} <ExternalLink size={14} />
                                        </a>
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-semibold text-[var(--text)]">{project[lang].name}</h2>
                                        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{project[lang].description}</p>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {project[lang].tags.map((tag) => (
                                            <span key={tag} className="rounded-full border border-[var(--border)] bg-[var(--panel)] px-2.5 py-1 text-[11px] font-semibold text-[var(--text)]">{tag}</span>
                                        ))}
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {project[lang].badges.map((badge) => (
                                            <span key={badge} className="rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.06)] px-2.5 py-1 text-[11px] text-[var(--muted)]">{badge}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
}
