import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { prisma } from '@mediconnect/database';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (mobile apps, curl, etc.)
        if (!origin) return callback(null, true);

        const allowed = [
            'http://localhost:3000',
            process.env.FRONTEND_URL,
        ].filter(Boolean);

        if (allowed.includes(origin) || origin.includes('med-appointment-platform') && origin.endsWith('.vercel.app')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Health Check
app.get('/health', async (req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`;
        res.json({ status: 'ok', db: 'connected' });
    } catch (error) {
        console.error('Database connection failed', error);
        res.status(500).json({ status: 'error', db: 'disconnected' });
    }
});

import authRoutes from './routes/auth.routes';
import doctorRoutes from './routes/doctor.routes';
import patientRoutes from './routes/patient.routes';
import appointmentRoutes from './routes/appointment.routes';

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/appointments', appointmentRoutes);

app.listen(PORT, () => {
    console.log(`API server running on http://localhost:${PORT}`);
});
