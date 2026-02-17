'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    CheckSquare,
    User,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Settings,
    BarChart3,
    Zap,
    Sun,
    Moon,
    X,
    Menu,
    Home // Import Home icon
} from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface SidebarProps {
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
    mobileOpen: boolean;
    setMobileOpen: (open: boolean) => void;
}

export default function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }: SidebarProps) {
    const pathname = usePathname();
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    if (!user) return null;

    const navItems = [
        { label: 'Home', href: 'https://taskflow-delta.vercel.app/', icon: Home, external: true }, // Add Home Link
        { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { label: 'Tasks', href: '/dashboard?view=tasks', icon: CheckSquare },
        { label: 'Analytics', href: '#', icon: BarChart3, onClick: () => toast.info('Analytics coming soon!') },
        { label: 'Profile', href: '/profile', icon: User },
        { label: 'Settings', href: '#', icon: Settings, onClick: () => toast.info('Settings coming soon!') },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden animate-in fade-in"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            <aside
                className={cn(
                    'fixed left-0 top-0 h-screen bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-r border-slate-200 dark:border-slate-800 z-50 transition-all duration-500 ease-in-out',
                    collapsed ? 'w-20' : 'w-64',
                    // Mobile styles
                    'md:translate-x-0', // Always show on desktop
                    mobileOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0' // Slide in on mobile
                )}
            >
                {/* Logo Area */}
                <div className="flex items-center justify-between h-20 px-6 border-b border-slate-100 dark:border-slate-900">
                    {!collapsed || mobileOpen ? (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-2"
                        >
                            <Link href="https://taskflow-delta.vercel.app/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                                    <Zap size={18} className="text-white fill-current" />
                                </div>
                                <span className="text-xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
                                    TaskFlow
                                </span>
                            </Link>
                        </motion.div>
                    ) : (
                        <Link href="https://taskflow-delta.vercel.app/" className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center mx-auto hover:opacity-80 transition-opacity">
                            <Zap size={20} className="text-white fill-current" />
                        </Link>
                    )}

                    {!collapsed && (
                        <button
                            onClick={() => setCollapsed(!collapsed)}
                            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all hidden md:block"
                        >
                            <ChevronLeft size={20} />
                        </button>
                    )}

                    {/* Mobile Close Button */}
                    <button
                        onClick={() => setMobileOpen(false)}
                        className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all md:hidden"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-2 mt-4">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;

                        // If it has an onClick, render as button (or link that prevents default)
                        if (item.onClick) {
                            return (
                                <button
                                    key={item.label}
                                    onClick={() => {
                                        item.onClick?.();
                                        setMobileOpen(false);
                                    }}
                                    className={cn(
                                        'flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 group relative w-full text-left',
                                        'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-900/50'
                                    )}
                                >
                                    <Icon
                                        size={20}
                                        className="transition-transform duration-300 group-hover:scale-110"
                                    />
                                    {(!collapsed || mobileOpen) && (
                                        <span className="text-sm font-semibold tracking-tight">{item.label}</span>
                                    )}
                                    {(!collapsed || mobileOpen) && (
                                        <span className="ml-auto text-[9px] font-bold uppercase tracking-widest bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-400">Soon</span>
                                    )}
                                </button>
                            );
                        }

                        // External Link for Home
                        if (item.external) {
                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    onClick={() => setMobileOpen(false)}
                                    className={cn(
                                        'flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 group relative',
                                        // Highlight if exactly matching current URL (unlikely for external) or manually if needed
                                        'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-900/50'
                                    )}
                                >
                                    <Icon
                                        size={20}
                                        className="transition-transform duration-300 group-hover:scale-110"
                                    />
                                    {(!collapsed || mobileOpen) && (
                                        <span className="text-sm font-semibold tracking-tight">{item.label}</span>
                                    )}
                                </Link>
                            );
                        }

                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className={cn(
                                    'flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 group relative',
                                    isActive
                                        ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-xl shadow-blue-200 dark:shadow-none'
                                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-900/50'
                                )}
                            >
                                <Icon
                                    size={20}
                                    className={cn(
                                        'transition-transform duration-300 group-hover:scale-110',
                                        isActive && 'scale-110'
                                    )}
                                />
                                {(!collapsed || mobileOpen) && (
                                    <span className="text-sm font-semibold tracking-tight">{item.label}</span>
                                )}
                                {isActive && (
                                    <motion.div
                                        layoutId="active-pill"
                                        className="absolute -left-1 w-1 h-6 bg-blue-600 dark:bg-blue-400 rounded-full"
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Area Footer */}
                <div className="absolute bottom-6 left-4 right-4 space-y-2">
                    <div className={cn(
                        'flex flex-col gap-2 p-3 rounded-2xl bg-slate-50/50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800/50 transition-all duration-500',
                        collapsed && !mobileOpen ? 'items-center p-2' : ''
                    )}>
                        <div className="flex items-center gap-3 w-full">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-slate-100 to-slate-300 dark:from-slate-800 dark:to-slate-700 flex-shrink-0 flex items-center justify-center font-bold text-sm shadow-sm text-slate-900 dark:text-slate-100">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            {(!collapsed || mobileOpen) && (
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold truncate text-slate-900 dark:text-slate-100 leading-none">{user.name}</p>
                                    <p className="text-[10px] text-slate-500 truncate mt-1 font-medium italic">{user.email}</p>
                                </div>
                            )}
                            {(!collapsed || mobileOpen) && (
                                <button
                                    onClick={(e) => toggleTheme(e)}
                                    className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all"
                                >
                                    <motion.div
                                        key={theme}
                                        initial={{ rotate: -180, scale: 0.8, opacity: 0 }}
                                        animate={{ rotate: 0, scale: 1.1, opacity: 1 }}
                                        exit={{ rotate: 180, scale: 0.8, opacity: 0 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                    >
                                        {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                                    </motion.div>
                                </button>
                            )}
                        </div>
                        {collapsed && !mobileOpen && (
                            <button
                                onClick={(e) => toggleTheme(e)}
                                className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all mt-1"
                            >
                                <motion.div
                                    key={theme}
                                    initial={{ rotate: -180, scale: 0.8, opacity: 0 }}
                                    animate={{ rotate: 0, scale: 1.1, opacity: 1 }}
                                    exit={{ rotate: 180, scale: 0.8, opacity: 0 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                >
                                    {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                                </motion.div>
                            </button>
                        )}
                    </div>

                    <button
                        onClick={logout}
                        className={cn(
                            'flex items-center gap-4 px-4 py-3 w-full rounded-2xl text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-300',
                            collapsed && !mobileOpen ? 'justify-center' : ''
                        )}
                    >
                        <LogOut size={20} />
                        {(!collapsed || mobileOpen) && <span className="text-sm font-bold">Sign out</span>}
                    </button>
                </div>

                {/* Expand toggle for collapsed mode (Desktop Only) */}
                {collapsed && !mobileOpen && (
                    <button
                        onClick={() => setCollapsed(false)}
                        className="absolute top-6 right-[-12px] w-6 h-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full items-center justify-center text-slate-400 hover:text-slate-900 dark:hover:text-white shadow-sm transition-all hidden md:flex"
                    >
                        <ChevronRight size={14} />
                    </button>
                )}
            </aside>
        </>
    );
}
