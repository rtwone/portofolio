"use client";

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Instagram, Mail, Github, MessageCircle, ExternalLink } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { homeContent, educationTimeline } from '@/lib/home-content';
import { projects } from '@/lib/projects';
import { useEffect, useState, type MouseEvent, type ReactNode } from 'react';
import { useTheme } from 'next-themes';

function TerminalTyping({ lines }: { lines: string[] }) {
    const [lineIndex, setLineIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);
    const [displayed, setDisplayed] = useState('');

    useEffect(() => {
        const current = lines[lineIndex] ?? '';
        setDisplayed(current.slice(0, charIndex));

        let timeout = 0 as unknown as number;

        if (!deleting) {
            if (charIndex < current.length) {
                timeout = window.setTimeout(() => setCharIndex((c) => c + 1), 60);
            } else {
                timeout = window.setTimeout(() => setDeleting(true), 900);
            }
        } else {
            if (charIndex > 0) {
                timeout = window.setTimeout(() => setCharIndex((c) => c - 1), 30);
            } else {
                timeout = window.setTimeout(() => {
                    setDeleting(false);
                    setLineIndex((i) => (i + 1) % lines.length);
                }, 250);
            }
        }

        return () => window.clearTimeout(timeout);
    }, [charIndex, deleting, lineIndex, lines]);

    return (
        <div className="rounded-xl bg-[rgba(255,255,255,0.92)] dark:bg-[rgba(0,0,0,0.85)] p-4 font-mono text-sm text-[#111111] dark:text-[var(--text)] shadow-sm">
            <div aria-live="polite" className="min-h-[68px]">
                <pre className="whitespace-pre-wrap text-[#111111] dark:text-[var(--text)] font-semibold">{displayed}<span className="inline-block ml-1 h-[1em] w-1 bg-[#111111] dark:bg-[var(--text)] align-middle animate-pulse" /></pre>
            </div>
        </div>
    );
}

const i18n = homeContent;

function GlowCard({ children, className = '', id, enableGlow = true }: { children: ReactNode; className?: string; id?: string; enableGlow?: boolean }) {
    const [pointer, setPointer] = useState({ x: 0, y: 0 });
    const [visible, setVisible] = useState(false);

    const handleMove = (event: MouseEvent<HTMLDivElement>) => {
        if (!enableGlow) return;
        const rect = event.currentTarget.getBoundingClientRect();
        setPointer({ x: event.clientX - rect.left, y: event.clientY - rect.top });
        setVisible(true);
    };

    return (
        <div
            id={id}
            onMouseMove={handleMove}
            onMouseLeave={() => enableGlow && setVisible(false)}
            className={`group relative isolate overflow-hidden ${className}`.trim()}
        >
            {enableGlow && (
                <div
                    className={`pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-200 ${visible ? 'opacity-100' : 'opacity-0'}`}
                    style={{
                        background: `radial-gradient(280px circle at ${pointer.x}px ${pointer.y}px, rgba(255,255,255,0.28), rgba(255,255,255,0.08) 35%, transparent 70%)`,
                    }}
                />
            )}
            <div className="relative">{children}</div>
        </div>
    );
}

function SkillBadge({ label, children }: { label: string; children?: ReactNode }) {
    return (
        <div
            role="button"
            tabIndex={0}
            className="inline-flex items-center gap-3 rounded-full border border-[var(--border)] bg-[var(--panel)] px-4 py-2 text-sm font-semibold text-[var(--text)] shadow-sm transition-transform duration-200 ease-out hover:scale-105 hover:shadow-lg hover:brightness-105 hover:ring-2 hover:ring-[var(--accent)] dark:hover:ring-[var(--accent)] focus:scale-105 focus:shadow-lg focus:ring-2 focus:ring-[var(--accent)] cursor-pointer"
        >
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[var(--surface)] text-[var(--text)] font-bold text-[13px] transition-shadow duration-200">
                {children}
            </div>
            <span className="select-none">{label}</span>
        </div>
    );
}

// Hook: track scroll direction (down/up)
// Note: Removed ScrollReveal and scroll-direction logic — simplified to hover-only motion

export default function Home() {
    const [lang, setLang] = useState<'en' | 'id'>('en');
    const [scrollProgress, setScrollProgress] = useState(0);
    const { resolvedTheme } = useTheme();

    useEffect(() => {
        try {
            const stored = localStorage.getItem('lang');
            if (stored === 'en' || stored === 'id') setLang(stored);
        } catch (e) { }
    }, []);

    const switchLang = (l: 'en' | 'id') => {
        setLang(l);
        try {
            localStorage.setItem('lang', l);
        } catch (e) { }
    };

    const scrollToTop = () => {
        const start = window.scrollY;
        if (start === 0) return;

        const duration = 700;
        const startTime = performance.now();

        const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

        const step = (currentTime: number) => {
            const elapsed = Math.min((currentTime - startTime) / duration, 1);
            const progress = easeOutCubic(elapsed);
            window.scrollTo(0, Math.round(start * (1 - progress)));
            if (elapsed < 1) {
                window.requestAnimationFrame(step);
            }
        };

        window.requestAnimationFrame(step);
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
            setScrollProgress(scrolled || 0);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const t = i18n[lang];
    const previewProjects = projects.slice(0, 4);

    return (
        <main className="relative min-h-screen overflow-x-hidden bg-[var(--bg)] text-[var(--text)]">
            <div className="relative z-10">
                <motion.div
                    className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
                    aria-hidden="true"
                >
                    <motion.div
                        className="absolute left-[-15%] top-[-12%] h-[30rem] w-[55rem] rounded-[45%] bg-[linear-gradient(110deg,rgba(255,144,54,0.95),rgba(255,184,107,0.48)_35%,rgba(255,214,153,0.2)_60%,transparent_78%)] blur-[110px] dark:bg-[linear-gradient(110deg,rgba(255,184,107,0.75),rgba(255,184,107,0.25)_35%,rgba(255,184,107,0.06)_60%,transparent_78%)]"
                        animate={{ x: [0, 90, -60, 0], y: [0, -40, 22, 0], rotate: [-8, 14, -4, -8], scale: [1, 1.08, 0.96, 1] }}
                        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                        className="absolute right-[-12%] top-[8%] h-[26rem] w-[50rem] rounded-[50%] bg-[linear-gradient(120deg,rgba(219,74,142,0.7),rgba(255,125,180,0.28)_38%,rgba(255,188,215,0.16)_62%,transparent_82%)] blur-[120px] dark:bg-[linear-gradient(120deg,rgba(255,125,180,0.45),rgba(255,125,180,0.16)_38%,rgba(255,125,180,0.04)_62%,transparent_82%)]"
                        animate={{ x: [0, -70, 50, 0], y: [0, 30, -24, 0], rotate: [10, -12, 8, 10], scale: [0.96, 1.08, 1.02, 0.96] }}
                        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                        className="absolute bottom-[-18%] left-[6%] h-[24rem] w-[48rem] rounded-[45%] bg-[linear-gradient(100deg,rgba(39,126,255,0.72),rgba(98,190,255,0.3)_40%,rgba(168,220,255,0.16)_64%,transparent_82%)] blur-[115px] dark:bg-[linear-gradient(100deg,rgba(98,190,255,0.4),rgba(98,190,255,0.15)_40%,rgba(98,190,255,0.04)_64%,transparent_82%)]"
                        animate={{ x: [0, 36, -26, 0], y: [0, -20, 24, 0], rotate: [-6, 10, -4, -6], scale: [1, 1.03, 0.97, 1] }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                        className="absolute inset-x-0 bottom-0 h-[18rem] bg-[linear-gradient(120deg,rgba(255,255,255,0.12),rgba(255,255,255,0)_65%)] blur-[60px]"
                        animate={{ opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </motion.div>
                <motion.div
                    className="fixed left-0 top-0 z-50 h-1 origin-left bg-[var(--accent)]"
                    style={{ scaleX: scrollProgress }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                />
                <motion.button
                    type="button"
                    onClick={scrollToTop}
                    className="fixed bottom-5 right-5 z-50 flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--panel)]/95 p-3 shadow-soft-ring cursor-pointer md:bottom-8 md:right-8"
                    style={{ rotate: scrollProgress * 360 }}
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--text)] font-semibold">
                        {Math.round(scrollProgress * 100)}%
                    </div>
                </motion.button>
                <header className="fixed inset-x-0 top-0 z-40 w-full border-b border-[var(--border)] bg-[var(--panel)]/95 shadow-soft-ring backdrop-blur-sm">
                    <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 md:gap-4 lg:gap-6 px-6 py-1 md:py-2 lg:py-4 sm:px-10 md:px-16 lg:px-32">
                        <a href="#home" className="inline-flex flex-none items-center gap-2 text-sm font-semibold text-[var(--text)]">
                            <div className="flex h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10 items-center justify-center rounded-3xl bg-[#ff9f43] shadow-lg shadow-[#ff9f43]/20">
                                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" />
                            </div>
                            <div className="leading-tight">
                                <p className="text-[0.64rem] uppercase tracking-[0.4em] text-[var(--accent-strong)]">Portofolio</p>
                                <p className="text-sm font-bold text-[var(--text)]">Irfan Hariyanto</p>
                            </div>
                        </a>
                        <nav className="hidden md:flex md:flex-1 md:justify-center gap-8 text-sm font-medium text-[var(--muted)]">
                            <a href="#home" className="transition hover:text-[var(--accent-strong)]">{t.nav.home}</a>
                            <a href="#about" className="transition hover:text-[var(--accent-strong)]">{t.nav.about}</a>
                            <a href="#projects" className="transition hover:text-[var(--accent-strong)]">{t.nav.projects}</a>
                            <a href="#contact" className="transition hover:text-[var(--accent-strong)]">{t.nav.contact}</a>
                        </nav>
                        <div className="flex items-center gap-3">
                            <ThemeToggle />
                            <div className="flex items-center rounded-full border border-[var(--border)] bg-[var(--surface)] p-1">
                                <button aria-label="English" onClick={() => switchLang('en')} className={`px-3 py-1 text-sm ${lang === 'en' ? 'rounded-full bg-[var(--accent)] text-[var(--text)]' : 'text-[var(--muted)]'}`}>EN</button>
                                <button aria-label="Bahasa Indonesia" onClick={() => switchLang('id')} className={`px-3 py-1 text-sm ${lang === 'id' ? 'rounded-full bg-[var(--accent)] text-[var(--text)]' : 'text-[var(--muted)]'}`}>ID</button>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="mx-auto max-w-7xl px-6 py-6 sm:px-10 md:px-16 lg:px-32 pt-6 sm:pt-8">
                    <section id="home" className="relative py-10 sm:py-16 lg:py-20 scroll-mt-24">
                        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                            <div className="">
                                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--panel)] px-4 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-[var(--accent-strong)]">{t.hero.badge}</span>
                                <h1 className="mt-8 max-w-3xl text-4xl font-black leading-[0.96] text-[var(--text)] sm:text-5xl lg:text-6xl xl:text-[64px]">{t.hero.title}</h1>
                                <p className="mt-6 max-w-2xl text-base leading-7 !text-[#d98888] dark:!text-[var(--text)] sm:text-lg">{t.hero.subtitle}</p>
                                <div className="mt-10 flex flex-wrap gap-4">
                                    <a href="#projects" className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--text)] transition hover:bg-[#c7954f]">{t.hero.seeProjects} <ArrowRight size={18} /></a>
                                </div>
                            </div>

                            <div className="relative">
                                <GlowCard enableGlow={false} className="rounded-[32px] border border-[#e1d3bb] bg-[#1f1b17] p-6 shadow-soft-ring text-[#f7ebd8]">
                                    <div className="mb-6 flex items-center justify-between rounded-[22px] bg-[#2d261f] px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <span className="h-3 w-3 rounded-full bg-[#d08c3a]" />
                                            <span className="h-3 w-3 rounded-full bg-[#7b4b17]" />
                                            <span className="h-3 w-3 rounded-full bg-[#b48534]" />
                                        </div>
                                        <span className="rounded-full bg-[#f4e7d3] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1f1c17]">{t.preview.preview}</span>
                                    </div>
                                    <div className="space-y-5">
                                        <div className="rounded-[22px] border border-[#3a332b] bg-[#2a231b] p-4">
                                            <p className="text-xs uppercase tracking-[0.3em] text-[#a08c74]">{t.preview.modern}</p>
                                            <div className="mt-4 grid gap-3">
                                                <TerminalTyping lines={t.preview.terminalLines} />
                                            </div>
                                        </div>
                                    </div>
                                </GlowCard>
                            </div>
                        </div>
                    </section>

                    <div className="mt-16 scroll-mt-24">
                        <GlowCard id="about" className="rounded-[36px] border border-[var(--border)] bg-[var(--panel)] p-10 shadow-soft-ring sm:p-12">
                            <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--accent-strong)]">{t.about.small}</p>
                                    <h2 className="mt-3 text-3xl font-black text-[var(--text)] sm:text-4xl">{t.about.title}</h2>
                                    <p className="mt-6 max-w-2xl text-base leading-7 !text-[var(--text)] dark:!text-[var(--muted)]">{t.about.p1}</p>
                                    <p className="mt-4 max-w-2xl text-base leading-7 !text-[var(--text)] dark:!text-[var(--muted)]">{t.about.p2}</p>
                                </div>
                                <div className="flex justify-center lg:justify-end">
                                    <div className="overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-3 shadow-soft-ring w-full max-w-sm">
                                        <img
                                            src="/images/profile.jpg"
                                            alt="Irfan Hariyanto"
                                            className="aspect-[4/5] w-full rounded-[22px] object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        </GlowCard>
                    </div>

                    <div className="mt-16 scroll-mt-24">
                        <GlowCard className="overflow-hidden rounded-[36px] border border-[var(--border)] bg-[var(--panel)] p-8 shadow-soft-ring sm:p-10">
                            <div className="relative">
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                                    <div>
                                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--accent-strong)]">{t.education.small}</p>
                                        <h2 className="mt-2 text-3xl font-black text-[var(--text)] sm:text-4xl">{t.education.title}</h2>
                                    </div>
                                    <div className="rounded-full border border-[var(--border)] bg-[var(--panel)]/80 px-4 py-2 text-sm font-medium text-[var(--muted)]">
                                        {t.education.badge}
                                    </div>
                                </div>
                                <div className="mt-8 space-y-4">
                                    {educationTimeline[lang].map((item, index) => (
                                        <motion.div key={item.school} whileHover={{ scale: 1.03, y: -4 }} transition={{ duration: 0.12 }} className="group relative overflow-hidden rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[0_10px_30px_rgba(0,0,0,0.06)] sm:p-5">
                                            <div className="absolute inset-y-0 left-0 w-1.5 bg-[var(--accent)]" />
                                            <div className="flex items-start gap-4">
                                                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-bold text-[var(--text)] shadow-lg">
                                                    {index + 1}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-base font-semibold !text-[#111111] dark:!text-[var(--text)]">{item.school}</p>
                                                    <p className="mt-1 text-sm !text-[#4b5563] dark:!text-[var(--muted)]">{item.period}</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </GlowCard>
                    </div>

                    <section id="skills" className="mt-16 scroll-mt-24">
                        <div className="">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--accent-strong)]">{t.skillsHeading?.small}</p>
                                    <h2 className="mt-2 text-3xl font-black text-[var(--text)] sm:text-4xl">{t.skillsHeading?.title}</h2>
                                </div>
                                <div className="flex flex-wrap items-center gap-3">
                                    {t.skills?.map((s: any) => {
                                        const themeMode = resolvedTheme ?? 'dark';
                                        const iconPath = themeMode === 'dark' ? s.iconDark : s.iconLight;
                                        return (
                                            <SkillBadge key={s.key} label={s.label}>
                                                <img src={iconPath} alt={s.label} className="h-5 w-5 object-contain" />
                                            </SkillBadge>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </section>
                    <span id="project" className="block scroll-mt-24" />
                    <section id="projects" className="mt-16 scroll-mt-24">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--accent-strong)]">{t.projectsHeading.small}</p>
                                <h2 className="mt-2 text-3xl font-black text-[var(--text)] sm:text-4xl">{t.projectsHeading.title}</h2>
                            </div>
                        </div>
                        <div className="mt-8 grid gap-6 md:grid-cols-2">
                            {previewProjects.map((project, index) => (
                                <motion.div key={project.repo} whileHover={{ scale: 1.05, y: -4 }} whileTap={{ scale: 0.995 }} transition={{ duration: 0.12 }} className="group relative overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--panel)] p-5 shadow-soft-ring">
                                    <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
                                        <div className="rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-3">
                                            {project.previewImage ? (
                                                <img src={project.previewImage} alt={`${project[lang].name} preview`} className="aspect-[16/9] w-full rounded-[20px] object-cover" />
                                            ) : (
                                                <div className="aspect-[16/9] rounded-[20px] bg-[#191919] dark:bg-[#101214] flex items-center justify-center px-4 text-center text-[10px] uppercase tracking-[0.32em] text-[var(--muted)]">{lang === 'en' ? 'Preview unavailable' : 'Preview tidak tersedia'}</div>
                                            )}
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex flex-wrap items-center justify-between gap-3">
                                                <span className="text-[10px] uppercase tracking-[0.32em] text-[var(--accent-strong)]">{project[lang].category}</span>
                                                <a href={project.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-[11px] font-semibold text-[var(--text)]">Repository <ExternalLink size={14} /></a>
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-semibold text-[var(--text)]">{project[lang].name}</h3>
                                                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{project[lang].description}</p>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {project[lang].tags.map((tag) => (
                                                    <span key={tag} className="rounded-full border border-[var(--border)] bg-[var(--panel)] px-2.5 py-1 text-[11px] font-semibold text-[var(--text)]">{tag}</span>
                                                ))}
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {project[lang].badges.map((badge) => (
                                                    <span key={badge} className="rounded-full border border-[var(--border)] bg-[rgba(255,255,255,0.06)] px-2.5 py-1 text-[11px] text-[var(--muted)]">{badge}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        {
                            projects.length > previewProjects.length && (
                                <div className="mt-8 flex justify-center">
                                    <a href="/projects" className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--text)] transition hover:bg-[#c7954f]">
                                        {t.projectsHeading.viewAll} <ArrowRight size={18} />
                                    </a>
                                </div>
                            )
                        }
                    </section>

                    <div className="mt-16 scroll-mt-24">
                        <GlowCard id="contact" className="rounded-[32px] border border-[var(--border)] bg-[var(--panel)] p-10 shadow-soft-ring">
                            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--accent-strong)]">{t.contact.small}</p>
                                    <h2 className="mt-3 text-3xl font-black text-[var(--text)] sm:text-4xl">{t.contact.title}</h2>
                                    <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--muted)]">{t.contact.title}</p>
                                    <div className="mt-8 flex flex-wrap gap-4">
                                        <a href="mailto:irfanhrynto@gmail.com" className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--text)] transition hover:bg-[#c7954f]">{t.contact.emailCTA} <ArrowRight size={18} /></a>
                                    </div>
                                </div>
                                <div className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-6">
                                    <div className="mb-4 flex items-center gap-2">
                                        <span className="h-2.5 w-2.5 rounded-full bg-[#cd8d34]" />
                                        <span className="h-2.5 w-2.5 rounded-full bg-[#b47a2a]" />
                                        <span className="h-2.5 w-2.5 rounded-full bg-[#8b5e2d]" />
                                    </div>
                                    <div className="space-y-3 text-sm text-[var(--muted)]">
                                        <p className="flex items-center gap-3">
                                            <Mail size={14} />
                                            <a href="mailto:irfanhrynto@gmail.com" className="hover:underline" rel="noopener noreferrer">irfanhrynto@gmail.com</a>
                                        </p>
                                        <p className="flex items-center gap-3">
                                            <Instagram size={14} />
                                            <a href="https://instagram.com/irfvnny" target="_blank" className="hover:underline" rel="noopener noreferrer">@irfvnny</a>
                                        </p>
                                        <p className="flex items-center gap-3">
                                            <MessageCircle size={14} />
                                            <a href="https://wa.me/628988898838" target="_blank" className="hover:underline" rel="noopener noreferrer">+62 898-8898-838</a>
                                        </p>
                                        <p className="flex items-center gap-3">
                                            <Github size={14} />
                                            <a href="https://github.com/rtwone" target="_blank" className="hover:underline" rel="noopener noreferrer">@rtwone</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </GlowCard>
                    </div>

                    <div className="mt-16 mb-8">
                        <GlowCard className="rounded-[28px] border border-[var(--border)] bg-[var(--panel)] px-6 py-8 text-[var(--muted)] shadow-soft-ring">
                            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                                <div>
                                    <p className="text-xl font-semibold text-[var(--text)]">Portofolio Irfan Hariyanto</p>
                                    <p className="mt-2 text-sm">{t.footer.text}</p>
                                </div>
                                <div className="flex flex-wrap gap-4 text-sm">
                                    <a href="#home" className="transition hover:text-[var(--accent-strong)]">{t.nav.home}</a>
                                    <a href="#about" className="transition hover:text-[var(--accent-strong)]">{t.nav.about}</a>
                                    <a href="#projects" className="transition hover:text-[var(--accent-strong)]">{t.nav.projects}</a>
                                    <a href="#contact" className="transition hover:text-[var(--accent-strong)]">{t.nav.contact}</a>
                                </div>
                            </div>
                            <div className="mt-6 flex items-center justify-between border-t border-[#e8dbc4] pt-6 text-sm">
                                <p>{t.footer.copyright}</p>
                                <a href="#home" className="inline-flex items-center gap-2 text-[var(--text)] hover:text-[var(--accent-strong)]">{t.footer.backToTop}</a>
                            </div>
                        </GlowCard>
                    </div>
                </div >
            </div >
        </main >
    );
}
