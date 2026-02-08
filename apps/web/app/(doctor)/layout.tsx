
import Link from 'next/link';

export default function DoctorLayout({
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
                    <p className="text-xs text-slate-500 mt-1">Doctor Portal</p>
                </div>
                <nav className="p-4 space-y-2">
                    <Link href="/doctor/dashboard" className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg">
                        Dashboard
                    </Link>
                    {/* Future: Availability, Profile */}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <header className="h-16 bg-white border-b flex items-center justify-between px-8">
                    <h1 className="text-xl font-semibold">Doctor Dashboard</h1>
                    <div className="flex items-center gap-4">
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
