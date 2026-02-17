'use client';

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { User, Mail, Shield, Save, ArrowLeft, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

export default function ProfilePage() {
    const { user, updateProfile } = useAuth();
    const router = useRouter();
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return toast.error('Passwords do not match');
        }

        setLoading(true);
        const updateData: any = { name, email };
        if (password) updateData.password = password;

        await updateProfile(updateData);
        setPassword('');
        setConfirmPassword('');
        setLoading(false);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors mb-4 group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-bold uppercase tracking-wider">Back to Dashboard</span>
                    </button>
                    <h1 className="text-4xl font-display font-bold text-zinc-900 dark:text-white">Profile Settings</h1>
                    <p className="text-zinc-500 font-medium">Manage your personal information and security preferences.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Profile Overview Card */}
                <Card className="p-8 flex flex-col items-center text-center space-y-6 md:col-span-1">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-3xl bg-zinc-900 dark:bg-white flex items-center justify-center text-3xl font-bold text-white dark:text-zinc-900 shadow-2xl">
                            {user?.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-xl bg-emerald-500 border-4 border-white dark:border-zinc-900 flex items-center justify-center text-white">
                            <Shield size={14} fill="currentColor" />
                        </div>
                    </div>
                    <div>
                        <h2 className="text-xl font-display font-bold text-zinc-900 dark:text-white">{user?.name}</h2>
                        <p className="text-sm text-zinc-500 font-medium">{user?.email}</p>
                    </div>
                    <div className="w-full pt-6 border-t border-zinc-100 dark:border-zinc-800 space-y-3">
                        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-zinc-400">
                            <span>Status</span>
                            <span className="text-emerald-500">Active</span>
                        </div>
                        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-zinc-400">
                            <span>Member Since</span>
                            <span className="text-zinc-600 dark:text-zinc-300">Feb 2026</span>
                        </div>
                    </div>
                </Card>

                {/* Edit Form Card */}
                <Card className="p-8 md:col-span-2">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                icon={<User size={18} />}
                                placeholder="Your full name"
                                required
                            />
                            <Input
                                label="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                icon={<Mail size={18} />}
                                placeholder="your@email.com"
                                type="email"
                                required
                            />
                            <Input
                                label="New Password (optional)"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                icon={<Shield size={18} />}
                                placeholder="••••••••"
                                type="password"
                            />
                            <Input
                                label="Confirm New Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                icon={<Shield size={18} />}
                                placeholder="••••••••"
                                type="password"
                            />
                        </div>

                        <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
                            <Button
                                type="submit"
                                loading={loading}
                                icon={<Save size={18} />}
                                className="px-8 rounded-2xl"
                            >
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
}
