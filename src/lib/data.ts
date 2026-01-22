export interface Doctor {
    id: string;
    name: string;
    specialty: string;
    image: string;
    rating: number;
    experience: number;
    location: string;
    availableDays: string[];
}

export const doctors: Doctor[] = [
    {
        id: "1",
        name: "Dr. Emily Chen",
        specialty: "Cardiologist",
        image: "/placeholder-doctor.jpg",
        rating: 4.8,
        experience: 12,
        location: "Main Clinic",
        availableDays: ["Mon", "Wed", "Fri"],
    },
    {
        id: "2",
        name: "Dr. James Wilson",
        specialty: "Dermatologist",
        image: "/placeholder-doctor.jpg",
        rating: 4.9,
        experience: 8,
        location: "Downtown Branch",
        availableDays: ["Tue", "Thu", "Sat"],
    },
    {
        id: "3",
        name: "Dr. Sarah Johnson",
        specialty: "Pediatrician",
        image: "/placeholder-doctor.jpg",
        rating: 4.7,
        experience: 15,
        location: "Main Clinic",
        availableDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    },
    {
        id: "4",
        name: "Dr. Michael Brown",
        specialty: "General Practitioner",
        image: "/placeholder-doctor.jpg",
        rating: 4.6,
        experience: 5,
        location: "Westside Clinic",
        availableDays: ["Mon", "Wed", "Sat"],
    }
];

export const specialties = [
    "General Practitioner",
    "Cardiologist",
    "Dermatologist",
    "Pediatrician",
    "Neurologist",
    "Orthopedic Surgeon",
];
