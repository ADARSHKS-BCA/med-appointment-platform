import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';

export function CalendarQueue() {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
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
    );
}

