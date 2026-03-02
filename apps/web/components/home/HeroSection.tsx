'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2, Calendar, Shield, Star, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
    return (
        <section className="relative pt-28 sm:pt-36 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full overflow-hidden">
            {/* Background gradient mesh */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-400/15 rounded-full blur-[100px] animate-float" />
                <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-cyan-400/15 rounded-full blur-[100px] animate-float-slow" />
                <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-violet-400/10 rounded-full blur-[80px]" />
            </div>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Left Content */}
                <div className="space-y-8 animate-slide-up z-10">
                    {/* Trust pill */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-medium">
                        <Shield className="h-4 w-4" />
                        Trusted by 10,000+ patients
                        <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative rounded-full h-2 w-2 bg-emerald-500" />
                        </span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                        Book Top Doctors <br />
                        <span className="text-gradient">
                            In Seconds, Not Days.
                        </span>
                    </h1>

                    <p className="text-lg sm:text-xl text-slate-600 max-w-lg leading-relaxed">
                        MediConnect matches you with verified specialists for instant online or in-person care. Skip the waiting room.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-2">
                        <div className="flex flex-col gap-2">
                            <Button
                                asChild
                                size="lg"
                                className="h-14 px-8 text-lg font-semibold bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all rounded-2xl"
                            >
                                <Link href="/doctors">
                                    Book a Verified Doctor
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                            <p className="text-xs text-slate-500 pl-2 flex items-center gap-1.5">
                                <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                                No signup required • Takes &lt; 60 seconds
                            </p>
                        </div>

                        <Button
                            asChild
                            variant="outline"
                            size="lg"
                            className="h-14 px-8 text-lg font-semibold border-slate-200 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 rounded-2xl transition-all"
                        >
                            <Link href="/register?role=DOCTOR">
                                List Your Practice
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Right Visual — Floating Cards Composition */}
                <div className="relative z-10 hidden sm:block">
                    <div className="relative">
                        {/* Main card */}
                        <div className="glass rounded-3xl shadow-premium p-6 animate-float-slow">
                            {/* Mini browser */}
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                                <div className="h-10 border-b border-slate-100 flex items-center px-4 gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-400" />
                                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                                    <div className="flex-1 ml-3">
                                        <div className="h-5 w-40 bg-slate-100 rounded-full" />
                                    </div>
                                </div>
                                <div className="p-5 space-y-4">
                                    <div className="flex gap-4 items-start">
                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-md shrink-0">
                                            DS
                                        </div>
                                        <div className="space-y-1.5 flex-1">
                                            <div className="h-4 w-3/4 bg-slate-800 rounded-full" />
                                            <div className="h-3 w-1/2 bg-slate-300 rounded-full" />
                                            <div className="flex gap-1 mt-2">
                                                {[1, 2, 3, 4, 5].map(i => (
                                                    <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                        <div className="h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                                            <Calendar className="w-4 h-4 text-indigo-500" />
                                        </div>
                                        <div className="h-10 bg-cyan-50 rounded-xl flex items-center justify-center">
                                            <Clock className="w-4 h-4 text-cyan-500" />
                                        </div>
                                        <div className="h-10 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-xl flex items-center justify-center text-white text-xs font-semibold">
                                            Book
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating badge - confirmed */}
                        <div className="absolute -bottom-4 -right-4 glass rounded-2xl shadow-premium p-3 flex items-center gap-3 animate-float border border-emerald-100">
                            <div className="bg-emerald-100 p-2 rounded-xl">
                                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Confirmed</p>
                                <p className="text-sm font-bold text-slate-900">Dr. Sarah Smith</p>
                            </div>
                        </div>

                        {/* Floating badge - time */}
                        <div className="absolute -top-4 -left-4 glass rounded-2xl shadow-premium p-3 flex items-center gap-3 animate-float-slow border border-indigo-100">
                            <div className="bg-indigo-100 p-2 rounded-xl">
                                <Clock className="h-5 w-5 text-indigo-600" />
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Next Slot</p>
                                <p className="text-sm font-bold text-slate-900">10:30 AM Today</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
