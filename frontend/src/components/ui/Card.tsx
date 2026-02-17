import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
    glass?: boolean;
}

export const Card = ({ children, className, hover = false, glass = true }: CardProps) => {
    return (
        <div className={cn(
            'rounded-3xl border border-zinc-200 dark:border-zinc-800 transition-all duration-300',
            glass ? 'bg-white/80 dark:bg-zinc-900/50 backdrop-blur-xl' : 'bg-white dark:bg-zinc-900',
            hover && 'hover:shadow-lg hover:shadow-zinc-200/50 dark:hover:shadow-zinc-950/50 hover:border-zinc-300 dark:hover:border-zinc-700',
            className
        )}>
            {children}
        </div>
    );
};
