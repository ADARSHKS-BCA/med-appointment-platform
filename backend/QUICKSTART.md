# Quick Start Guide

## The backend is ready! Here's how to use it:

### 1. Create a superuser (for admin access)
```bash
cd backend
.\venv\Scripts\activate
python manage.py createsuperuser
```

### 2. Run the development server
```bash
python manage.py runserver
```

### 3. Access the application
- **API Root**: http://localhost:8000/api/
- **Admin Panel**: http://localhost:8000/admin/
- **Swagger Documentation**: http://localhost:8000/swagger/
- **ReDoc Documentation**: http://localhost:8000/redoc/

### 4. Test the API

#### Register a patient:
```bash
POST http://localhost:8000/api/auth/register/
Content-Type: application/json

{
  "username": "patient1",
  "email": "patient@example.com",
  "password": "SecurePass123!",
  "password_confirm": "SecurePass123!",
  "first_name": "John",
  "last_name": "Doe",
  "phone": "+1234567890",
  "role": "PATIENT"
}
```

#### Login:
```bash
POST http://localhost:8000/api/auth/login/
Content-Type: application/json

{
  "username": "patient1",
  "password": "SecurePass123!"
}
```

### 5. Switch to PostgreSQL (when ready)

Edit `.env` file:
```env
DB_ENGINE=django.db.backends.postgresql
DB_NAME=med_appointment_db
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
```

Then run:
```bash
python manage.py migrate
```

## What's Included

✅ User authentication with JWT
✅ Role-based access control (Patient/Doctor)
✅ Doctor profiles with specializations
✅ Clinic management
✅ Appointment booking with double booking prevention
✅ Notification triggers (ready for SMS/Email integration)
✅ API documentation (Swagger/ReDoc)
✅ Admin panel
✅ Cloud-ready configuration

## Next Steps

1. Install and configure PostgreSQL
2. Integrate SMS service (Twilio) in `utils/notifications.py`
3. Integrate Email service in `utils/notifications.py`
4. Add Redis for caching (optional)
5. Add Django Channels for WebSockets (optional)
6. Deploy to cloud (AWS, Heroku, etc.)
