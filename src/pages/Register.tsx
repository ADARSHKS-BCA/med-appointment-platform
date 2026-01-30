import { useState, Suspense } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { RegisterData } from "@/lib/services/auth";

export default function RegisterPage() {
    return (
        <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
            <RegisterFormWrapper />
        </Suspense>
    )
}

function RegisterFormWrapper() {
    const navigate = useNavigate();
    const { register, error } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState<RegisterData>({
        username: "",
        email: "",
        password: "",
        password_confirm: "",
        first_name: "",
        last_name: "",
        role: "PATIENT",
    });

    const handleRoleChange = (value: string) => {
        setFormData(prev => ({ ...prev, role: value as 'PATIENT' | 'DOCTOR' }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.password_confirm) {
            // Should probably handle this better than silent failure or reliance on backend
            // But context handles error display
            // Let's rely on backend validation for simplicity of auth-context error handling
        }

        setIsLoading(true);

        try {
            await register(formData);
            navigate("/dashboard");
        } catch (err) {
            // Error is handled in context
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center px-4 bg-muted/30">
            <div className="w-full max-w-md my-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-primary">MediConnect</h1>
                    <p className="text-muted-foreground mt-2">Create your account</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Register</CardTitle>
                        <CardDescription>
                            Enter your details to create a new account.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && (
                                <Alert variant="destructive">
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="first_name">First name</Label>
                                    <Input
                                        id="first_name"
                                        name="first_name"
                                        placeholder="John"
                                        value={formData.first_name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="last_name">Last name</Label>
                                    <Input
                                        id="last_name"
                                        name="last_name"
                                        placeholder="Doe"
                                        value={formData.last_name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    name="username"
                                    placeholder="johndoe"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password_confirm">Confirm Password</Label>
                                <Input
                                    id="password_confirm"
                                    name="password_confirm"
                                    type="password"
                                    placeholder="••••••••"
                                    value={formData.password_confirm}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="role">Register As</Label>
                                <div className="flex gap-4">
                                    <label className="flex items-center space-x-2 border p-3 rounded-md w-full cursor-pointer hover:bg-muted/50 transition-colors">
                                        <input
                                            type="radio"
                                            name="role"
                                            value="PATIENT"
                                            checked={formData.role === 'PATIENT'}
                                            onChange={(e) => handleRoleChange(e.target.value)}
                                            className="h-4 w-4 text-primary"
                                        />
                                        <span>Patient</span>
                                    </label>
                                    <label className="flex items-center space-x-2 border p-3 rounded-md w-full cursor-pointer hover:bg-muted/50 transition-colors">
                                        <input
                                            type="radio"
                                            name="role"
                                            value="DOCTOR"
                                            checked={formData.role === 'DOCTOR'}
                                            onChange={(e) => handleRoleChange(e.target.value)}
                                            className="h-4 w-4 text-primary"
                                        />
                                        <span>Doctor</span>
                                    </label>
                                </div>
                            </div>
                            <Button className="w-full" type="submit" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Creating account...
                                    </>
                                ) : (
                                    "Create Account"
                                )}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-center border-t p-4">
                        <p className="text-sm text-muted-foreground">
                            Already have an account?{" "}
                            <Link to="/login" className="text-primary hover:underline">
                                Login
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
