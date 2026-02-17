'use client';

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Mail, Lock, User, UserPlus, Zap } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export default function RegisterPage() {
    const { register } = useAuth();
    const { theme, toggleTheme } = useTheme();

    // ... rest of state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const success = await register(name, email, password);
        if (!success) {
            setLoading(false);
        }
        // If success, router.push in AuthContext handles redirect, 
        // and we keep loading true to prevent UI flicker
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 relative">
            {/* Home Link */}
            <Link
                href="https://taskflow-delta.vercel.app/"
                className="absolute top-8 left-8 p-3 rounded-xl bg-white/50 dark:bg-black/20 hover:bg-white dark:hover:bg-black/40 backdrop-blur-md transition-all text-zinc-500 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 flex items-center gap-2 group"
            >
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Zap size={16} className="text-white fill-current" />
                </div>
                <span className="font-bold hidden sm:inline-block">Home</span>
            </Link>

            <button
                onClick={(e) => toggleTheme(e)}
                className="absolute top-8 right-8 p-3 rounded-xl bg-white/50 dark:bg-black/20 hover:bg-white dark:hover:bg-black/40 backdrop-blur-md transition-all text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            >
                <motion.div
                    key={theme}
                    initial={{ rotate: -180, scale: 0.8, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1.1, opacity: 1 }}
                    exit={{ rotate: 180, scale: 0.8, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </motion.div>
            </button>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-[500px]"
            >
                <div className="text-center mb-10 space-y-3">
                    <Link href="/" className="inline-block w-14 h-14 bg-zinc-900 dark:bg-white rounded-2xl flex items-center justify-center mx-auto shadow-2xl shadow-zinc-200 dark:shadow-none hover:scale-105 transition-transform cursor-pointer">
                        <Zap size={28} className="text-white dark:text-zinc-900 fill-current" />
                    </Link>
                    <h1 className="text-3xl font-display font-bold text-zinc-900 dark:text-white mt-4">Create account</h1>
                    <p className="text-zinc-500 font-medium">Start your productivity journey with TaskFlow.</p>
                </div>

                <Card className="p-8 shadow-2xl shadow-zinc-200 dark:shadow-none border-none ring-1 ring-zinc-200 dark:ring-zinc-800">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <Input
                            label="Full Name"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            icon={<User size={18} />}
                            required
                        />
                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="name@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            icon={<Mail size={18} />}
                            required
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            icon={<Lock size={18} />}
                            required
                        />

                        <Button
                            type="submit"
                            className="w-full h-12 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-base shadow-xl hover:shadow-zinc-200 dark:hover:shadow-none"
                            loading={loading}
                            icon={<UserPlus size={18} />}
                        >
                            Sign Up
                        </Button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-zinc-100 dark:border-zinc-800 text-center">
                        <p className="text-sm text-zinc-500 font-medium">
                            Already have an account?{' '}
                            <Link
                                href="/login"
                                className="text-zinc-900 dark:text-white font-bold hover:underline underline-offset-4 decoration-zinc-300 dark:decoration-zinc-700 decoration-2 transition-all"
                            >
                                Sign in instead
                            </Link>
                        </p>
                    </div>
                </Card>

                <p className="text-center mt-8 text-xs font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-[0.2em]">
                    TaskFlow &copy; 2026
                </p>
            </motion.div>
        </div>
    );
}
