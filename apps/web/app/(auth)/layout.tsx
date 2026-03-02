
export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Left: Form */}
            <div className="flex items-center justify-center p-8 bg-white relative">
                <div className="w-full max-w-md space-y-8 relative z-10">
                    {children}
                </div>
                {/* Subtle decoration */}
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-50 rounded-full blur-3xl opacity-50" />
            </div>

            {/* Right: Feature/Gradient Side */}
            <div className="hidden lg:flex flex-col justify-center p-16 relative overflow-hidden">
                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-blue-700 to-cyan-600" />

                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/30 via-transparent to-cyan-400/20 animate-gradient" />

                {/* Grid pattern */}
                <div className="absolute inset-0 opacity-[0.05]" style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)`,
                    backgroundSize: '50px 50px',
                }} />

                <div className="relative z-10 max-w-lg">
                    <div className="mb-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/80 text-sm font-medium border border-white/20">
                            ✨ Trusted by 10,000+ users
                        </div>
                    </div>
                    <h2 className="text-4xl font-bold mb-6 text-white leading-tight">
                        Your health journey starts here.
                    </h2>
                    <p className="text-white/70 text-lg leading-relaxed">
                        Join thousands of doctors and patients on the most trusted healthcare platform. Book appointments, manage your practice, and get care — all in one place.
                    </p>

                    {/* Floating testimonial card */}
                    <div className="mt-10 glass-dark rounded-2xl p-5 max-w-sm">
                        <div className="flex gap-1 mb-3">
                            {[1, 2, 3, 4, 5].map(i => (
                                <span key={i} className="text-amber-400 text-sm">★</span>
                            ))}
                        </div>
                        <p className="text-white/80 text-sm leading-relaxed mb-3">
                            "MediConnect made it incredibly easy to find a specialist and book within minutes. The experience is seamless."
                        </p>
                        <p className="text-white/50 text-xs font-medium">— Priya S., Patient</p>
                    </div>
                </div>

                {/* Abstract shape blobs */}
                <div className="absolute top-10 right-10 w-32 h-32 bg-white/5 rounded-full" />
                <div className="absolute bottom-20 right-20 w-20 h-20 bg-white/5 rounded-full" />
                <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-white/5 rounded-full blur-xl" />
            </div>
        </div>
    );
}
