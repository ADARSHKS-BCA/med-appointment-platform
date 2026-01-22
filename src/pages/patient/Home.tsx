import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Stethoscope, Clock, ShieldCheck } from "lucide-react";
import React from 'react';

export default function Home() {
    return (
        <div className="flex flex-col gap-12 pb-10">
            {/* Hero Section */}
            <section className="bg-primary/5 py-20 px-4 text-center lg:py-32">
                <div className="container mx-auto max-w-4xl space-y-6">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-primary">
                        Healthcare Simplified.
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                        Book appointments with trusted doctors in seconds. No login required to browse.
                        Manage your health journey with ease.
                    </p>
                    <div className="flex justify-center gap-4 pt-4">
                        <Link to="/doctors">
                            <Button size="lg" className="h-12 px-8 text-lg">
                                Book Appointment
                            </Button>
                        </Link>
                        <Link to="/login">
                            <Button size="lg" variant="outline" className="h-12 px-8 text-lg">
                                Patient Login
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="container mx-auto px-4">
                <div className="flex flex-col items-center gap-4 text-center mb-10">
                    <h2 className="text-3xl font-bold tracking-tight">Why Choose Us?</h2>
                    <p className="text-muted-foreground">Designed for your convenience and health.</p>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <FeatureCard
                        icon={<Calendar className="h-10 w-10 text-primary" />}
                        title="Easy Scheduling"
                        description="Select your preferred date and time instantly."
                    />
                    <FeatureCard
                        icon={<Stethoscope className="h-10 w-10 text-primary" />}
                        title="Expert Doctors"
                        description="Verified specialists for all your needs."
                    />
                    <FeatureCard
                        icon={<Clock className="h-10 w-10 text-primary" />}
                        title="Zero Wait Time"
                        description="Book in advance and skip the queue."
                    />
                    <FeatureCard
                        icon={<ShieldCheck className="h-10 w-10 text-primary" />}
                        title="Secure Records"
                        description="Your medical history is safe with us."
                    />
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-4 py-12">
                <div className="rounded-3xl bg-primary px-6 py-12 md:px-12 text-center md:text-left md:flex md:items-center md:justify-between">
                    <div className="space-y-2 mb-6 md:mb-0">
                        <h2 className="text-3xl font-bold text-primary-foreground">Ready to get started?</h2>
                        <p className="text-primary-foreground/90">Find the right doctor for you today.</p>
                    </div>
                    <Link to="/doctors">
                        <Button size="lg" variant="secondary" className="h-12 px-8 text-lg font-semibold">
                            Find a Doctor
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
    return (
        <Card className="text-center border-none shadow-none bg-secondary/30">
            <CardHeader className="flex flex-col items-center gap-4 pb-2">
                <div className="rounded-full bg-background p-4 shadow-sm">
                    {icon}
                </div>
                <CardTitle className="text-xl">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">{description}</p>
            </CardContent>
        </Card>
    )
}
