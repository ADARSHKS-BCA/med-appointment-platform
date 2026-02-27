import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlayCircle, Calendar, XCircle, UserX, Stethoscope } from 'lucide-react';

interface AppointmentType {
    id: string;
    patientName: string;
    age: number;
    gender: string;
    type: 'Consultation' | 'Follow-up' | 'Emergency';
    status: 'Checked-in' | 'Waiting' | 'Completed' | 'No-show' | 'Scheduled';
    startTime: Date;
    endTime: Date;
}

interface AppointmentsTimelineProps {
    appointments?: AppointmentType[];
    onAction?: (action: string, appointmentId: string) => void;
}

export function AppointmentsTimeline({ appointments, onAction }: AppointmentsTimelineProps) {
    // Mock data if none provided
    const mockAppointments: AppointmentType[] = [
        {
            id: '1',
            patientName: 'Sarah Smith',
            age: 34,
            gender: 'F',
            type: 'Consultation',
            status: 'Waiting',
            startTime: new Date(new Date().setHours(9, 0, 0, 0)),
            endTime: new Date(new Date().setHours(9, 30, 0, 0)),
        },
        {
            id: '2',
            patientName: 'Mike Johnson',
            age: 45,
            gender: 'M',
            type: 'Follow-up',
            status: 'Checked-in',
            startTime: new Date(new Date().setHours(9, 30, 0, 0)),
            endTime: new Date(new Date().setHours(10, 0, 0, 0)),
        },
        {
            id: '3',
            patientName: 'Emily Davis',
            age: 28,
            gender: 'F',
            type: 'Emergency',
            status: 'Scheduled',
            startTime: new Date(new Date().setHours(11, 0, 0, 0)),
            endTime: new Date(new Date().setHours(11, 45, 0, 0)),
        },
    ];

    const displayAppointments = appointments || mockAppointments;

    // Generate hours from 8 AM to 8 PM
    const hours = Array.from({ length: 13 }, (_, i) => i + 8);

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'Emergency': return 'bg-red-100 text-red-700';
            case 'Follow-up': return 'bg-purple-100 text-purple-700';
            default: return 'bg-blue-100 text-blue-700';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Waiting': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'Checked-in': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'Completed': return 'bg-slate-100 text-slate-700 border-slate-200';
            case 'No-show': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-slate-100 text-slate-700 border-slate-200';
        }
    };

    return (
        <Card className="shadow-sm border-slate-100 h-full flex flex-col">
            <CardHeader className="pb-3 border-b border-slate-100 bg-white sticky top-0 z-10 rounded-t-xl">
                <CardTitle className="text-lg font-semibold text-slate-800 flex items-center justify-between">
                    Today's Schedule
                    <Badge variant="outline" className="font-normal text-slate-500">
                        {displayAppointments.length} Appointments
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex-1 overflow-y-auto relative bg-slate-50/50">
                <div className="flex h-full">
                    {/* Time Column */}
                    <div className="w-20 pt-4 pb-4 border-r border-slate-100 bg-white">
                        {hours.map((hour) => (
                            <div key={hour} className="h-32 px-3 relative">
                                <span className="text-xs font-medium text-slate-400 absolute -top-2">
                                    {hour > 12 ? `${hour - 12} PM` : hour === 12 ? '12 PM' : `${hour} AM`}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Appointments Column */}
                    <div className="flex-1 pt-4 pb-4 relative min-h-[1500px]">
                        {/* Hour Grid Lines */}
                        {hours.map((hour) => (
                            <div key={hour} className="h-32 border-t border-slate-100 w-full" />
                        ))}

                        {/* Appointment Cards */}
                        {displayAppointments.map((appt) => {
                            const startHour = appt.startTime.getHours() + appt.startTime.getMinutes() / 60;
                            const endHour = appt.endTime.getHours() + appt.endTime.getMinutes() / 60;
                            const topOffset = (startHour - 8) * 128 + 16; // 128px per hour, 16px initial top padding
                            const height = (endHour - startHour) * 128;

                            return (
                                <div
                                    key={appt.id}
                                    className="absolute left-4 right-4 rounded-lg bg-white border border-slate-200 shadow-sm p-3 hover:shadow-md transition-shadow group flex flex-col justify-between"
                                    style={{ top: `${topOffset}px`, height: `${Math.max(height - 4, 80)}px` }}
                                >
                                    <div>
                                        <div className="flex justify-between items-start mb-1">
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-semibold text-slate-800 text-sm">
                                                    {appt.patientName}
                                                </h4>
                                                <span className="text-xs text-slate-500">
                                                    {appt.age}y • {appt.gender}
                                                </span>
                                            </div>
                                            <Badge variant="outline" className={`text-[10px] px-1.5 py-0 h-4 border ${getStatusColor(appt.status)}`}>
                                                {appt.status}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Badge variant="secondary" className={`text-[10px] hover:bg-none font-normal ${getTypeColor(appt.type)}`}>
                                                {appt.type}
                                            </Badge>
                                            <span className="text-xs text-slate-500 flex items-center gap-1">
                                                <Stethoscope className="w-3 h-3" />
                                                {format(appt.startTime, 'h:mm a')} - {format(appt.endTime, 'h:mm a')}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Action Buttons - visible mostly on hover or always if there's space */}
                                    <div className="flex items-center gap-1 mt-2 pt-2 border-t border-slate-50 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button size="sm" variant="default" className="h-7 text-xs px-2 bg-blue-600 hover:bg-blue-700" onClick={() => onAction?.('start', appt.id)}>
                                            <PlayCircle className="w-3 h-3 mr-1" /> Start
                                        </Button>
                                        <Button size="sm" variant="outline" className="h-7 text-xs px-2" onClick={() => onAction?.('reschedule', appt.id)}>
                                            <Calendar className="w-3 h-3 mr-1" /> Reschedule
                                        </Button>
                                        <Button size="sm" variant="ghost" className="h-7 text-xs px-2 text-red-600 hover:text-red-700 hover:bg-red-50 ml-auto" onClick={() => onAction?.('noshow', appt.id)}>
                                            <UserX className="w-3 h-3" />
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
