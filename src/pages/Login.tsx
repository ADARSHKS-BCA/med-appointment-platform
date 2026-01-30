import { useState, Suspense } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
    return (
        <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
            <LoginFormWrapper />
        </Suspense>
    )
}

function LoginFormWrapper() {
    const navigate = useNavigate();
    const { login, error } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    // Default redirect based on role is handled in useAuth or here manually
    // const redirectPath = searchParams.get("redirect");

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const user = await login({
                username: formData.username,
                password: formData.password
            });

            if (user.role === 'DOCTOR') {
                navigate("/doctor/dashboard");
            } else {
                navigate("/dashboard");
            }
            // Ideally we should know the role. 
            // Let's just navigate to root for now, or check local storage

        } catch (err) {
            // Error is handled in context and displayed
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center px-4 bg-muted/30">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-primary">MediConnect</h1>
                    <p className="text-muted-foreground mt-2">Sign in to your account</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                        <CardDescription>
                            Enter your credentials to access your account.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && (
                                <Alert variant="destructive">
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}
                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    name="username"
                                    placeholder="Enter your username"
                                    value={formData.username}
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
                            <Button className="w-full" type="submit" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Signing in...
                                    </>
                                ) : (
                                    "Sign In"
                                )}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-center border-t p-4">
                        <p className="text-sm text-muted-foreground">
                            Don't have an account?{" "}
                            <Link to="/register" className="text-primary hover:underline">
                                Register
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
