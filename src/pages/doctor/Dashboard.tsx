import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, User, CheckCircle, XCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

import { appointmentService, Appointment } from "@/lib/services/appointments";
import { format } from "date-fns";


export default function DoctorDashboard() {
    const { user } = useAuth();
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const data = await appointmentService.getMyAppointments();
                console.log("Fetched appointments:", data); // Debugging

                if (Array.isArray(data)) {
                    setAppointments(data);
                } else if (data && Array.isArray((data as any).results)) {
                    // Handle paginated response from DRF
                    setAppointments((data as any).results);
                } else {
                    console.error("Unexpected appointments format:", data);
                    setAppointments([]);
                }
            } catch (error) {
                console.error("Failed to fetch appointments", error);
                setAppointments([]); // Ensure it's always an array
            } finally {
                setIsLoading(false);
            }
        };

        fetchAppointments();
    }, [user]);

    const handleStatusChange = async (id: number, newStatus: string) => {
        try {
            await appointmentService.updateStatus(id, newStatus);
            // Optimistic update or refetch
            setAppointments((prev) =>
                prev.map((apt) => (apt.id === id ? { ...apt, status: newStatus as any } : apt))
            );
        } catch (error) {
            console.error("Failed to update status", error);
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">Today's Schedule - {new Date().toLocaleDateString()}</p>
                </div>
                <Button>Block Time</Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Total Patients" value="12" icon={<User className="h-4 w-4 text-muted-foreground" />} />
                <StatCard title="Upcoming" value="8" icon={<Calendar className="h-4 w-4 text-muted-foreground" />} />
                <StatCard title="Completed" value="3" icon={<CheckCircle className="h-4 w-4 text-muted-foreground" />} />
                <StatCard title="Cancelled" value="1" icon={<XCircle className="h-4 w-4 text-muted-foreground" />} />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {Array.isArray(appointments) && appointments.length > 0 ? (
                            appointments.map((apt) => (
                                <div key={apt.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                    <div className="flex gap-4">
                                        <div className="flex flex-col items-center justify-center h-12 w-16 bg-primary/10 rounded-md text-primary font-bold text-sm">
                                            {format(new Date(apt.appointment_datetime), "HH:mm")}
                                            <span className="text-xs font-normal text-muted-foreground">{format(new Date(apt.appointment_datetime), "MMM d")}</span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">{apt.patient.first_name} {apt.patient.last_name}</h3>
                                            <p className="text-sm text-muted-foreground">{apt.reason}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 mt-4 sm:mt-0 w-full sm:w-auto">
                                        {['PENDING', 'CONFIRMED'].includes(apt.status) ? (
                                            <>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="flex-1 sm:flex-none border-green-200 hover:bg-green-50 hover:text-green-600 dark:border-green-900/50 dark:hover:bg-green-900/20"
                                                    onClick={() => handleStatusChange(apt.id, "COMPLETED")}
                                                >
                                                    <CheckCircle className="h-4 w-4 mr-2" /> Complete
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="flex-1 sm:flex-none hover:text-destructive hover:bg-destructive/10"
                                                    onClick={() => handleStatusChange(apt.id, "CANCELLED")}
                                                >
                                                    Cancel
                                                </Button>
                                            </>
                                        ) : (
                                            <span className={cn("text-sm font-medium px-3 py-1 rounded-full",
                                                apt.status === "COMPLETED" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                                                    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400")}>
                                                {apt.status}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8 text-muted-foreground">
                                No appointments found today.
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function StatCard({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
            </CardContent>
        </Card>
    )
}
