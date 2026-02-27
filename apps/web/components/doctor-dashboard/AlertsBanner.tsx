import { AlertCircle, Bell, Clock, FileWarning } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function AlertsBanner() {
    const alerts = [
        {
            id: 1,
            type: 'critical',
            message: 'High-priority patient waiting: John Doe (Chest Pain)',
            time: '5 mins ago',
            icon: AlertCircle,
        },
        {
            id: 2,
            type: 'lab',
            message: 'Urgent lab results ready for Sarah Smith',
            time: '15 mins ago',
            icon: FileWarning,
        },
        {
            id: 3,
            type: 'system',
            message: 'System maintenance scheduled for 10 PM tonight',
            time: '1 hour ago',
            icon: Bell,
        },
    ];

    return (
        <Card className="bg-slate-50 border-none shadow-sm mb-6">
            <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                        <Bell className="w-4 h-4 text-blue-600" />
                        Today's Alerts
                    </h3>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                        {alerts.length} New
                    </Badge>
                </div>
                <div className="space-y-2">
                    {alerts.map((alert) => (
                        <div
                            key={alert.id}
                            className={`flex items-start gap-3 p-3 rounded-lg border ${alert.type === 'critical'
                                    ? 'bg-red-50 border-red-100'
                                    : alert.type === 'lab'
                                        ? 'bg-amber-50 border-amber-100'
                                        : 'bg-white border-slate-100'
                                }`}
                        >
                            <alert.icon
                                className={`w-5 h-5 shrink-0 mt-0.5 ${alert.type === 'critical'
                                        ? 'text-red-600'
                                        : alert.type === 'lab'
                                            ? 'text-amber-600'
                                            : 'text-slate-400'
                                    }`}
                            />
                            <div className="flex-1 min-w-0">
                                <p
                                    className={`text-sm font-medium leading-tight ${alert.type === 'critical'
                                            ? 'text-red-900'
                                            : alert.type === 'lab'
                                                ? 'text-amber-900'
                                                : 'text-slate-700'
                                        }`}
                                >
                                    {alert.message}
                                </p>
                                <div className="flex items-center gap-1 mt-1">
                                    <Clock className="w-3 h-3 text-slate-400" />
                                    <span className="text-xs text-slate-500">{alert.time}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
