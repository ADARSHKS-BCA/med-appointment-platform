import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Clock, Users, ArrowRight } from 'lucide-react';

export function CalendarQueue() {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
        <div className="space-y-6">
            <Card className="shadow-sm border-slate-100">
                <CardHeader className="pb-2">
                    <CardTitle className="text-md font-semibold text-slate-800">Calendar</CardTitle>
                </CardHeader>
                <CardContent>
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border-0 w-full flex justify-center"
                    />
                </CardContent>
            </Card>

            <Card className="shadow-sm border-slate-100 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
                <CardHeader className="pb-2">
                    <CardTitle className="text-md font-semibold text-blue-900 flex justify-between items-center">
                        Real-time Queue
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white p-3 rounded-lg border border-blue-100/50 shadow-sm">
                            <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                                <Users className="w-4 h-4 text-blue-500" /> Waiting
                            </div>
                            <p className="text-2xl font-bold text-slate-800">5</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-blue-100/50 shadow-sm">
                            <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                                <Clock className="w-4 h-4 text-amber-500" /> Avg. Time
                            </div>
                            <p className="text-2xl font-bold text-slate-800">14m</p>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-blue-100/50 shadow-sm mt-4">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Current Token</p>
                        <div className="flex items-baseline gap-2 mb-4">
                            <span className="text-4xl font-black text-blue-600">042</span>
                            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">In Progress</Badge>
                        </div>

                        <div className="pt-3 border-t border-slate-100">
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Next Patient preview</p>
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-medium text-slate-800 text-sm">Sarah Smith (043)</p>
                                    <p className="text-xs text-slate-500">Consultation • Chest Pain</p>
                                </div>
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 shrink-0 text-blue-600 rounded-full hover:bg-blue-50">
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
