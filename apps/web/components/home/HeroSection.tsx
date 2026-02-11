'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
    return (
        <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center overflow-hidden">
            {/* Left Content */}
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 z-10">


                <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                    Book Top Doctors <br />
                    <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                        In Seconds, Not Days.
                    </span>
                </h1>

                <p className="text-xl text-slate-600 max-w-lg leading-relaxed">
                    MediConnect matches you with verified specialists for instant online or in-person care. Skip the waiting room.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <div className="flex flex-col gap-2">
                        <Button
                            asChild
                            size="lg"
                            className="h-14 px-8 text-lg font-semibold shadow-lg shadow-blue-200/50 hover:shadow-blue-300/50 transition-all"
                        >
                            <Link href="/doctors">
                                Book a Verified Doctor
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                        <p className="text-xs text-slate-500 pl-2">
                            ✓ No signup required • Takes &lt; 60 seconds
                        </p>
                    </div>

                    <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="h-14 px-8 text-lg font-semibold border-slate-200 hover:bg-slate-50 hover:text-blue-700"
                    >
                        <Link href="/register?role=DOCTOR">
                            List Your Practice
                        </Link>
                    </Button>
                </div>


            </div>

            {/* Right Visual (Placeholder) */}
            <div className="relative z-10">
                <div className="relative aspect-[4/3] rounded-2xl bg-gradient-to-br from-slate-100 to-blue-50 border border-slate-200 shadow-2xl p-2 rotate-1 hover:rotate-0 transition-transform duration-500">
                    {/* Abstract UI representation */}
                    <div className="absolute inset-2 bg-white rounded-xl overflow-hidden flex flex-col">
                        {/* Mock Header */}
                        <div className="h-12 border-b border-slate-100 flex items-center px-4 gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        </div>
                        {/* Mock Content */}
                        <div className="flex-1 p-6 grid gap-4">
                            <div className="flex gap-4">
                                <div className="w-16 h-16 rounded-full bg-slate-200 animate-pulse"></div>
                                <div className="space-y-2 flex-1">
                                    <div className="h-4 w-3/4 bg-slate-200 rounded animate-pulse"></div>
                                    <div className="h-3 w-1/2 bg-slate-100 rounded animate-pulse"></div>
                                </div>
                            </div>
                            <div className="h-32 bg-slate-50 rounded-lg border border-slate-100 p-4 space-y-3">
                                <div className="flex justify-between">
                                    <div className="h-3 w-1/4 bg-slate-200 rounded"></div>
                                    <div className="h-3 w-1/4 bg-blue-100 rounded"></div>
                                </div>
                                <div className="flex gap-2 mt-4">
                                    <div className="h-8 w-20 bg-blue-600 rounded-md opacity-20"></div>
                                    <div className="h-8 w-20 bg-slate-200 rounded-md"></div>
                                </div>
                            </div>
                        </div>

                        {/* Overlay Badge */}
                        <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur shadow-lg border border-slate-100 p-3 rounded-lg flex items-center gap-3 animate-bounce">
                            <div className="bg-green-100 p-2 rounded-full">
                                <CheckCircle2 className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 font-medium">Appointment Confirmed</p>
                                <p className="text-sm font-bold text-slate-900">Dr. Sarah Smith</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative blobs */}
                <div className="absolute -top-10 -right-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl -z-10"></div>
                <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-teal-400/10 rounded-full blur-3xl -z-10"></div>
            </div>
        </section>
    );
}
