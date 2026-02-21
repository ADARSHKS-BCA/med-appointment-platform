'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Stethoscope, X, Menu } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled || isOpen ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-blue-600 text-white p-1.5 rounded-lg group-hover:scale-110 transition-transform">
                        <Stethoscope className="h-5 w-5" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                        MediConnect
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/#how-it-works" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                        How it Works
                    </Link>
                    <Link href="/login" className="text-sm font-medium text-slate-900 hover:text-blue-600 transition-colors">
                        Log In
                    </Link>
                    <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                        <Button asChild size="sm" variant="ghost" className="text-slate-600 hover:text-blue-600 hover:bg-blue-50">
                            <Link href="/register?role=DOCTOR">
                                For Doctors
                            </Link>
                        </Button>
                        <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200/50">
                            <Link href="/doctors">
                                Book Now
                            </Link>
                        </Button>
                    </div>
                </nav>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-md"
                    onClick={() => setIsOpen(prev => !prev)}
                >
                    <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
                    {isOpen ? (
                        <X className="h-6 w-6" />
                    ) : (
                        <Menu className="h-6 w-6" />
                    )}
                </button>
            </div>

            {/* Mobile Menu Panel */}
            <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
                <nav className="px-4 pt-4 pb-6 space-y-3 bg-white/95 backdrop-blur-md border-t border-slate-100">
                    <Link
                        href="/#how-it-works"
                        className="block px-4 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors"
                    >
                        How it Works
                    </Link>
                    <Link
                        href="/login"
                        className="block px-4 py-2 text-sm font-medium text-slate-900 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors"
                    >
                        Log In
                    </Link>
                    <Link
                        href="/register?role=DOCTOR"
                        className="block px-4 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors"
                    >
                        For Doctors
                    </Link>
                    <div className="pt-2">
                        <Button asChild size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200/50">
                            <Link href="/doctors">
                                Book Now
                            </Link>
                        </Button>
                    </div>
                </nav>
            </div>
        </header>
    );
}
