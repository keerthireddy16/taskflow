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

import { Menu, Zap } from 'lucide-react'; // Import Menu Icon and Zap

function AppContent({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false); // Mobile State
  const pathname = usePathname();

  const isPublicPage = pathname === '/' || pathname === '/login' || pathname === '/register';
  const hideSidebar = isPublicPage;

  const [showSlowLoadingMessage, setShowSlowLoadingMessage] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (loading) {
      timer = setTimeout(() => setShowSlowLoadingMessage(true), 3000);
    }
    return () => clearTimeout(timer);
  }, [loading]);

  // Create a more robust check for protected routes
  const isProtectedRoute = pathname?.startsWith('/dashboard') || pathname?.startsWith('/profile');

  // We only want to block rendering with the global spinner if the user is trying to access
  // a protected route while we don't know their auth status yet.
  // This ensures Public pages (/, /login, /register) and 404s load INSTANTLY.
  if (loading && isProtectedRoute) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4 text-center px-4"
        >
          <div className="w-12 h-12 border-4 border-slate-800 border-t-blue-600 rounded-full animate-spin" />
          <span className="text-slate-500 font-bold uppercase tracking-widest text-xs">
            {showSlowLoadingMessage ? "Server is waking up. Please refresh the page if this persists." : "Initializing TaskFlow"}
          </span>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 font-sans selection:bg-blue-500 selection:text-white dark:selection:bg-blue-900 dark:selection:text-blue-50">
      {!isPublicPage && user && (
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
      )}

      <main className={`flex-1 transition-all duration-500 ease-in-out ${!hideSidebar && user ? (collapsed ? 'lg:pl-20' : 'lg:pl-64') : ''}`}>

        {/* Mobile Header (Only visible on small screens when logged in) */}
        {!hideSidebar && user && (
          <div className="md:hidden h-16 flex items-center justify-between px-6 border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 backdrop-blur-xl sticky top-0 z-30">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <Zap size={18} className="text-white fill-current" />
              </div>
              <span className="text-lg font-display font-bold text-slate-900 dark:text-white tracking-tight">TaskFlow</span>
            </div>
            <button onClick={() => setMobileOpen(true)} className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white">
              <Menu size={24} />
            </button>
          </div>
        )}

        <div className={!hideSidebar && user ? "container p-4 md:p-10 max-w-7xl mx-auto min-h-[calc(100vh-4rem)] md:min-h-screen" : "min-h-screen bg-white dark:bg-slate-950"}>
          <ProtectedRoute>
            {children}
          </ProtectedRoute>
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
