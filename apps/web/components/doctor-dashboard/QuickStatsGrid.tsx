import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Clock, CheckCircle2, XCircle, IndianRupee, Timer } from 'lucide-react';

interface QuickStatsGridProps {
    stats?: {
        totalAppointments: number;
        patientsWaiting: number;
        completedToday: number;
        noShows: number;
        revenueToday: number;
        avgConsultationTime: string;
    };
    loading?: boolean;
}

export function QuickStatsGrid({ stats, loading }: QuickStatsGridProps) {
    if (!stats && !loading) {
        return null; // No data, no fallback
    }

    const displayStats = stats || {
        totalAppointments: 0,
        patientsWaiting: 0,
        completedToday: 0,
        noShows: 0,
        revenueToday: 0,
        avgConsultationTime: 'N/A',
    };

    const cards = [
        {
            title: 'Total Appointments',
            value: displayStats.totalAppointments,
            icon: Users,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
        },
        {
            title: 'Patients Waiting',
            value: displayStats.patientsWaiting,
            icon: Clock,
            color: 'text-amber-600',
            bgColor: 'bg-amber-50',
        },
        {
            title: 'Completed Today',
            value: displayStats.completedToday,
            icon: CheckCircle2,
            color: 'text-emerald-600',
            bgColor: 'bg-emerald-50',
        },
        {
            title: 'No-Shows',
            value: displayStats.noShows,
            icon: XCircle,
            color: 'text-red-600',
            bgColor: 'bg-red-50',
        },
        {
            title: 'Revenue Today',
            value: `₹${displayStats.revenueToday.toLocaleString('en-IN')}`,
            icon: IndianRupee,
            color: 'text-indigo-600',
            bgColor: 'bg-indigo-50',
        },
        {
            title: 'Avg. Consultation',
            value: displayStats.avgConsultationTime,
            icon: Timer,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50',
        },
    ];

    if (loading) {
        return (
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 mb-6">
                {[...Array(6)].map((_, i) => (
                    <Card key={i} className="animate-pulse shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                            <div className="h-8 w-8 bg-slate-200 rounded-full"></div>
                        </CardHeader>
                        <CardContent>
                            <div className="h-6 bg-slate-200 rounded w-1/3 mb-1"></div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    return (
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 mb-6">
            {cards.map((card, i) => (
                <Card key={i} className="shadow-sm border-slate-100 hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs font-medium text-slate-500">
                            {card.title}
                        </CardTitle>
                        <div className={`p-2 rounded-full ${card.bgColor}`}>
                            <card.icon className={`w-4 h-4 ${card.color}`} />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-800">{card.value}</div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
