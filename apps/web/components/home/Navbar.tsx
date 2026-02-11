'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Stethoscope } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
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

                {/* Mobile Menu Toggle (Placeholder) */}
                <button className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-md">
                    <span className="sr-only">Open menu</span>
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                </button>
            </div>
        </header>
    );
}
