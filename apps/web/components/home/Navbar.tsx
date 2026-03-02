'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Stethoscope, X, Menu, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => { setIsOpen(false); }, [pathname]);

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled || isOpen
                    ? 'glass shadow-lg shadow-indigo-500/5 py-3'
                    : 'bg-transparent py-5'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2.5 group">
                    <div className="relative">
                        <div className="bg-gradient-to-br from-indigo-600 to-cyan-500 text-white p-2 rounded-xl group-hover:scale-110 transition-all duration-300 shadow-lg shadow-indigo-500/30">
                            <Stethoscope className="h-5 w-5" />
                        </div>
                        <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white animate-pulse" />
                    </div>
                    <span className="text-xl font-bold text-gradient">
                        MediConnect
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-1">
                    <Link href="/#how-it-works" className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 rounded-lg hover:bg-indigo-50/50 transition-all duration-200">
                        How it Works
                    </Link>
                    <Link href="/#why" className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 rounded-lg hover:bg-indigo-50/50 transition-all duration-200">
                        Why Us
                    </Link>
                    <Link href="/login" className="px-4 py-2 text-sm font-medium text-slate-900 hover:text-indigo-600 rounded-lg hover:bg-indigo-50/50 transition-all duration-200">
                        Log In
                    </Link>
                    <div className="flex items-center gap-2.5 pl-4 ml-2 border-l border-slate-200/60">
                        <Button asChild size="sm" variant="ghost" className="text-slate-600 hover:text-indigo-600 hover:bg-indigo-50">
                            <Link href="/register?role=DOCTOR">
                                <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                                For Doctors
                            </Link>
                        </Button>
                        <Button asChild size="sm" className="bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white shadow-lg shadow-indigo-500/25 rounded-xl px-5 font-semibold">
                            <Link href="/doctors">
                                Book Now
                            </Link>
                        </Button>
                    </div>
                </nav>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden p-2 text-slate-600 hover:bg-slate-100/80 rounded-xl transition-colors"
                    onClick={() => setIsOpen(prev => !prev)}
                >
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden transition-all duration-300 ${isOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <nav className="px-4 pt-4 pb-6 space-y-1 glass border-t border-white/20 mx-4 mt-3 rounded-2xl">
                    <Link href="/#how-it-works" className="block px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50 rounded-xl transition-colors">
                        How it Works
                    </Link>
                    <Link href="/login" className="block px-4 py-2.5 text-sm font-medium text-slate-900 hover:text-indigo-600 hover:bg-indigo-50/50 rounded-xl transition-colors">
                        Log In
                    </Link>
                    <Link href="/register?role=DOCTOR" className="block px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50 rounded-xl transition-colors">
                        For Doctors
                    </Link>
                    <div className="pt-2 px-1">
                        <Button asChild size="sm" className="w-full bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-lg shadow-indigo-500/25 rounded-xl h-11 font-semibold">
                            <Link href="/doctors">Book Now</Link>
                        </Button>
                    </div>
                </nav>
            </div>
        </header>
    );
}
