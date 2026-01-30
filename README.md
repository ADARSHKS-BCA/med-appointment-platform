# MediConnect - Medical Appointment Platform

A modern healthcare appointment booking platform connecting patients with doctors and clinics. Built with a React frontend and Django backend.

## 🚀 Technologies

### Frontend
- **Framework:** React 18 (Vite)
- **Styling:** TailwindCSS, Shadcn UI
- **Icons:** Lucide React
- **State Management:** React Context API
- **Routing:** React Router DOM

### Backend
- **Framework:** Django 5
- **API:** Django REST Framework (DRF)
- **Authentication:** JWT (Simple JWT)
- **Database:** SQLite (Dev) / PostgreSQL (Prod ready)

## ✨ Features

- **Patient Portal:**
    - User Registration & Authentication
    - Search for Doctors/Clinics
    - Book Appointments
    - View Appointment History
- **Doctor Dashboard:**
    - View Daily Schedule
    - Manage Appointment Status (Confirm, Complete, Cancel)
    - Patient Details Overview
- **Clinic Management:**
    - Manage Doctors and Slots

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
   ```bash
   # Windows
   python -m venv venv
   .\venv\Scripts\activate

   # macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run migrations:
   ```bash
   python manage.py migrate
   ```

5. Start the server:
   ```bash
   python manage.py runserver
   ```
   The API will be available at `http://localhost:8000`.

### Frontend Setup

1. Navigate to the project root (if not already there):
   ```bash
   cd ..
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`.

## 🔑 Default Credentials (Dev)

*Note: Ensure you create a superuser for admin access.*

```bash
python manage.py createsuperuser
```
