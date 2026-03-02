import { Search, CalendarCheck, Stethoscope, ArrowRight } from 'lucide-react';

export function HowItWorks() {
    const steps = [
        {
            icon: Search,
            title: 'Find your specialist',
            desc: 'Browse verified doctors by specialty, location, or insurance.',
            color: 'from-indigo-500 to-blue-600',
            bg: 'bg-indigo-50',
            shadow: 'shadow-indigo-500/20',
        },
        {
            icon: CalendarCheck,
            title: 'Choose a time',
            desc: 'View real-time availability and book a slot that works for you.',
            color: 'from-cyan-500 to-teal-600',
            bg: 'bg-cyan-50',
            shadow: 'shadow-cyan-500/20',
        },
        {
            icon: Stethoscope,
            title: 'Get care',
            desc: 'Connect online via video or visit the clinic in person.',
            color: 'from-violet-500 to-purple-600',
            bg: 'bg-violet-50',
            shadow: 'shadow-violet-500/20',
        },
    ];

    return (
        <section id="how-it-works" className="py-24 sm:py-32 bg-white scroll-mt-20 relative overflow-hidden">
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-100/30 rounded-full blur-[120px]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center mb-16 sm:mb-20">
                    <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">Simple Process</p>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
                        Doctor appointments, <span className="text-gradient">made simple</span>
                    </h2>
                    <p className="mt-5 text-lg text-slate-500 max-w-2xl mx-auto">
                        Get the care you need in 3 easy steps. No phone calls, no waiting.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Connecting line */}
                    <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-[2px] bg-gradient-to-r from-indigo-200 via-cyan-200 to-violet-200" />

                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center text-center group relative">
                            {/* Step number */}
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 bg-white px-2">
                                <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">
                                    Step {index + 1}
                                </span>
                            </div>

                            <div className={`w-28 h-28 ${step.bg} rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-500 shadow-xl ${step.shadow} relative`}>
                                <step.icon className="h-12 w-12" style={{ color: index === 0 ? '#6366f1' : index === 1 ? '#06b6d4' : '#8b5cf6' }} />
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                            <p className="text-slate-500 leading-relaxed max-w-xs">{step.desc}</p>

                            {/* Arrow between steps (desktop) */}
                            {index < 2 && (
                                <div className="hidden md:block absolute right-0 top-16 translate-x-1/2 -translate-y-1/2">
                                    <ArrowRight className="w-5 h-5 text-slate-300" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
