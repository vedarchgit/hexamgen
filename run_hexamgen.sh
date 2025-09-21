#!/bin/bash
set -e  # stop on first error

# === CONFIG ===
DB_NAME="hexamgen"
DB_USER="ved"
DB_PASS="v"
VENV_DIR="venv"

# === Install Python dependencies ===
echo "📦 Installing Python packages..."
pip3 install --upgrade pip
pip3 install fastapi uvicorn sqlalchemy psycopg2-binary alembic \
             "python-jose[cryptography]" "passlib[bcrypt]" pydantic PyJWT

# === PostgreSQL install & setup (only if on Arch/Manjaro) ===
if command -v pacman &> /dev/null; then
    echo "🗄 Installing PostgreSQL (Arch/Manjaro detected)..."
    sudo pacman -S --noconfirm postgresql
fi

# Initialize DB cluster if not already done
if [ ! -d "/var/lib/postgres/data" ]; then
    echo "📂 Initializing PostgreSQL cluster..."
    sudo -iu postgres initdb -D /var/lib/postgres/data
fi

# Start PostgreSQL
echo "🚀 Starting PostgreSQL..."
sudo systemctl start postgresql
sudo systemctl enable postgresql

# === Create DB + user (ignore if exists) ===
echo "🛠 Setting up database..."
sudo -iu postgres psql -tc "SELECT 1 FROM pg_roles WHERE rolname='$DB_USER'" | grep -q 1 || \
    sudo -iu postgres psql -c "CREATE USER $DB_USER WITH PASSWORD '$DB_PASS';"

sudo -iu postgres psql -tc "SELECT 1 FROM pg_database WHERE datname='$DB_NAME'" | grep -q 1 || \
    sudo -iu postgres psql -c "CREATE DATABASE $DB_NAME OWNER $DB_USER;"

sudo -iu postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;"

# === Virtualenv setup ===
if [ ! -d "$VENV_DIR" ]; then
    echo "🐍 Creating virtualenv..."
    python -m venv $VENV_DIR
fi

source $VENV_DIR/bin/activate

# === Run FastAPI ===
echo "🚀 Running FastAPI app..."
uvicorn main:app --reload
