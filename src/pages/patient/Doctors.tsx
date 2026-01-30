import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Star, Calendar, Loader2 } from "lucide-react";
import { doctorService, Doctor } from "@/lib/services/doctors";

export default function DoctorsPage() {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const data = await doctorService.getAllDoctors();
                setDoctors(data);
            } catch (error) {
                console.error("Failed to fetch doctors", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDoctors();
    }, []);

    const filteredDoctors = doctors.filter(doctor =>
        doctor.user?.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.user?.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialization?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container py-8 mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Find a Doctor</h1>
                    <p className="text-muted-foreground">Book an appointment with top specialists.</p>
                </div>

                <div className="flex gap-2 w-full md:w-auto">
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by name or specialty"
                            className="pl-8"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredDoctors.map((doctor) => (
                        <Card key={doctor.id} className="overflow-hidden hover:shadow-md transition-shadow">
                            <div className="aspect-video bg-muted relative">
                                {doctor.user.profile_picture ? (
                                    <img
                                        src={doctor.user.profile_picture}
                                        alt={`${doctor.user.first_name}`}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-secondary">
                                        No Image
                                    </div>
                                )}
                            </div>
                            <CardHeader className="p-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-lg">Dr. {doctor.user?.first_name} {doctor.user?.last_name}</CardTitle>
                                        <p className="text-sm text-primary font-medium">{doctor.specialization?.name || "General"}</p>
                                    </div>
                                    <div className="flex items-center text-amber-500 text-xs font-bold gap-1">
                                        <Star className="h-3 w-3 fill-current" /> {doctor.rating || 4.5}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-4 pt-0 text-sm text-muted-foreground space-y-2">
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4" /> {doctor.clinic?.city || "Unknown Location"}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" /> {doctor.experience_years} years exp.
                                </div>
                            </CardContent>
                            <CardFooter className="p-4 border-t bg-muted/20">
                                <Link to={`/book/${doctor.id}`} className="w-full">
                                    <Button className="w-full">Book Appointment</Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}

                    {filteredDoctors.length === 0 && (
                        <div className="col-span-full text-center py-10 text-muted-foreground">
                            No doctors found.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
