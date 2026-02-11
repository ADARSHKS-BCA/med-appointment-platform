import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Heart } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <span className="text-2xl font-bold text-white mb-4 block">MediConnect</span>
                        <p className="text-sm text-slate-400 leading-relaxed mb-6">
                            Trusted healthcare for everyone. Connect with top doctors, manage appointments, and prioritize your health.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-white transition-colors"><Twitter className="h-5 w-5" /></a>
                            <a href="#" className="hover:text-white transition-colors"><Facebook className="h-5 w-5" /></a>
                            <a href="#" className="hover:text-white transition-colors"><Instagram className="h-5 w-5" /></a>
                            <a href="#" className="hover:text-white transition-colors"><Linkedin className="h-5 w-5" /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Patient Care</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/doctors" className="hover:text-blue-400 transition-colors">Find Doctors</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">Medical Specialties</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">Video Consultations</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">Patient Reviews</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">For Doctors</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/register?role=DOCTOR" className="hover:text-blue-400 transition-colors">Join as a Doctor</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">Practice Management</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">Success Stories</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">Doctor Support</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Company</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">Careers</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">Contact</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col items-center gap-2">
                    <p>© {new Date().getFullYear()} MediConnect. All rights reserved.</p>
                    <p className="flex items-center gap-1">
                        Made with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> for better healthcare.
                    </p>
                </div>
            </div>
        </footer>
    );
}
