'use client';

import React, { useState, useEffect } from 'react';
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { AuthProvider, useAuth } from '../context/AuthContext';
import { ThemeProvider } from '../context/ThemeContext';
import Sidebar from '../components/Sidebar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import ProtectedRoute from '../components/ProtectedRoute';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

function AppContent({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const isPublicPage = pathname === '/' || pathname === '/login' || pathname === '/register';

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-12 h-12 border-4 border-slate-800 border-t-sky-500 rounded-full animate-spin" />
          <span className="text-slate-500 font-bold uppercase tracking-widest text-xs">Initializing TaskFlow</span>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 font-sans selection:bg-sky-500 selection:text-white dark:selection:bg-sky-900 dark:selection:text-sky-50">
      {!isPublicPage && user && <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />}
      <main className={`flex-1 transition-all duration-500 ease-in-out ${!isPublicPage && user ? (collapsed ? 'lg:pl-20' : 'lg:pl-64') : ''}`}>
        <div className={!isPublicPage && user ? "container p-6 md:p-10 max-w-7xl mx-auto min-h-screen" : "min-h-screen bg-white dark:bg-slate-950"}>
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <ProtectedRoute>
                {children}
              </ProtectedRoute>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} antialiased font-sans transition-colors duration-300`}>
        <ThemeProvider>
          <AuthProvider>
            <AppContent>{children}</AppContent>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
              toastClassName="rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-xl shadow-2xl"
            />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
