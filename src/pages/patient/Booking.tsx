import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { doctors } from "@/lib/data";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Time Slots
const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "02:00 PM", "02:30 PM",
    "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
];

export default function BookingPage() {
    const { doctorId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const doctor = doctors.find(d => d.id === doctorId);

    const [date, setDate] = useState<Date | undefined>(new Date());
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [step, setStep] = useState<1 | 2 | 3>(1);

    if (!doctor) {
        return <div className="container py-10 text-center">Doctor not found</div>;
    }

    const handleBook = () => {
        if (!user) {
            navigate(`/login?redirect=/book/${doctor.id}`);
            return;
        }
        setStep(3); // Success/Processing
    };

    if (step === 3) {
        return (
            <div className="container py-12 flex flex-col items-center justify-center max-w-lg mx-auto text-center space-y-6">
                <div className="rounded-full bg-green-100 p-6 text-green-600">
                    <CheckCircle className="h-12 w-12" />
                </div>
                <h1 className="text-3xl font-bold">Booking Confirmed!</h1>
                <p className="text-muted-foreground">
                    Your appointment with <span className="font-semibold text-foreground">{doctor.name}</span> is set for <br />
                    <span className="font-semibold text-foreground">{date ? format(date, "PPP") : ""}</span> at <span className="font-semibold text-foreground">{selectedTime}</span>.
                </p>
                <div className="flex gap-4 pt-4">
                    <Link to="/my-appointments">
                        <Button variant="outline">View Appointments</Button>
                    </Link>
                    <Link to="/">
                        <Button>Back Home</Button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="container py-8 max-w-5xl mx-auto px-4">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight mb-2">Book Appointment</h1>
                <p className="text-muted-foreground">Select a date and time to visit {doctor.name}.</p>
            </div>

            <div className="grid md:grid-cols-[1fr_350px] gap-8">
                {/* Left Column: Selection */}
                <div className="space-y-8">
                    {/* Date Selection */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CalendarIcon className="h-5 w-5" /> Select Date
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="rounded-md border w-fit mx-auto md:mx-0"
                                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                            />
                        </CardContent>
                    </Card>

                    {/* Time Selection */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Clock className="h-5 w-5" /> Select Time
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                                {timeSlots.map((time) => (
                                    <Button
                                        key={time}
                                        variant={selectedTime === time ? "default" : "outline"}
                                        className={cn("text-xs sm:text-sm", selectedTime === time && "ring-2 ring-primary ring-offset-2")}
                                        onClick={() => setSelectedTime(time)}
                                    >
                                        {time}
                                    </Button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Summary & Confirm */}
                <div>
                    <Card className="sticky top-24">
                        <CardHeader className="bg-muted/40 pb-4">
                            <CardTitle className="text-lg">Appointment Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold">
                                    {doctor.name.charAt(4)}
                                </div>
                                <div>
                                    <p className="font-semibold">{doctor.name}</p>
                                    <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                                </div>
                            </div>

                            <div className="border-t pt-4 space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Date</span>
                                    <span className="font-medium">{date ? format(date, "PPP") : "Select date"}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Time</span>
                                    <span className="font-medium">{selectedTime || "Select time"}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Clinic</span>
                                    <span className="font-medium">{doctor.location}</span>
                                </div>
                            </div>

                            {!user && (
                                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-md text-xs text-yellow-800 dark:text-yellow-200 mt-4">
                                    Note: You will be asked to log in to confirm this booking.
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="pt-2">
                            <Button
                                className="w-full h-12 text-lg"
                                disabled={!date || !selectedTime}
                                onClick={handleBook}
                            >
                                {user ? "Confirm Booking" : "Login to Confirm"}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
