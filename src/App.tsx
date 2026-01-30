import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import LoginPage from '@/pages/Login';
import LandingPage from '@/pages/LandingPage';
import AboutPage from '@/pages/About'; 


// Patient Pages
import HomePage from '@/pages/patient/Home';
import DoctorsPage from '@/pages/patient/Doctors';
import BookingPage from '@/pages/patient/Booking';
import MyAppointments from '@/pages/patient/MyAppointments';

// Layouts
import MainLayout from '@/layouts/MainLayout';
import DoctorLayout from '@/layouts/DoctorLayout';
import AdminLayout from '@/layouts/AdminLayout';

// Role Pages
import DoctorDashboard from '@/pages/doctor/Dashboard';
import AdminDashboard from '@/pages/admin/Dashboard';
import AdminDoctorsPage from '@/pages/admin/Doctors';

import { useAuth } from '@/context/auth-context';

function ProtectedRoute({ allowedRoles }: { allowedRoles: string[] }) {
    const { user, isLoading } = useAuth();

    if (isLoading) return <div>Loading...</div>;

    if (!user) return <Navigate to="/login" replace />;

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<LandingPage />} />

                {/* Patient Routes */}
                <Route element={<MainLayout />}>
                    <Route path="/dashboard" element={<HomePage />} />
                    <Route path="/doctors" element={<DoctorsPage />} />
                    <Route path="/book/:doctorId" element={<BookingPage />} />
                    <Route path="/my-appointments" element={<MyAppointments />} />
                    <Route path="/about" element={<AboutPage />} />
                </Route>

                {/* Doctor Routes */}
                <Route element={<ProtectedRoute allowedRoles={['doctor']} />}>
                    <Route element={<DoctorLayout />}>
                        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
                    </Route>
                </Route>

                {/* Admin Routes */}
                <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                    <Route element={<AdminLayout />}>
                        <Route path="/admin/dashboard" element={<AdminDashboard />} />
                        <Route path="/admin/doctors" element={<AdminDoctorsPage />} />
                    </Route>
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    )
}
