import { ShieldCheck, Zap, Video, HeartHandshake, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function WhyMediConnect() {
    const features = [
        {
            icon: ShieldCheck,
            title: 'Verified Specialists',
            desc: 'Every doctor is vetted for valid medical licenses and good standing.',
            color: '#6366f1',
            bg: 'bg-indigo-50',
            border: 'hover:border-indigo-200',
        },
        {
            icon: Zap,
            title: 'Instant Booking',
            desc: 'No phone tag. Book your appointment directly in real-time.',
            color: '#06b6d4',
            bg: 'bg-cyan-50',
            border: 'hover:border-cyan-200',
        },
        {
            icon: Video,
            title: 'Video & In-Person',
            desc: 'Choose how you want to see your doctor. Flexible options for your comfort.',
            color: '#8b5cf6',
            bg: 'bg-violet-50',
            border: 'hover:border-violet-200',
        },
        {
            icon: HeartHandshake,
            title: 'Transparent Pricing',
            desc: 'See consultation fees upfront. No hidden charges or surprises.',
            color: '#10b981',
            bg: 'bg-emerald-50',
            border: 'hover:border-emerald-200',
        },
    ];

    return (
        <section id="why" className="py-24 sm:py-32 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50" />
            <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-cyan-100/20 rounded-full blur-[120px]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">Why Choose Us</p>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-6">
                            Why patients choose{' '}
                            <span className="text-gradient">MediConnect</span>
                        </h2>
                        <p className="text-lg text-slate-500 mb-10 leading-relaxed">
                            We're building a healthcare experience that puts you first. From finding the right specialist to follow-up care, we make it seamless.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-5">
                            {features.map((feature, idx) => (
                                <div
                                    key={idx}
                                    className={`group glass rounded-2xl p-5 border border-transparent ${feature.border} transition-all duration-300 hover:shadow-premium hover:-translate-y-1 cursor-default`}
                                >
                                    <div className={`${feature.bg} h-11 w-11 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                                        <feature.icon className="h-5 w-5" style={{ color: feature.color }} />
                                    </div>
                                    <h4 className="font-bold text-slate-900 mb-1">{feature.title}</h4>
                                    <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10">
                            <Button asChild className="bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white shadow-lg shadow-indigo-500/25 rounded-xl h-12 px-6 font-semibold">
                                <Link href="/doctors">
                                    Get Started
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* Visual side — bento grid */}
                    <div className="relative hidden lg:block">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="glass rounded-3xl p-6 shadow-premium space-y-3 animate-float-slow">
                                <div className="h-3 w-16 bg-slate-200 rounded-full" />
                                <div className="h-12 w-12 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-full shadow-md" />
                                <div className="h-3 w-24 bg-slate-100 rounded-full" />
                            </div>
                            <div className="bg-gradient-to-br from-indigo-600 to-cyan-600 rounded-3xl p-6 text-white space-y-2 shadow-xl animate-float">
                                <div className="text-xs opacity-80 font-medium">Doctors Online</div>
                                <div className="text-4xl font-black">142</div>
                                <div className="text-xs opacity-60">Available right now</div>
                            </div>
                            <div className="col-span-2 glass rounded-3xl p-6 shadow-premium flex items-center gap-4">
                                <div className="h-12 w-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                                    <ShieldCheck className="h-6 w-6 text-emerald-600" />
                                </div>
                                <div>
                                    <div className="font-bold text-slate-900">Verified & Trusted</div>
                                    <div className="text-sm text-slate-500">Industry-leading security standards</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
