import { ShieldCheck, Zap, Video, HeartHandshake } from 'lucide-react';

export function WhyMediConnect() {
    const features = [
        {
            icon: ShieldCheck,
            title: 'Verified Specialists',
            desc: 'Every doctor is vetted for valid medical licenses and good standing.'
        },
        {
            icon: Zap,
            title: 'Instant Booking',
            desc: 'No phone tag. Book your appointment directly in real-time.'
        },
        {
            icon: Video,
            title: 'Video & In-Person',
            desc: 'Choose how you want to see your doctor. Flexible options for your comfort.'
        },
        {
            icon: HeartHandshake,
            title: 'Transparent Pricing',
            desc: 'See consultation fees upfront. No hidden charges or surprises.'
        }
    ];

    return (
        <section className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-6">
                            Why patients choose MediConnect
                        </h2>
                        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                            We're building a healthcare experience that puts you first. From finding the right specialist to follow-up care, we make it seamless.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-8">
                            {features.map((feature, idx) => (
                                <div key={idx} className="flex flex-col gap-3">
                                    <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-700">
                                        <feature.icon className="h-5 w-5" />
                                    </div>
                                    <h4 className="font-bold text-slate-900">{feature.title}</h4>
                                    <p className="text-sm text-slate-600 leading-relaxed">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="aspect-square rounded-3xl overflow-hidden bg-white shadow-2xl border border-slate-100 p-8 grid grid-cols-2 gap-4">
                            {/* Abstract UI Grid */}
                            <div className="bg-slate-50 rounded-2xl p-4 flex flex-col justify-between">
                                <div className="h-2 w-12 bg-slate-200 rounded"></div>
                                <div className="h-8 w-8 bg-blue-500 rounded-full self-end"></div>
                            </div>
                            <div className="bg-blue-600 rounded-2xl p-4 text-white flex flex-col justify-between">
                                <div className="text-xs opacity-80">Doctors Online</div>
                                <div className="text-2xl font-bold">142</div>
                            </div>
                            <div className="bg-teal-50 rounded-2xl p-4 col-span-2 flex items-center gap-4">
                                <div className="h-10 w-10 bg-teal-100 rounded-full flex items-center justify-center text-teal-600">
                                    <ShieldCheck className="h-5 w-5" />
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-slate-900">Verified & Trusted</div>
                                    <div className="text-xs text-slate-500">Industry standard security</div>
                                </div>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent pointer-events-none"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
