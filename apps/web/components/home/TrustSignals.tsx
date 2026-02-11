import { Star, ShieldCheck, Users } from 'lucide-react';

export function TrustSignals() {
    return (
        <section className="py-12 bg-slate-50 border-y border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center text-center">
                    <div className="flex flex-col items-center gap-2 group">
                        <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                            <ShieldCheck className="h-6 w-6" />
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900">100%</h3>
                        <p className="text-slate-600 font-medium">Verified Doctors</p>
                    </div>

                    <div className="flex flex-col items-center gap-2 group">
                        <div className="h-12 w-12 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                            <Users className="h-6 w-6" />
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900">10,000+</h3>
                        <p className="text-slate-600 font-medium">Patients Served</p>
                    </div>

                    <div className="flex flex-col items-center gap-2 group">
                        <div className="h-12 w-12 bg-yellow-100 text-yellow-600 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                            <Star className="h-6 w-6" />
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900">4.8/5</h3>
                        <p className="text-slate-600 font-medium">Average Rating</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
