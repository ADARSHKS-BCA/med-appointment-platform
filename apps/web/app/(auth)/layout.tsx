
export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Left: Form */}
            <div className="flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-md space-y-8">
                    {children}
                </div>
            </div>

            {/* Right: Feature/Image */}
            <div className="hidden lg:flex flex-col justify-center p-12 bg-slate-900 text-white relative overflow-hidden">
                <div className="relative z-10 max-w-lg">
                    <h2 className="text-3xl font-bold mb-4">Manage your practice efficiently.</h2>
                    <p className="text-slate-300 text-lg">
                        Join thousands of doctors and patients on the world's most trusted healthcare platform.
                    </p>
                </div>
                {/* Abstract shapes */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2" />
            </div>
        </div>
    );
}
