# Medical Appointment Management System - Backend

A comprehensive Django REST Framework backend for managing medical appointments between patients and doctors.

## Features

- ✅ **JWT Authentication** - Secure token-based authentication with access and refresh tokens
- ✅ **Role-Based Access Control** - Patient and Doctor roles with specific permissions
- ✅ **User Management** - Registration, login, profile management
- ✅ **Doctor Profiles** - Specializations, clinics, fees, availability schedules
- ✅ **Clinic Management** - Clinic information, location, operating hours
- ✅ **Appointment Booking** - Book, cancel, and manage appointments
- ✅ **Double Booking Prevention** - Database constraints and validation
- ✅ **Notification Triggers** - Django signals for SMS/Email notifications (ready for integration)
- ✅ **API Documentation** - Swagger/ReDoc auto-generated documentation
- ✅ **Cloud-Ready** - Environment-based configuration for easy deployment

## Tech Stack

- **Framework**: Django 4.2.9
- **API**: Django REST Framework 3.14.0
- **Database**: PostgreSQL (local & cloud-ready)
- **Authentication**: JWT (djangorestframework-simplejwt)
- **Documentation**: drf-yasg (Swagger/OpenAPI)
- **CORS**: django-cors-headers

## Project Structure

```
backend/
├── config/                 # Django project configuration
│   ├── settings.py        # Main settings
│   ├── urls.py            # Root URL configuration
│   ├── wsgi.py            # WSGI application
│   └── asgi.py            # ASGI application (Channels-ready)
├── apps/
│   ├── users/             # User management & authentication
│   ├── doctors/           # Doctor profiles & specializations
│   ├── clinics/           # Clinic management
│   └── appointments/      # Appointment booking & management
├── utils/                 # Shared utilities
│   ├── notifications.py   # Notification helpers
│   └── exceptions.py      # Custom exceptions
├── manage.py
├── requirements.txt
├── .env.example
└── README.md
```

## Prerequisites

- Python 3.10 or higher
- PostgreSQL 14 or higher
- pip and virtualenv

## Installation & Setup

### 1. Clone the repository

```bash
cd backend
```

### 2. Create virtual environment

```bash
python -m venv venv
```

### 3. Activate virtual environment

**Windows:**
```bash
venv\Scripts\activate
```

**macOS/Linux:**
```bash
source venv/bin/activate
```

### 4. Install dependencies

```bash
pip install -r requirements.txt
```

### 5. Set up PostgreSQL database

Create a PostgreSQL database:

```sql
CREATE DATABASE med_appointment_db;
CREATE USER postgres WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE med_appointment_db TO postgres;
```

### 6. Configure environment variables

Copy `.env.example` to `.env`:

```bash
copy .env.example .env  # Windows
cp .env.example .env    # macOS/Linux
```

Edit `.env` and update the following:

```env
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

DB_ENGINE=django.db.backends.postgresql
DB_NAME=med_appointment_db
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432

JWT_ACCESS_TOKEN_LIFETIME=60
JWT_REFRESH_TOKEN_LIFETIME=1440

CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

### 7. Run migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 8. Create superuser

```bash
python manage.py createsuperuser
```

### 9. Run development server

```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000/`

## API Endpoints

### Authentication (`/api/auth/`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register/` | Register new user | No |
| POST | `/login/` | Login and get JWT tokens | No |
| POST | `/logout/` | Logout (blacklist token) | Yes |
| GET | `/profile/` | Get user profile | Yes |
| PUT | `/profile/` | Update user profile | Yes |
| POST | `/change-password/` | Change password | Yes |
| POST | `/token/refresh/` | Refresh access token | No |

### Doctors (`/api/doctors/`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | List all doctors | No |
| GET | `/{id}/` | Get doctor details | No |
| PUT | `/{id}/` | Update doctor profile | Yes (Doctor) |
| GET | `/{id}/availability/` | Get availability | No |
| PUT | `/{id}/update_availability/` | Update availability | Yes (Doctor) |
| GET | `/specializations/` | List specializations | No |

### Clinics (`/api/clinics/`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | List all clinics | No |
| GET | `/{id}/` | Get clinic details | No |
| POST | `/` | Create clinic | Yes (Admin) |
| PUT | `/{id}/` | Update clinic | Yes (Admin) |

### Appointments (`/api/appointments/`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | List appointments | Yes |
| POST | `/` | Book appointment | Yes (Patient) |
| GET | `/{id}/` | Get appointment details | Yes |
| DELETE | `/{id}/` | Cancel appointment | Yes |
| PATCH | `/{id}/update_status/` | Update status | Yes (Doctor) |
| GET | `/upcoming/` | Get upcoming appointments | Yes |
| GET | `/past/` | Get past appointments | Yes |

## API Documentation

Once the server is running, access the API documentation:

- **Swagger UI**: http://localhost:8000/swagger/
- **ReDoc**: http://localhost:8000/redoc/
- **JSON Schema**: http://localhost:8000/swagger.json

## Admin Panel

Access the Django admin panel at: http://localhost:8000/admin/

Use the superuser credentials you created earlier.

## Database Schema

### Key Models

- **User**: Custom user model with role-based access (Patient/Doctor)
- **DoctorProfile**: Doctor information, specialization, clinic, fees, availability
- **Specialization**: Medical specializations
- **Clinic**: Clinic details, location, operating hours
- **Appointment**: Appointment bookings with status tracking

### Relationships

- User (1) → DoctorProfile (1) - One-to-one for doctors
- User (1) → Appointments (N) - One-to-many for patients
- DoctorProfile (1) → Appointments (N) - One-to-many
- Clinic (1) → DoctorProfile (N) - One-to-many
- Clinic (1) → Appointments (N) - One-to-many
- Specialization (1) → DoctorProfile (N) - One-to-many

## Testing the API

### 1. Register a patient

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

### 2. Login

```bash
POST http://localhost:8000/api/auth/login/
Content-Type: application/json

{
  "username": "patient1",
  "password": "SecurePass123!"
}
```

Response includes JWT tokens:
```json
{
  "user": {...},
  "tokens": {
    "refresh": "...",
    "access": "..."
  }
}
```

### 3. Book an appointment

```bash
POST http://localhost:8000/api/appointments/
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "doctor_id": 1,
  "clinic_id": 1,
  "appointment_datetime": "2026-02-15T10:00:00Z",
  "reason": "Regular checkup"
}
```

## Deployment

### Cloud PostgreSQL (AWS RDS, Supabase, etc.)

Update `.env`:

```env
DB_HOST=your-cloud-db-host.amazonaws.com
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_PORT=5432
```

No code changes required!

### Future Enhancements

The codebase is prepared for:

- **Redis**: Caching and session storage (commented in settings.py)
- **Django Channels**: WebSocket support for real-time notifications (configured in asgi.py)
- **Email/SMS**: Notification functions ready in `utils/notifications.py`

## Security

- JWT token-based authentication
- Password hashing with Django's built-in validators
- CORS configuration for frontend integration
- Role-based permissions
- SQL injection protection via Django ORM
- CSRF protection
- Secure password validation (min 8 chars, not common, not numeric)

## License

MIT License

## Support

For issues or questions, please contact: contact@medappointment.com
