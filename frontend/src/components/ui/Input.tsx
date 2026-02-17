import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, icon, className, ...props }, ref) => {
        return (
            <div className="space-y-1.5 w-full">
                {label && (
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 ml-1">
                        {label}
                    </label>
                )}
                <div className="relative group">
                    {icon && (
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-zinc-900 dark:group-focus-within:text-white transition-colors">
                            {icon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        className={cn(
                            'w-full bg-zinc-100/50 dark:bg-zinc-800/30 border-none rounded-2xl py-3 px-4 text-foreground placeholder:text-zinc-400 transition-all duration-300 ring-1 ring-transparent group-focus-within:ring-zinc-900/10 dark:group-focus-within:ring-white/10 group-focus-within:bg-white dark:group-focus-within:bg-zinc-900 outline-none shadow-sm group-focus-within:shadow-md',
                            icon && 'pl-11',
                            error && 'ring-red-500/50 bg-red-50/10',
                            className
                        )}
                        {...props}
                    />
                </div>
                {error && <span className="text-[10px] font-semibold text-red-500 ml-1">{error}</span>}
            </div>
        );
    }
);

Input.displayName = 'Input';
