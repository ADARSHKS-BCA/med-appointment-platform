'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export default function PatientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();

    return (
        <div className="flex h-screen bg-slate-50">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/30 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-200 ease-in-out
                md:relative md:translate-x-0
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="p-6 flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold text-blue-600">
                        MediConnect
                    </Link>
                    <button
                        className="md:hidden p-1 text-slate-400 hover:text-slate-600"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <nav className="p-4 space-y-2">
                    <Link
                        href="/patient/dashboard"
                        className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg"
                        onClick={() => setSidebarOpen(false)}
                    >
                        Dashboard
                    </Link>
                    <Link
                        href="/patient/appointments"
                        className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg"
                        onClick={() => setSidebarOpen(false)}
                    >
                        My Appointments
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto min-w-0">
                <header className="h-16 bg-white border-b flex items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3">
                        <button
                            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-md"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu className="h-5 w-5" />
                        </button>
                        <h1 className="text-lg sm:text-xl font-semibold">Patient Portal</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        {/* User Dropdown Placeholder */}
                        <div className="w-8 h-8 bg-blue-100 rounded-full"></div>
                    </div>
                </header>
                <div className="p-4 sm:p-6 lg:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
