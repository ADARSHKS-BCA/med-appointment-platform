import { Link, useLocation } from "react-router-dom"
import { Menu, User, Calendar, LogOut, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"
import { cn } from "@/lib/utils"

export function SiteHeader() {
    const { user, logout } = useAuth()
    const location = useLocation()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center px-4 justify-between">
                {/* Mobile Menu Toggle */}
                <div className="flex items-center md:hidden">
                    <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>

                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2">
                    <span className="text-xl font-bold">Clinic<span className="text-primary">App</span></span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-6 text-sm font-medium mx-6">
                    <Link
                        to="/doctors"
                        className={cn(
                            "transition-colors hover:text-foreground/80",
                            location.pathname === "/doctors" ? "text-foreground" : "text-foreground/60"
                        )}
                    >
                        Doctors
                    </Link>
                    <Link
                        to="/doctors" // Placeholder for about
                        className={cn(
                            "transition-colors hover:text-foreground/80",
                            location.pathname === "/about" ? "text-foreground" : "text-foreground/60"
                        )}
                    >
                        About
                    </Link>
                </nav>

                {/* User Nav */}
                <div className="flex items-center gap-2">
                    {!user ? (
                        <div className="flex items-center gap-2">
                            <Link to="/login">
                                <Button variant="ghost" size="sm">Login</Button>
                            </Link>
                            <Link to="/doctors" className="hidden sm:block">
                                <Button size="sm">Book Now</Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="relative">
                            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                    <User className="h-4 w-4 text-primary" />
                                </div>
                            </Button>

                            {/* User Dropdown */}
                            {isUserMenuOpen && (
                                <div className="absolute right-0 top-10 w-48 rounded-md border bg-popover text-popover-foreground shadow-md z-50 p-1">
                                    <Link to="/my-appointments" className="flex items-center w-full px-2 py-1.5 text-sm rounded-sm hover:bg-accent" onClick={() => setIsUserMenuOpen(false)}>
                                        <Calendar className="mr-2 h-4 w-4" /> Appointments
                                    </Link>
                                    <button className="flex items-center w-full px-2 py-1.5 text-sm rounded-sm hover:bg-accent text-destructive" onClick={() => { logout(); setIsUserMenuOpen(false); }}>
                                        <LogOut className="mr-2 h-4 w-4" /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="md:hidden border-t bg-background p-4 space-y-4">
                    <nav className="flex flex-col gap-4">
                        <Link to="/" className="text-sm font-medium" onClick={() => setIsMenuOpen(false)}>Home</Link>
                        <Link to="/doctors" className="text-sm font-medium" onClick={() => setIsMenuOpen(false)}>Doctors</Link>
                        {!user && (
                            <Link to="/login" className="text-sm font-medium text-primary" onClick={() => setIsMenuOpen(false)}>Login / Register</Link>
                        )}
                    </nav>
                </div>
            )}
        </header>
    )
}
