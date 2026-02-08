'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const DAYS = [
    { id: 1, name: 'Monday' },
    { id: 2, name: 'Tuesday' },
    { id: 3, name: 'Wednesday' },
    { id: 4, name: 'Thursday' },
    { id: 5, name: 'Friday' },
    { id: 6, name: 'Saturday' },
    { id: 0, name: 'Sunday' },
];

const TIME_SLOTS = Array.from({ length: 24 * 2 }).map((_, i) => {
    const hour = Math.floor(i / 2);
    const min = (i % 2) * 30;
    const time = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
    return time;
});

export default function AvailabilityPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    // State: Map of DayID -> { startTime, endTime, active }
    const [schedule, setSchedule] = useState<{ [key: number]: { startTime: string; endTime: string; active: boolean } }>({});

    useEffect(() => {
        fetchAvailability();
    }, []);

    const fetchAvailability = async () => {
        try {
            const doctor = await api.get('/doctors/me');
            const availabilities = doctor.availabilities || [];

            const newSchedule: any = {};
            // Initialize defaults
            DAYS.forEach(day => {
                newSchedule[day.id] = { startTime: '09:00', endTime: '17:00', active: false };
            });

            // Populate from DB
            availabilities.forEach((a: any) => {
                // Parse time from ISO string (1970-01-01Txx:xx:00Z)
                // We just need the time part HH:mm
                const start = new Date(a.startTime).toISOString().slice(11, 16);
                const end = new Date(a.endTime).toISOString().slice(11, 16);
                newSchedule[a.dayOfWeek] = { startTime: start, endTime: end, active: true };
            });

            setSchedule(newSchedule);
        } catch (error) {
            // 
        } finally {
            setLoading(false);
        }
    };

    const handleToggleDay = (dayId: number) => {
        setSchedule(prev => ({
            ...prev,
            [dayId]: { ...prev[dayId], active: !prev[dayId].active }
        }));
    };

    const handleTimeChange = (dayId: number, field: 'startTime' | 'endTime', value: string) => {
        setSchedule(prev => ({
            ...prev,
            [dayId]: { ...prev[dayId], [field]: value }
        }));
    };

    const handleSubmit = async () => {
        setSaving(true);
        try {
            const payload = Object.entries(schedule)
                .filter(([_, val]) => val.active)
                .map(([dayId, val]) => ({
                    dayOfWeek: parseInt(dayId),
                    startTime: val.startTime,
                    endTime: val.endTime
                }));

            await api.post('/doctors/availability', payload);
            toast.success('Availability saved successfully');
        } catch (error) {
            toast.error('Failed to save availability');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Weekly Availability</CardTitle>
                    <CardDescription>Set your recurring weekly schedule. Appointments can only be booked during these hours.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {DAYS.map((day) => (
                        <div key={day.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                            <Checkbox
                                id={`day-${day.id}`}
                                checked={schedule[day.id]?.active}
                                onCheckedChange={() => handleToggleDay(day.id)}
                            />
                            <Label htmlFor={`day-${day.id}`} className="w-24 font-medium">{day.name}</Label>

                            {schedule[day.id]?.active ? (
                                <div className="flex items-center gap-2">
                                    <Select value={schedule[day.id].startTime} onValueChange={(v) => handleTimeChange(day.id, 'startTime', v)}>
                                        <SelectTrigger className="w-[120px]">
                                            <SelectValue placeholder="Start" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {TIME_SLOTS.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                    <span>to</span>
                                    <Select value={schedule[day.id].endTime} onValueChange={(v) => handleTimeChange(day.id, 'endTime', v)}>
                                        <SelectTrigger className="w-[120px]">
                                            <SelectValue placeholder="End" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {TIME_SLOTS.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                            ) : (
                                <span className="text-sm text-slate-400">Unavailable</span>
                            )}
                        </div>
                    ))}

                    <div className="pt-4">
                        <Button onClick={handleSubmit} disabled={saving} className="w-full sm:w-auto">
                            {saving ? 'Saving...' : 'Save Availability'}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
