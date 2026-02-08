
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
            {/* Navbar */}
            <header className="fixed w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                            MediConnect
                        </span>
                    </div>
                    <nav className="hidden md:flex gap-6 items-center">
                        <Link href="/about" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition">How it Works</Link>
                        <Link href="/doctors" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition">Find Doctors</Link>
                        <Link href="/login" className="text-sm font-medium text-slate-900 hover:text-blue-700">Log In</Link>
                        <Link
                            href="/register?role=DOCTOR"
                            className="text-sm font-medium px-4 py-2 rounded-full border border-slate-200 hover:border-blue-200 hover:bg-blue-50 text-slate-700 transition"
                        >
                            For Doctors
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                        Healthcare Simplified. <br />
                        <span className="text-blue-600">Trust Verified.</span>
                    </h1>
                    <p className="text-xl text-slate-600 max-w-lg leading-relaxed">
                        Connect with top-rated specialists for in-person and video consultations. No wait times, just care.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Link
                            href="/doctors"
                            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 rounded-full hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
                        >
                            Find a Doctor
                        </Link>
                        <Link
                            href="/register?role=DOCTOR"
                            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-slate-700 transition-all duration-200 bg-white border border-slate-200 rounded-full hover:bg-slate-50 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-200"
                        >
                            List Your Practice
                        </Link>
                    </div>

                    <div className="flex items-center gap-4 pt-8 text-sm text-slate-500 font-medium">
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white" />
                            ))}
                        </div>
                        <p>Trusted by 10,000+ patients</p>
                    </div>
                </div>

                {/* Hero Visual (Placeholder for generated image) */}
                <div className="relative aspect-square lg:aspect-[4/3] rounded-3xl bg-slate-100 overflow-hidden shadow-2xl skew-y-1 transform animate-in fade-in zoom-in duration-1000 delay-200">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center">
                        <span className="text-slate-300 font-bold text-lg">[Generated Hero Image Here]</span>
                    </div>
                </div>
            </section>

            {/* Features / Trust */}
            <section className="bg-white py-24 sm:py-32 border-t border-slate-100">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-base font-semibold leading-7 text-blue-600">Why MediConnect?</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                            Everything you need to manage your health
                        </p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                            {[
                                {
                                    name: '100% Verified Doctors',
                                    description: 'Every doctor on our platform is manually verified by our team. No fakes, no outdated licenses.',
                                },
                                {
                                    name: 'Instant Booking',
                                    description: 'See real-time availability and book appointments instantly. No phone calls required.',
                                },
                                {
                                    name: 'Role-Based Dashboards',
                                    description: 'Dedicated portals for Patients and Doctors ensuring a tailored experience for everyone.',
                                },
                                {
                                    name: 'Secure & Private',
                                    description: 'Your health data is encrypted and protected. We prioritize your privacy above all.',
                                },
                            ].map((feature) => (
                                <div key={feature.name} className="relative pl-16">
                                    <dt className="text-base font-semibold leading-7 text-slate-900">
                                        <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                                            {/* Icon */}
                                            <div className="w-6 h-6 bg-white/20 rounded" />
                                        </div>
                                        {feature.name}
                                    </dt>
                                    <dd className="mt-2 text-base leading-7 text-slate-600">{feature.description}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 py-12 mt-auto">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-slate-400 text-sm">© 2024 MediConnect. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
