
import Link from 'next/link';

export default function PatientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-slate-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r">
                <div className="p-6">
                    <Link href="/" className="text-2xl font-bold text-blue-600">
                        MediConnect
                    </Link>
                </div>
                <nav className="p-4 space-y-2">
                    <Link href="/patient/dashboard" className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg">
                        Dashboard
                    </Link>
                    <Link href="/patient/appointments" className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg">
                        My Appointments
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <header className="h-16 bg-white border-b flex items-center justify-between px-8">
                    <h1 className="text-xl font-semibold">Patient Portal</h1>
                    <div className="flex items-center gap-4">
                        {/* User Dropdown Placeholder */}
                        <div className="w-8 h-8 bg-blue-100 rounded-full"></div>
                    </div>
                </header>
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
