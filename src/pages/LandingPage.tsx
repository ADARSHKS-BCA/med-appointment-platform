import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PublicNavbar } from "@/components/PublicNavbar";
import { PublicFooter } from "@/components/PublicFooter";
import { CalendarCheck, ShieldCheck, Clock, Star, UserCheck, Activity } from "lucide-react";

export default function LandingPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background font-sans">
            <PublicNavbar />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative overflow-hidden py-20 lg:py-32 bg-gradient-to-b from-primary/5 to-background">
                    <div className="container mx-auto px-4 text-center">
                        <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium bg-background text-primary mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
                            Trusted by 10,000+ Patients
                        </div>

                        <div className="perspective-[1000px]">
                            <h1 className="mx-auto max-w-4xl text-5xl font-extrabold tracking-tight text-foreground sm:text-7xl mb-6 animate-in fade-in zoom-in-95 slide-in-from-bottom-8 duration-700 ease-out [transform-style:preserve-3d] [backface-visibility:hidden]">
                                Book a Doctor in <span className="text-primary block sm:inline inline-block animate-float">Under 60 Seconds</span>
                            </h1>
                        </div>

                        <p className="mx-auto max-w-2xl text-xl text-muted-foreground mb-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
                            Skip the phone calls and waiting rooms. Find verified specialists, read real reviews, and book instantly.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                            <Link to="/doctors">
                                <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 shadow-lg shadow-primary/25">
                                    Find a Doctor
                                </Button>
                            </Link>
                            <Link to="/login">
                                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8">
                                    Patient Login
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Trust Signals */}
                <section className="border-y bg-muted/30 py-12">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                            {/* Placeholders for logos/trust signals */}
                            <div className="flex items-center gap-2 font-semibold text-lg">
                                <ShieldCheck className="h-6 w-6" /> HIPAA Compliant
                            </div>
                            <div className="flex items-center gap-2 font-semibold text-lg">
                                <Star className="h-6 w-6" /> 4.9/5 Average Rating
                            </div>
                            <div className="flex items-center gap-2 font-semibold text-lg">
                                <UserCheck className="h-6 w-6" /> Verified Doctors
                            </div>
                            <div className="flex items-center gap-2 font-semibold text-lg">
                                <Activity className="h-6 w-6" /> 24/7 Support
                            </div>
                        </div>
                    </div>
                </section>

                {/* Problems vs Solutions (Key Benefits) */}
                <section className="py-24">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                                Healthcare, minus the headache
                            </h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                We've removed the barriers standing between you and the care you need.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <BenefitCard
                                icon={<CalendarCheck className="h-10 w-10 text-primary" />}
                                title="Schedule Without Phone Calls"
                                description="Pick a time that works for you instantly. No hold music, no 'call back later'."
                            />
                            <BenefitCard
                                icon={<UserCheck className="h-10 w-10 text-primary" />}
                                title="Verified, Rated Doctors"
                                description="Choose confidently. See real patient reviews, verified credentials, and experience."
                            />
                            <BenefitCard
                                icon={<Clock className="h-10 w-10 text-primary" />}
                                title="No Waiting Rooms"
                                description="Arrive on time and get seen. Or book a video consult for care from home."
                            />
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-24 bg-primary text-primary-foreground">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                            Ready to take control of your health?
                        </h2>
                        <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-10">
                            Join thousands of patients who have found a better way to see a doctor.
                        </p>
                        <Link to="/doctors">
                            <Button size="lg" variant="secondary" className="h-14 px-8 text-lg font-bold shadow-xl">
                                Find a Doctor Now
                            </Button>
                        </Link>
                    </div>
                </section>
            </main>

            <PublicFooter />
        </div>
    );
}

function BenefitCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
    return (
        <div className="flex flex-col items-start p-8 rounded-2xl bg-card border shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-6 p-4 rounded-xl bg-primary/10">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">
                {description}
            </p>
        </div>
    );
}
