import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

// Mock Appointments
const appointments = [
    {
        id: "101",
        doctorName: "Dr. Emily Chen",
        specialty: "Cardiologist",
        date: "Oct 24, 2026",
        time: "10:00 AM",
        location: "Main Clinic",
        status: "Upcoming",
    },
    {
        id: "102",
        doctorName: "Dr. James Wilson",
        specialty: "Dermatologist",
        date: "Nov 02, 2026",
        time: "02:30 PM",
        location: "Downtown Branch",
        status: "Confirmed",
    }
];

export default function MyAppointments() {
    const { user, isLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && !user) {
            navigate("/login");
        }
    }, [user, isLoading, navigate]);

    if (isLoading || !user) {
        return <div className="container py-10 text-center">Loading...</div>;
    }

    return (
        <div className="container py-10 max-w-4xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold tracking-tight">My Appointments</h1>
                <Link to="/doctors">
                    <Button>Book New</Button>
                </Link>
            </div>

            <div className="grid gap-4">
                {appointments.map((apt) => (
                    <Card key={apt.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-2">
                        <div className="flex-1 p-4 space-y-2">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="font-semibold text-lg">{apt.doctorName}</h3>
                                    <p className="text-sm text-muted-foreground">{apt.specialty}</p>
                                </div>
                                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
                                    {apt.status}
                                </span>
                            </div>

                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground pt-2">
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" /> {apt.date}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" /> {apt.time}
                                </div>
                                <div className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4" /> {apt.location}
                                </div>
                            </div>
                        </div>
                        <CardFooter className="p-4 pt-0 md:pt-4 flex gap-2 w-full md:w-auto justify-start md:justify-end border-t md:border-t-0 bg-muted/10 md:bg-transparent">
                            <Button variant="outline" size="sm" className="w-full md:w-auto">Reschedule</Button>
                            <Button variant="destructive" size="sm" className="w-full md:w-auto">Cancel</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
