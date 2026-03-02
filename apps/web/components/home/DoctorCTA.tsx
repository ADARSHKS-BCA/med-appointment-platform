import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight, BarChart3, Star, TrendingUp, Users } from 'lucide-react';

export function DoctorCTA() {
    return (
        <section className="py-24 sm:py-32 relative overflow-hidden">
            {/* Dark background with gradient mesh */}
            <div className="absolute inset-0 bg-slate-950" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/40 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent" />

            {/* Animated grid pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: '60px 60px',
            }} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
                    <div className="max-w-2xl space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-300 text-sm font-medium border border-indigo-500/20 backdrop-blur-sm">
                            <TrendingUp className="h-4 w-4" />
                            For Healthcare Providers
                        </div>

                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                            Grow your practice with{' '}
                            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                                MediConnect
                            </span>
                        </h2>

                        <p className="text-lg text-slate-400 leading-relaxed">
                            Reach more patients, manage appointments effortlessly, and reduce no-shows.
                            Join thousands of top doctors who trust us to power their practice.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-4 pt-4">
                            {['No listing fees', 'Smart calendar sync', 'Instant payouts', '24/7 dedicated support'].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3 text-slate-300">
                                    <div className="h-2 w-2 rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400" />
                                    <span className="text-sm">{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="pt-4">
                            <Button asChild size="lg" className="bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white font-semibold h-14 px-8 rounded-2xl shadow-xl shadow-indigo-500/20">
                                <Link href="/register?role=DOCTOR">
                                    Join as a Doctor
                                    <ChevronRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* Stats cards */}
                    <div className="w-full lg:w-[380px] shrink-0">
                        <div className="glass-dark rounded-3xl p-6 space-y-4">
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-indigo-500/30 transition-colors">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-slate-400">Total Bookings</span>
                                    <BarChart3 className="h-4 w-4 text-indigo-400" />
                                </div>
                                <div className="text-3xl font-black text-white">128</div>
                                <div className="text-sm text-emerald-400 font-medium mt-1">↑ 12% this month</div>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-cyan-500/30 transition-colors">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-slate-400">Patient Rating</span>
                                    <Star className="h-4 w-4 text-amber-400" />
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-black text-white">4.9</span>
                                    <span className="text-slate-500 text-sm">/ 5.0</span>
                                </div>
                                <div className="flex gap-1 mt-2">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                                    ))}
                                </div>
                            </div>
                            <div className="text-center pt-2 border-t border-white/5">
                                <p className="text-sm text-slate-500 italic">
                                    "MediConnect transformed how I manage my clinic."
                                </p>
                                <p className="text-xs text-indigo-400 mt-1.5 font-semibold">— Dr. Emily C., Cardiologist</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
