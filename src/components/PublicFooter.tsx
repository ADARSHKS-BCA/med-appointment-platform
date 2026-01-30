import { Link } from "react-router-dom";
import { Stethoscope } from "lucide-react";

export function PublicFooter() {
    return (
        <footer className="border-t bg-muted/40">
            <div className="container mx-auto px-4 py-12 md:py-16">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center gap-2">
                            <Stethoscope className="h-6 w-6 text-primary" />
                            <span className="text-xl font-bold">MediConnect</span>
                        </Link>
                        <p className="text-sm text-muted-foreground max-w-xs">
                            Connecting patients with trusted healthcare providers instantly. No phone calls, no waiting.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Product</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link to="/doctors" className="hover:text-foreground">Find a Doctor</Link></li>
                            <li><Link to="/how-it-works" className="hover:text-foreground">How It Works</Link></li>
                            <li><Link to="/for-doctors" className="hover:text-foreground">For Doctors</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Legal & Trust</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link to="/privacy" className="hover:text-foreground">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="hover:text-foreground">Terms of Service</Link></li>
                            <li><Link to="/hipaa" className="hover:text-foreground">HIPAA Compliance</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Contact</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li>support@mediconnect.com</li>
                            <li>1-800-MEDICAL</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} MediConnect. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
