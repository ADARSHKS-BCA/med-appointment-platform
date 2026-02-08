// @ts-nocheck

const API_URL = 'http://localhost:4000/api';

async function run() {
    try {
        const timestamp = Date.now();
        // 1. Register a new patient
        const email = `test.patient.${timestamp}@example.com`;
        console.log(`Registering patient: ${email}`);

        const registerRes = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                password: 'password123',
                fullName: 'Test Patient',
                role: 'PATIENT'
            })
        });

        if (!registerRes.ok) {
            const err = await registerRes.text();
            throw new Error(`Registration failed: ${err}`);
        }
        console.log('Registration successful');

        // 2. Login
        console.log('Logging in...');
        const loginRes = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                password: 'password123'
            })
        });

        if (!loginRes.ok) {
            const err = await loginRes.text();
            throw new Error(`Login failed: ${err}`);
        }

        const data = await loginRes.json();
        const { token, user } = data;
        console.log('Logged in user role:', user.role);

        // 3. Get a doctor ID (any doctor)
        console.log('Fetching doctors...');
        const doctorsRes = await fetch(`${API_URL}/doctors`);
        const doctors: any = await doctorsRes.json();
        const doctor = doctors[0];

        if (!doctor) {
            console.log('No doctors found to book with.');
            return;
        }

        // 4. Book appointment
        console.log(`Booking appointment with doctor ${doctor.id}...`);
        const startTime = new Date();
        startTime.setDate(startTime.getDate() + 1); // Tomorrow
        const endTime = new Date(startTime);
        endTime.setMinutes(endTime.getMinutes() + 30);

        const bookingRes = await fetch(`${API_URL}/appointments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                doctorId: doctor.id,
                startTime: startTime.toISOString(),
                endTime: endTime.toISOString(),
                reason: 'Test Appointment'
            })
        });

        if (bookingRes.ok) {
            const booking = await bookingRes.json();
            console.log('Booking successful:', booking);
        } else {
            console.error('Booking failed:', await bookingRes.text());
        }

    } catch (error: any) {
        console.error('Test script failed:', error.message);
    }
}

run();
