import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Activity, DollarSign } from "lucide-react";
import React from 'react';

export default function AdminDashboard() {
    return (
        
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Admin Overview</h1>
                <Button>Download Report</Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Total Appointments" value="1,248" icon={<Calendar className="h-4 w-4 text-muted-foreground" />} description="+4.1% from last month" />
                <StatCard title="Active Doctors" value="14" icon={<Activity className="h-4 w-4 text-muted-foreground" />} description="2 on leave" />
                <StatCard title="Registered Patients" value="8,500" icon={<Users className="h-4 w-4 text-muted-foreground" />} description="+12% new users" />
                <StatCard title="Revenue (Est)" value="$42.5k" icon={<DollarSign className="h-4 w-4 text-muted-foreground" />} description="+2.5% from last month" />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Recent Appointments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RecentAppointments />
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Clinic Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">New Doctor Registered</p>
                                    <p className="text-sm text-muted-foreground">Dr. Alice wandered in.</p>
                                </div>
                                <div className="ml-auto font-medium text-xs text-muted-foreground">2m ago</div>
                            </div>
                            {/* More activity items... */}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function StatCard({ title, value, icon, description }: { title: string; value: string; icon: React.ReactNode; description: string }) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground">{description}</p>
            </CardContent>
        </Card>
    )
}

function RecentAppointments() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {[
                    { id: "APT001", patient: "John Doe", doctor: "Dr. Smith", status: "Confirmed" },
                    { id: "APT002", patient: "Jane Smith", doctor: "Dr. Adams", status: "Pending" },
                    { id: "APT003", patient: "Bob Brown", doctor: "Dr. Smith", status: "Cancelled" },
                ].map((apt) => (
                    <TableRow key={apt.id}>
                        <TableCell className="font-medium">{apt.id}</TableCell>
                        <TableCell>{apt.patient}</TableCell>
                        <TableCell>{apt.doctor}</TableCell>
                        <TableCell className="text-right">
                            <Badge variant={apt.status === "Confirmed" ? "default" : apt.status === "Cancelled" ? "destructive" : "secondary"}>
                                {apt.status}
                            </Badge>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
