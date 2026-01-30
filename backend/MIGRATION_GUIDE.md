# Migrating from SQLite to PostgreSQL

This guide walks you through moving your existing data from SQLite to a production-ready PostgreSQL database.

## Prerequisites

1.  **Install PostgreSQL**: Download and install from [postgresql.org/download/windows/](https://www.postgresql.org/download/windows/).
2.  **Create a Database**: Open **pgAdmin 4** (installed with Postgres) or use the command line to create a new empty database named `med_appointment_db`.

## Step 1: Dump Existing Data (Backup)

We need to export your current data from SQLite. We exclude system tables (`auth.permission`, `contenttypes`) to avoid conflicts during the import.

Run this command in your `backend` terminal:

```bash
# Activate venv first if not active
python manage.py dumpdata --exclude auth.permission --exclude contenttypes > datadump.json
```

## Step 2: Configure PostgreSQL

Create a `.env` file in the `backend` folder (if you haven't already) to securely store your credentials.

**File:** `backend/.env`
```env
# ... existing settings ...
DEBUG=True
SECRET_KEY=your_secret_key

# Database Settings
DB_ENGINE=django.db.backends.postgresql
DB_NAME=med_appointment_db
DB_USER=postgres
DB_PASSWORD=your_postgres_password
DB_HOST=localhost
DB_PORT=5432
```

*> Note: Replace `your_postgres_password` with the password you set during installation.*

## Step 3: Initialize the New Database

Now that `settings.py` is reading from the `.env` configuration (or if you updated `settings.py` directly), run the migrations against the new PostgreSQL database.

```bash
python manage.py migrate
```

*> This creates all the empty tables in PostgreSQL.*

## Step 4: Import Data

Load the data we dumped in Step 1.

```bash
python manage.py loaddata datadump.json
```

## Step 5: Verification

Start the server and test.

```bash
python manage.py runserver
```

You should now see all your users, appointments, and doctors, but they are now served from PostgreSQL!
