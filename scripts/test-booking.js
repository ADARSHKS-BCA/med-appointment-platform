
const API_URL = 'http://localhost:4000/api';

async function run() {
    try {
        const timestamp = Date.now();
        // 1. Register a Doctor first (so we can control the doctor side)
        const doctorEmail = `test.doctor.${timestamp}@example.com`;
        console.log(`Registering DOCTOR: ${doctorEmail}`);

        await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: doctorEmail,
                password: 'password123',
                fullName: 'Test Doctor',
                role: 'DOCTOR'
            })
        });

        // Login as Doctor to get token and ID
        const doctorLogin = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: doctorEmail, password: 'password123' })
        });
        const doctorData = await doctorLogin.json();
        const doctorToken = doctorData.token;
        const doctorId = doctorData.user.doctorProfile?.id; // Note: Login response might need to return profile ID, or we fetch profile

        // Use the existing "Get Doctors" to find this new doctor's ID if not in login response
        // But for simplicity, let's just book with the FIRST doctor found, and then try to login as THAT doctor if possible?
        // No, we can't login as existing doctors without password.

        // So we MUST use the doctor we just created.
        // Let's get the doctor profile ID.
        // Since we JUST registered, the doctor profile might be PENDING/Hidden. 
        // But the ID exists. 
        // Let's assume the login response doesn't give profile ID. Let's fetch /doctors/me logic? No endpoint yet.

        // Workaround: Fetch all doctors (even pending?) No, /doctors only returns approved.
        // HACK: We will try to update status using the DOCTOR TOKEN on the appointment.
        // But we need to book with THIS doctor.

        // Let's fetch /auth/me or verify token to get ID?
        // Actually, the appointment creation needs `doctorId`.
        // Let's hope the doctor we registered appears in the DB.
        // Wait, default status is PENDING.
        // So we can't book with them if the frontend filters by approved.
        // But the API might allow booking with any doctor ID.

        // To get the doctor ID, let's cheat and use the `user.id` to specific lookup? No.
        // The `createAppointment` takes `doctorId` (UUID of Doctor model).

        // Let's try to update the status of an appointment created for the first available doctor, 
        // BUT we don't have that doctor's credentials.

        // OK, alternate plan:
        // 1. Patient makes appointment with Doctor X.
        // 2. Patient CANCELS appointment (Patient allowed).
        // 3. Verify status matches.

        console.log('Testing Patient Cancellation Flow...');

        // 1. Register Patient
        const patientEmail = `test.patient.${timestamp}@example.com`;
        const patientReg = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: patientEmail, password: 'password123', fullName: 'Test Patient', role: 'PATIENT' })
        });
        if (!patientReg.ok) throw new Error('Patient Reg Failed');

        const patientLogin = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: patientEmail, password: 'password123' })
        });
        const patientData = await patientLogin.json();
        const patientToken = patientData.token;

        // 2. Get Doctor
        const doctorsRes = await fetch(`${API_URL}/doctors`);
        const doctors = await doctorsRes.json();
        const doctor = doctors[0];
        if (!doctor) throw new Error('No doctors');

        // 3. Book
        const bookingRes = await fetch(`${API_URL}/appointments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${patientToken}` },
            body: JSON.stringify({
                doctorId: doctor.id,
                startTime: new Date().toISOString(),
                endTime: new Date().toISOString(),
                reason: 'To be cancelled'
            })
        });
        const booking = await bookingRes.json();
        console.log('Booked ID:', booking.id, 'Status:', booking.status);

        // 4. Cancel as Patient
        const cancelRes = await fetch(`${API_URL}/appointments/${booking.id}/status`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${patientToken}` },
            body: JSON.stringify({ status: 'CANCELLED' })
        });

        if (cancelRes.ok) {
            const updated = await cancelRes.json();
            console.log('Updated Status:', updated.status);
            if (updated.status === 'CANCELLED') console.log('SUCCESS: Appointment cancelled by patient.');
        } else {
            console.error('Cancellation Failed:', await cancelRes.text());
        }

    } catch (error) {
        console.error('Test script failed:', error.message);
    }
}

run();
