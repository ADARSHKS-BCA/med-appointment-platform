import { useNavigate, Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Users, Calendar, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminLayout() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const navItems = [
        { name: "Dashboard", href: "/admin/dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
        { name: "Doctors", href: "/admin/doctors", icon: <Users className="h-4 w-4" /> },
        { name: "Appointments", href: "/admin/dashboard", icon: <Calendar className="h-4 w-4" /> }, // Reuse for now
        { name: "Settings", href: "/admin/dashboard", icon: <Settings className="h-4 w-4" /> },
    ];

    return (
        <div className="flex min-h-screen flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-slate-950 text-slate-50 min-h-screen flex-shrink-0">
                <div className="p-6">
                    <h2 className="text-xl font-bold tracking-tight">Clinic<span className="text-primary">Admin</span></h2>
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
                    <Button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-900/20" onClick={handleLogout}>
                        <LogOut className="h-4 w-4 mr-2" /> Logout
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-muted/10 p-6 md:p-8">
                <Outlet />
            </main>
        </div>
    );
}
