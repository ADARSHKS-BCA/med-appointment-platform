'use client';

import { useEffect, useRef, useState } from 'react';
import { Star, ShieldCheck, Users } from 'lucide-react';

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const animated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !animated.current) {
                    animated.current = true;
                    const duration = 1500;
                    const steps = 40;
                    const increment = target / steps;
                    let current = 0;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            setCount(target);
                            clearInterval(timer);
                        } else {
                            setCount(Math.floor(current));
                        }
                    }, duration / steps);
                }
            },
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target]);

    return (
        <div ref={ref} className="text-4xl sm:text-5xl font-black text-slate-900">
            {count.toLocaleString()}{suffix}
        </div>
    );
}

export function TrustSignals() {
    const stats = [
        {
            icon: ShieldCheck,
            value: 100,
            suffix: '%',
            label: 'Verified Doctors',
            color: 'from-indigo-500 to-blue-600',
            bg: 'bg-indigo-50',
        },
        {
            icon: Users,
            value: 10000,
            suffix: '+',
            label: 'Patients Served',
            color: 'from-cyan-500 to-teal-600',
            bg: 'bg-cyan-50',
        },
        {
            icon: Star,
            value: 4.8,
            suffix: '/5',
            label: 'Average Rating',
            color: 'from-amber-400 to-orange-500',
            bg: 'bg-amber-50',
        },
    ];

    return (
        <section className="py-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/50 via-white to-cyan-50/50" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, idx) => (
                        <div
                            key={idx}
                            className="group relative glass rounded-2xl p-8 text-center hover:shadow-premium transition-all duration-500 hover:-translate-y-1"
                        >
                            <div className={`${stat.bg} w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                <stat.icon className={`h-7 w-7 bg-gradient-to-br ${stat.color} bg-clip-text`} style={{ color: idx === 0 ? '#6366f1' : idx === 1 ? '#06b6d4' : '#f59e0b' }} />
                            </div>
                            <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                            <p className="text-slate-500 font-semibold mt-2 text-sm uppercase tracking-wider">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
