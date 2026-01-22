import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { doctors } from "@/lib/data";
import { Search, MapPin, Star, Calendar } from "lucide-react";

export default function DoctorsPage() {
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
                        <Input placeholder="Search by name or specialty" className="pl-8" />
                    </div>
                    {/* Filtering selection could go here */}
                </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {doctors.map((doctor) => (
                    <Card key={doctor.id} className="overflow-hidden hover:shadow-md transition-shadow">
                        <div className="aspect-video bg-muted relative">
                            {/* Placeholder for real image */}
                            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                                No Image
                            </div>
                        </div>
                        <CardHeader className="p-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-lg">{doctor.name}</CardTitle>
                                    <p className="text-sm text-primary font-medium">{doctor.specialty}</p>
                                </div>
                                <div className="flex items-center text-amber-500 text-xs font-bold gap-1">
                                    <Star className="h-3 w-3 fill-current" /> {doctor.rating}
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-0 text-sm text-muted-foreground space-y-2">
                            <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" /> {doctor.location}
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" /> {doctor.experience} years exp.
                            </div>
                        </CardContent>
                        <CardFooter className="p-4 border-t bg-muted/20">
                            <Link to={`/book/${doctor.id}`} className="w-full">
                                <Button className="w-full">Book Appointment</Button>
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
