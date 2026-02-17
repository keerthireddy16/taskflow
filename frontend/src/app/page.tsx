'use client';

import React from 'react';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';
import {
    ArrowRight,
    ShieldCheck,
    Zap,
    Layers,
    CheckCircle2,
    Github,
    Twitter,
    Menu,
    ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { motion } from 'framer-motion';

export default function LandingPage() {
    const { user } = useAuth();
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-900 overflow-hidden">
            {/* Nav */}
            <nav className="fixed top-0 inset-x-0 z-50 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl border-b border-zinc-200/50 dark:border-zinc-800/50 h-20 flex items-center">
                <div className="container max-w-7xl mx-auto px-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-9 h-9 bg-zinc-900 dark:bg-white rounded-xl flex items-center justify-center">
                            <Zap size={20} className="text-white dark:text-zinc-900 fill-current" />
                        </div>
                        <span className="text-xl font-display font-bold text-zinc-900 dark:text-white tracking-tighter">TaskFlow</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        {['Features', 'Pricing', 'Resources', 'About'].map((item) => (
                            <a key={item} href="#" className="text-sm font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">{item}</a>
                        ))}
                    </div>

                    <div className="flex items-center gap-3">
                        {user ? (
                            <Link href="/dashboard">
                                <Button className="rounded-xl px-6 font-bold shadow-xl shadow-zinc-950/10">
                                    Go to Dashboard
                                </Button>
                            </Link>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button variant="ghost" className="hidden sm:inline-flex rounded-xl font-bold">Log in</Button>
                                </Link>
                                <Link href="/register">
                                    <Button className="rounded-xl px-6 font-bold shadow-xl shadow-zinc-950/10">Get Started</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="relative pt-40 pb-20 md:pt-60 md:pb-40 px-6">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-gradient-to-b from-zinc-200/20 to-transparent dark:from-zinc-800/20 blur-[120px] rounded-full pointer-events-none" />

                <div className="container max-w-5xl mx-auto text-center relative z-10 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 rounded-full text-[10px] font-bold uppercase tracking-widest text-zinc-500"
                    >
                        <span className="flex w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-white animate-pulse" />
                        Next-Gen Productivity is dynamic
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-6xl md:text-8xl font-display font-bold text-zinc-900 dark:text-white tracking-tighter leading-[0.9]"
                    >
                        Manage projects with <span className="text-zinc-400">absolute precision.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed font-medium"
                    >
                        TaskFlow brings teams together in a powerful, hyper-fast environment.
                        Built for those who value speed, security, and elite design.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
                    >
                        <Link href="/register" className="w-full sm:w-auto">
                            <Button size="lg" className="w-full sm:w-auto px-10 rounded-2xl h-14 text-lg font-bold shadow-2xl shadow-zinc-950/20 dark:shadow-none" icon={<ArrowRight size={20} />}>
                                Start Building
                            </Button>
                        </Link>
                        <Button size="lg" variant="secondary" className="w-full sm:w-auto px-10 rounded-2xl h-14 text-lg font-bold">
                            View Showcase
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Features */}
            <section className="py-32 border-t border-zinc-200/50 dark:border-zinc-800/50 px-6 relative">
                <div className="container max-w-7xl mx-auto space-y-20">
                    <div className="text-center max-w-2xl mx-auto space-y-4">
                        <h2 className="text-4xl font-display font-bold text-zinc-900 dark:text-white tracking-tight">The ultimate toolkit.</h2>
                        <p className="text-zinc-500 font-medium">Engineered for performance and scalability, from individual tasks to enterprise projects.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: 'End-to-End Security', icon: ShieldCheck, desc: 'Advanced protection with HttpOnly JWT, encrypted storage, and robust OTP flows.', color: 'emerald' },
                            { title: 'Blazing Fast Performance', icon: Zap, desc: 'Optimized Next.js architecture ensuring sub-100ms response times for all core actions.', color: 'blue' },
                            { title: 'Scalable Architecture', icon: Layers, desc: 'Built with micro-service patterns in mind, ready to handle thousands of concurrent users.', color: 'indigo' },
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Card className="p-10 text-center space-y-6 hover:shadow-2xl transition-all duration-500 border-none ring-1 ring-zinc-200 dark:ring-zinc-800">
                                    <div className={`w-16 h-16 rounded-[2rem] bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex items-center justify-center mx-auto transition-transform group-hover:scale-110 duration-500`}>
                                        <feature.icon className="text-zinc-900 dark:text-white" size={30} />
                                    </div>
                                    <h3 className="text-xl font-display font-bold text-zinc-900 dark:text-white tracking-tight">{feature.title}</h3>
                                    <p className="text-zinc-500 font-medium leading-relaxed">{feature.desc}</p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-zinc-200/50 dark:border-zinc-800/50 px-6">
                <div className="container max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-2">
                        <Zap size={18} className="text-zinc-900 dark:text-white fill-current" />
                        <span className="text-lg font-display font-bold tracking-tighter">TaskFlow</span>
                    </div>

                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                        &copy; 2026 TaskFlow Inc. Refined for Excellence.
                    </p>

                    <div className="flex items-center gap-6 text-zinc-400">
                        <Github size={20} className="hover:text-zinc-900 dark:hover:text-white cursor-pointer transition-colors" />
                        <Twitter size={20} className="hover:text-zinc-900 dark:hover:text-white cursor-pointer transition-colors" />
                    </div>
                </div>
            </footer>
        </div>
    );
}
