'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Menu, X, Home, LayoutDashboard, Clock, UserCircle, Bell
} from 'lucide-react';
import DoctorHeader from '@/components/doctor/DoctorHeader';
import { AlertsDrawer } from '@/components/doctor-dashboard/AlertsDrawer';
import { useAppointments } from '@/lib/use-appointments';
import { Badge } from '@/components/ui/badge';

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

    // Count today's alerts
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
                    <div>
                        <Link href="/" className="text-2xl font-bold text-blue-600">
                            MediConnect
                        </Link>
                        <p className="text-xs text-slate-500 mt-1">Doctor Portal</p>
                    </div>
                    <button
                        className="md:hidden p-1 text-slate-400 hover:text-slate-600"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X className="h-5 w-5" />
                    </button>
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
                                    flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium
                                    transition-colors duration-150
                                    ${isActive
                                        ? 'bg-blue-50 text-blue-700'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                    }
                                `}
                                onClick={() => setSidebarOpen(false)}
                            >
                                <IconComponent className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                                {item.label}
                                {item.href === '/doctor/home' && requested.length > 0 && (
                                    <span className="ml-auto bg-amber-100 text-amber-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
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
                <header className="h-16 bg-white border-b flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-30">
                    <div className="flex items-center gap-3">
                        <button
                            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-md"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu className="h-5 w-5" />
                        </button>
                        <h1 className="text-lg sm:text-xl font-semibold text-slate-800">
                            {navItems.find(i => pathname.startsWith(i.href))?.label || 'Doctor Portal'}
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* Alerts Trigger */}
                        <button
                            className="relative p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 rounded-full transition-colors"
                            onClick={() => setAlertsOpen(true)}
                            aria-label="Open alerts"
                        >
                            <Bell className="h-5 w-5" />
                            {alertCount > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[9px] font-bold w-4.5 h-4.5 min-w-[18px] min-h-[18px] rounded-full flex items-center justify-center leading-none">
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
