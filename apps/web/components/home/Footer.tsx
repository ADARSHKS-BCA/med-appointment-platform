import Link from 'next/link';
import { Heart, Stethoscope } from 'lucide-react';

export function Footer() {
    return (
        <footer className="relative overflow-hidden">
            {/* Gradient border top */}
            <div className="h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />

            <div className="bg-slate-950 text-slate-300 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                        <div className="col-span-1">
                            <Link href="/" className="flex items-center gap-2.5 mb-5">
                                <div className="bg-gradient-to-br from-indigo-600 to-cyan-500 text-white p-2 rounded-xl shadow-lg shadow-indigo-500/20">
                                    <Stethoscope className="h-5 w-5" />
                                </div>
                                <span className="text-xl font-bold text-white">MediConnect</span>
                            </Link>
                            <p className="text-sm text-slate-500 leading-relaxed mb-6">
                                Trusted healthcare for everyone. Connect with top doctors, manage appointments, and prioritize your health.
                            </p>
                            <div className="flex gap-3">
                                {['X', 'FB', 'IG', 'LI'].map((label, i) => (
                                    <a key={i} href="#" className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-slate-400 hover:text-white hover:bg-white/10 hover:border-indigo-500/30 transition-all">
                                        {label}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {[
                            {
                                title: 'Patient Care',
                                links: [
                                    { label: 'Find Doctors', href: '/doctors' },
                                    { label: 'Medical Specialties', href: '#' },
                                    { label: 'Video Consultations', href: '#' },
                                    { label: 'Patient Reviews', href: '#' },
                                ],
                            },
                            {
                                title: 'For Doctors',
                                links: [
                                    { label: 'Join as a Doctor', href: '/register?role=DOCTOR' },
                                    { label: 'Practice Management', href: '#' },
                                    { label: 'Success Stories', href: '#' },
                                    { label: 'Doctor Support', href: '#' },
                                ],
                            },
                            {
                                title: 'Company',
                                links: [
                                    { label: 'About Us', href: '/about' },
                                    { label: 'Careers', href: '#' },
                                    { label: 'Contact', href: '#' },
                                    { label: 'Privacy Policy', href: '#' },
                                ],
                            },
                        ].map((section, i) => (
                            <div key={i}>
                                <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">{section.title}</h4>
                                <ul className="space-y-3 text-sm">
                                    {section.links.map((link, j) => (
                                        <li key={j}>
                                            <Link href={link.href} className="text-slate-500 hover:text-indigo-400 transition-colors duration-200">
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="pt-8 border-t border-white/5 text-center text-xs text-slate-600 flex flex-col items-center gap-2">
                        <p>© {new Date().getFullYear()} MediConnect. All rights reserved.</p>
                        <p className="flex items-center gap-1.5">
                            Made with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> for better healthcare.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
