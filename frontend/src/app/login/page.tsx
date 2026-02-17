'use client';

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Mail, Lock, LogIn, ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LoginPage() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await login(email, password);
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-[500px]"
            >
                <div className="text-center mb-10 space-y-3">
                    <Link href="/" className="inline-block w-14 h-14 bg-zinc-900 dark:bg-white rounded-2xl flex items-center justify-center mx-auto shadow-2xl shadow-zinc-200 dark:shadow-none hover:scale-105 transition-transform cursor-pointer">
                        <Zap size={28} className="text-white dark:text-zinc-900 fill-current" />
                    </Link>
                    <h1 className="text-3xl font-display font-bold text-zinc-900 dark:text-white mt-4">Welcome back</h1>
                    <p className="text-zinc-500 font-medium">Please enter your credentials to access your account.</p>
                </div>

                <Card className="p-8 shadow-2xl shadow-zinc-200 dark:shadow-none border-none ring-1 ring-zinc-200 dark:ring-zinc-800">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="name@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            icon={<Mail size={18} />}
                            required
                        />
                        <div className="space-y-1">
                            <Input
                                label="Password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                icon={<Lock size={18} />}
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-12 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-base shadow-xl hover:shadow-zinc-200 dark:hover:shadow-none"
                            loading={loading}
                            icon={<LogIn size={18} />}
                        >
                            Sign In
                        </Button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-zinc-100 dark:border-zinc-800 text-center">
                        <p className="text-sm text-zinc-500 font-medium">
                            Don't have an account?{' '}
                            <Link
                                href="/register"
                                className="text-zinc-900 dark:text-white font-bold hover:underline underline-offset-4 decoration-zinc-300 dark:decoration-zinc-700 decoration-2 transition-all"
                            >
                                Create an account
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
