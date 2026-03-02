'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Menu, X, Home, LayoutDashboard, Clock, UserCircle, Bell, Stethoscope
} from 'lucide-react';
import DoctorHeader from '@/components/doctor/DoctorHeader';
import { AlertsDrawer } from '@/components/doctor-dashboard/AlertsDrawer';
import { useAppointments } from '@/lib/use-appointments';

const navItems = [
    { href: '/doctor/home', label: 'Home', icon: Home },
    { href: '/doctor/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/doctor/availability', label: 'Availability', icon: Clock },
    { href: '/doctor/profile', label: 'Profile', icon: UserCircle },
];

export default function DoctorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [alertsOpen, setAlertsOpen] = useState(false);
    const pathname = usePathname();
    const { appointments, requested } = useAppointments();

    const alertCount = (() => {
        const now = new Date();
        return appointments.filter(a => {
            const d = new Date(a.startTime);
            return d.toDateString() === now.toDateString() &&
                (a.status === 'REQUESTED' || a.status === 'CONFIRMED');
        }).length;
    })();

    return (
        <div className="flex h-screen bg-slate-50">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-[260px] bg-white border-r border-slate-100 transform transition-transform duration-300 ease-out
                md:relative md:translate-x-0
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                {/* Logo */}
                <div className="h-16 flex items-center justify-between px-5 border-b border-slate-100">
                    <Link href="/" className="flex items-center gap-2.5">
                        <div className="bg-gradient-to-br from-indigo-600 to-cyan-500 text-white p-1.5 rounded-xl shadow-md shadow-indigo-500/20">
                            <Stethoscope className="h-4 w-4" />
                        </div>
                        <span className="text-lg font-bold text-gradient">MediConnect</span>
                    </Link>
                    <button
                        className="md:hidden p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="px-3 py-2 mt-2">
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest px-3 mb-2">Doctor Portal</p>
                </div>

                <nav className="px-3 space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href ||
                            (item.href !== '/doctor/home' && pathname.startsWith(item.href));
                        const IconComponent = item.icon;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`
                                    flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                                    ${isActive
                                        ? 'bg-gradient-to-r from-indigo-50 to-cyan-50 text-indigo-700 shadow-sm'
                                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                    }
                                `}
                                onClick={() => setSidebarOpen(false)}
                            >
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isActive ? 'bg-gradient-to-br from-indigo-500 to-cyan-500 text-white shadow-md shadow-indigo-500/25' : 'bg-slate-100 text-slate-400'
                                    }`}>
                                    <IconComponent className="w-4 h-4" />
                                </div>
                                {item.label}
                                {item.href === '/doctor/home' && requested.length > 0 && (
                                    <span className="ml-auto bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center shadow-sm">
                                        {requested.length}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto min-w-0">
                <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-30">
                    <div className="flex items-center gap-3">
                        <button
                            className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-xl"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu className="h-5 w-5" />
                        </button>
                        <h1 className="text-lg font-semibold text-slate-800">
                            {navItems.find(i => pathname.startsWith(i.href))?.label || 'Doctor Portal'}
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* Alerts Trigger */}
                        <button
                            className="relative p-2.5 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all"
                            onClick={() => setAlertsOpen(true)}
                        >
                            <Bell className="h-5 w-5" />
                            {alertCount > 0 && (
                                <span className="absolute top-1 right-1 bg-gradient-to-r from-red-500 to-rose-500 text-white text-[9px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center shadow-sm">
                                    {alertCount > 9 ? '9+' : alertCount}
                                </span>
                            )}
                        </button>
                        <DoctorHeader />
                    </div>
                </header>
                <div className="p-4 sm:p-6 lg:p-8">
                    {children}
                </div>
            </main>

            {/* Alerts Drawer */}
            <AlertsDrawer
                open={alertsOpen}
                onClose={() => setAlertsOpen(false)}
                appointments={appointments}
            />
        </div>
    );
}
