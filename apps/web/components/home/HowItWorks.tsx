import { Search, CalendarCheck, Stethoscope } from 'lucide-react';

export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24 bg-white scroll-mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Doctor appointments, made simple
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Get the care you need in 3 easy steps.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    {/* Connecting line (desktop only) */}
                    <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 -z-10"></div>

                    {[
                        {
                            icon: Search,
                            title: '1. Find your specialist',
                            desc: 'Browse verified doctors by specialty, location, or insurance.'
                        },
                        {
                            icon: CalendarCheck,
                            title: '2. Choose a time',
                            desc: 'View real-time availability and book a slot that works for you.'
                        },
                        {
                            icon: Stethoscope,
                            title: '3. Get care',
                            desc: 'Connect online via video or visit the clinic in person.'
                        }
                    ].map((step, index) => (
                        <div key={index} className="flex flex-col items-center text-center group">
                            <div className="w-24 h-24 bg-white rounded-full border-2 border-blue-50 shadow-xl flex items-center justify-center mb-6 group-hover:border-blue-200 group-hover:scale-105 transition-all duration-300">
                                <step.icon className="h-10 w-10 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                            <p className="text-slate-600 leading-relaxed max-w-xs">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
