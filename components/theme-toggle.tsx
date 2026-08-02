"use client";

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-full border border-[var(--border)] bg-[var(--panel)]/80 p-2.5 shadow-lg backdrop-blur-sm text-[var(--text)]"
            aria-label="Toggle theme"
        >
            {mounted ? (
                theme === 'dark' ? (
                    <Moon className="h-5 w-5" />
                ) : (
                    <Sun className="h-5 w-5" />
                )
            ) : (
                <Sun className="h-5 w-5" />
            )}
        </motion.button>
    );
}
