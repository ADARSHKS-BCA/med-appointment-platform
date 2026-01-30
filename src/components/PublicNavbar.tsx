import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Stethoscope, Menu, X } from "lucide-react";
import { ModeToggle } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

export function PublicNavbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 flex h-16 items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 z-50 relative" onClick={() => setIsMenuOpen(false)}>
                    <div className="bg-primary/10 p-2 rounded-lg">
                        <Stethoscope className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-foreground">
                        MediConnect
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
                    <Link to="/doctors" className="hover:text-primary transition-colors">
                        Find a Doctor
                    </Link>
                    <Link to="/how-it-works" className="hover:text-primary transition-colors">
                        How It Works
                    </Link>
                    <Link to="/for-doctors" className="hover:text-primary transition-colors">
                        For Clinics
                    </Link>
                </nav>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-4">
                    <ModeToggle />
                    <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-primary hidden sm:block">
                        Log in
                    </Link>
                    <Link to="/doctors">
                        <Button>Find a Doctor</Button>
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <div className="flex items-center gap-2 md:hidden">
                    <ModeToggle />
                    <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle Menu" className="z-50 relative">
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={cn(
                "fixed inset-0 bg-background/98 z-40 flex flex-col items-center justify-center space-y-8 transition-all duration-300 md:hidden",
                isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            )}>
                <nav className="flex flex-col items-center gap-6 text-lg font-medium">
                    <Link to="/doctors" onClick={toggleMenu} className="hover:text-primary">
                        Find a Doctor
                    </Link>
                    <Link to="/how-it-works" onClick={toggleMenu} className="hover:text-primary">
                        How It Works
                    </Link>
                    <Link to="/for-doctors" onClick={toggleMenu} className="hover:text-primary">
                        For Clinics
                    </Link>
                    <Link to="/login" onClick={toggleMenu} className="hover:text-primary">
                        Log in
                    </Link>
                </nav>
                <div className="flex flex-col gap-4 w-full max-w-xs px-8">
                    <Link to="/doctors" onClick={toggleMenu}>
                        <Button className="w-full" size="lg">Find a Doctor</Button>
                    </Link>
                </div>
            </div>
        </header>
    );
}
