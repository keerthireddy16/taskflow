'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: (e?: React.MouseEvent) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<Theme>('dark');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as Theme | null;
        if (savedTheme) {
            setTheme(savedTheme);
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
        }
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme, mounted]);

    const toggleTheme = (e?: React.MouseEvent) => {
        const newTheme = theme === 'light' ? 'dark' : 'light';

        // Custom Request: Use CSS "Fallback" Transition (Fade) for Dark -> Light
        if (newTheme === 'light') {
            setTheme('light');
            return;
        }

        // @ts-ignore
        if (!document.startViewTransition || !e) {
            setTheme(newTheme);
            return;
        }

        const x = e.clientX;
        const y = e.clientY;
        const endRadius = Math.hypot(
            Math.max(x, innerWidth - x),
            Math.max(y, innerHeight - y)
        );

        // @ts-ignore
        const transition = document.startViewTransition(() => {
            setTheme(newTheme);
        });

        transition.ready.then(() => {
            const clipPath = [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`,
            ];

            // "Curtain Reveal" Effect Logic:
            // Entering Dark: Premium Circular Expand (Sunrise/Eclipse style)
            // Leaving Dark: "Curtain Up" Wipe (Darkness lifts up to reveal light)
            const isEnteringDark = newTheme === 'dark';

            // Define different clipPaths for the two states
            const startClip = isEnteringDark
                ? `circle(0px at ${x}px ${y}px)`
                : 'inset(0 0 0 0)'; // Full coverage (Dark is on top)

            const endClip = isEnteringDark
                ? `circle(${endRadius}px at ${x}px ${y}px)`
                : 'inset(0 0 100% 0)'; // Wipe from bottom up (Dark lifts away)

            document.documentElement.animate(
                {
                    clipPath: [startClip, endClip],
                },
                {
                    duration: 1000,
                    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
                    pseudoElement: isEnteringDark
                        ? '::view-transition-new(root)'
                        : '::view-transition-old(root)',
                }
            );
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
