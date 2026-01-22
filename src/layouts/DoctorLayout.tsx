import { useNavigate, Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Calendar, LogOut, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DoctorLayout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const navItems = [
        { name: "Dashboard", href: "/doctor/dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
        { name: "Schedule", href: "/doctor/dashboard", icon: <Calendar className="h-4 w-4" /> }, // Keeping same for now
    ];

    return (
        <div className="flex min-h-screen flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-slate-900 text-slate-50 min-h-screen flex-shrink-0">
                <div className="p-6">
                    <h2 className="text-xl font-bold tracking-tight">Clinic<span className="text-primary">App</span></h2>
                    <p className="text-xs text-slate-400 mt-1">Doctor Portal</p>
                </div>
                <nav className="space-y-1 px-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-slate-800",
                                location.pathname === item.href ? "bg-primary text-primary-foreground hover:bg-primary/90" : "text-slate-300"
                            )}
                        >
                            {item.icon}
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-3 mb-6 px-3">
                        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                            Dr
                        </div>
                        <div>
                            <p className="text-sm font-medium">Dr. Smith</p>
                            <p className="text-xs text-slate-400">Cardiology</p>
                        </div>
                    </div>
                    <Button variant="destructive" className="w-full justify-start" onClick={handleLogout}>
                        <LogOut className="h-4 w-4 mr-2" /> Logout
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-muted/10">
                <header className="flex h-16 items-center border-b bg-background px-6">
                    <h1 className="text-lg font-semibold ml-auto md:ml-0">Dashboard</h1>
                    <div className="ml-auto flex items-center gap-4">
                        <Button variant="ghost" size="icon">
                            <Settings className="h-4 w-4" />
                        </Button>
                    </div>
                </header>
                <div className="p-6">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
