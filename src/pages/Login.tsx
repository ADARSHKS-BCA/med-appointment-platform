import { useState, Suspense } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LoginPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginFormWrapper />
        </Suspense>
    )
}

function LoginFormWrapper() {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const redirectPath = searchParams.get("redirect");

    const handleLogin = async (role: "patient" | "doctor" | "admin") => {
        setIsLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        login(role);

        if (redirectPath) {
            navigate(redirectPath);
        } else {
            if (role === "patient") navigate("/dashboard");
            else if (role === "doctor") navigate("/doctor/dashboard");
            else if (role === "admin") navigate("/admin/dashboard");
        }

        setIsLoading(false);
    };

    return (
        <div className="flex min-h-screen items-center justify-center px-4 bg-muted/30">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-primary">ClinicApp</h1>
                    <p className="text-muted-foreground mt-2">Sign in to your account</p>
                </div>

                <Tabs defaultValue="patient" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-6">
                        <TabsTrigger value="patient">Patient</TabsTrigger>
                        <TabsTrigger value="doctor">Doctor</TabsTrigger>
                        <TabsTrigger value="admin">Admin</TabsTrigger>
                    </TabsList>

                    <TabsContent value="patient">
                        <LoginForm role="patient" onSubmit={() => handleLogin("patient")} isLoading={isLoading} />
                    </TabsContent>
                    <TabsContent value="doctor">
                        <LoginForm role="doctor" onSubmit={() => handleLogin("doctor")} isLoading={isLoading} />
                    </TabsContent>
                    <TabsContent value="admin">
                        <LoginForm role="admin" onSubmit={() => handleLogin("admin")} isLoading={isLoading} />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

function LoginForm({ role, onSubmit, isLoading }: { role: string; onSubmit: () => void; isLoading: boolean }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="capitalize">{role} Login</CardTitle>
                <CardDescription>
                    Enter your details to access your {role} account.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor={`email-${role}`}>Email</Label>
                    <Input id={`email-${role}`} type="email" placeholder={`name@example.com`} defaultValue={role === "patient" ? "" : role + "@clinic.com"} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor={`password-${role}`}>Password</Label>
                    <Input id={`password-${role}`} type="password" />
                </div>
                <Button className="w-full" onClick={onSubmit} disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                </Button>
            </CardContent>
        </Card>
    );
}
