import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, User, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

// Mock Appointments
const initialAppointments = [
    {
        id: "201",
        patientName: "John Doe",
        time: "09:00 AM",
        type: "Regular Checkup",
        status: "Upcoming",
    },
    {
        id: "202",
        patientName: "Sarah Connor",
        time: "10:30 AM",
        type: "Cardiology Consult",
        status: "Upcoming",
    },
    {
        id: "203",
        patientName: "Mike Ross",
        time: "02:00 PM",
        type: "Follow-up",
        status: "Cancelled",
    },
];

export default function DoctorDashboard() {
    const { user } = useAuth();
    const [appointments, setAppointments] = useState(initialAppointments);

    const handleStatusChange = (id: string, newStatus: string) => {
        setAppointments((prev) =>
            prev.map((apt) => (apt.id === id ? { ...apt, status: newStatus } : apt))
        );
    };

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
                        {appointments.map((apt) => (
                            <div key={apt.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                <div className="flex gap-4">
                                    <div className="flex flex-col items-center justify-center h-12 w-16 bg-primary/10 rounded-md text-primary font-bold text-sm">
                                        {apt.time.split(" ")[0]}
                                        <span className="text-xs font-normal text-muted-foreground">{apt.time.split(" ")[1]}</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">{apt.patientName}</h3>
                                        <p className="text-sm text-muted-foreground">{apt.type}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 mt-4 sm:mt-0 w-full sm:w-auto">
                                    {apt.status === "Upcoming" ? (
                                        <>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="flex-1 sm:flex-none border-green-200 hover:bg-green-50 hover:text-green-600 dark:border-green-900/50 dark:hover:bg-green-900/20"
                                                onClick={() => handleStatusChange(apt.id, "Completed")}
                                            >
                                                <CheckCircle className="h-4 w-4 mr-2" /> Complete
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="flex-1 sm:flex-none hover:text-destructive hover:bg-destructive/10"
                                                onClick={() => handleStatusChange(apt.id, "Cancelled")}
                                            >
                                                Cancel
                                            </Button>
                                        </>
                                    ) : (
                                        <span className={cn("text-sm font-medium px-3 py-1 rounded-full",
                                            apt.status === "Completed" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                                                "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400")}>
                                            {apt.status}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
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
