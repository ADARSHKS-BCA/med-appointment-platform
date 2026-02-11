import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

export function DoctorCTA() {
    return (
        <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-900 to-slate-900"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                    <div className="max-w-2xl space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 text-sm font-medium border border-blue-500/20">
                            For Healthcare Providers
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                            Grow your practice with MediConnect
                        </h2>
                        <p className="text-lg text-slate-400 leading-relaxed">
                            Reach more patients, manage appointments effortlessly, and reduce no-shows.
                            Join thousands of top doctors who trust us to power their practice.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-6 pt-4 text-slate-300">
                            <div className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-blue-400"></span>
                                No listing fees
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-blue-400"></span>
                                Smart calendar sync
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-blue-400"></span>
                                Instant payouts
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-blue-400"></span>
                                24/7 dedicated support
                            </div>
                        </div>

                        <div className="pt-8">
                            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold h-14 px-8 rounded-full">
                                <Link href="/register?role=DOCTOR">
                                    Join as a Doctor
                                    <ChevronRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/3 p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
                        <div className="space-y-4">
                            <div className="bg-slate-800/50 p-4 rounded-xl border border-white/5">
                                <div className="text-sm text-slate-400 mb-1">Total Bookings</div>
                                <div className="text-2xl font-bold text-white">128 <span className="text-green-400 text-sm font-normal">↑ 12%</span></div>
                            </div>
                            <div className="bg-slate-800/50 p-4 rounded-xl border border-white/5">
                                <div className="text-sm text-slate-400 mb-1">Patient Rating</div>
                                <div className="text-2xl font-bold text-white">4.9 <span className="text-xs text-slate-500 font-normal">/ 5.0</span></div>
                            </div>
                            <div className="text-center pt-2">
                                <p className="text-xs text-slate-500">"MediConnect transformed how I manage my clinic."</p>
                                <p className="text-xs text-slate-400 mt-1 font-medium">- Dr. Emily C.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
