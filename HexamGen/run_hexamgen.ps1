# run_hexamgen.ps1
# PowerShell script to setup + run HexamGen locally on Windows

# === CONFIG ===
$DB_NAME = "hexamgen"
$DB_USER = "ved"
$DB_PASS = "v"
$VENV_DIR = "venv"

Write-Host "📦 Installing Python dependencies..."
pip install --upgrade pip
pip install fastapi uvicorn sqlalchemy psycopg2-binary alembic `
    "python-jose[cryptography]" "passlib[bcrypt]" pydantic PyJWT

# === PostgreSQL check ===
Write-Host "🗄 Checking PostgreSQL installation..."
if (-not (Get-Command psql -ErrorAction SilentlyContinue)) {
    Write-Host "❌ PostgreSQL not found. Please install from: https://www.postgresql.org/download/windows/"
    exit 1
}

# === Start PostgreSQL service ===
Write-Host "🚀 Starting PostgreSQL service..."
Start-Service postgresql* -ErrorAction SilentlyContinue

# === Create DB + user (ignore if exists) ===
Write-Host "🛠 Setting up database..."
$checkUser = psql -U postgres -tAc "SELECT 1 FROM pg_roles WHERE rolname='$DB_USER'"
if ($checkUser -ne "1") {
    psql -U postgres -c "CREATE USER $DB_USER WITH PASSWORD '$DB_PASS';"
}

$checkDB = psql -U postgres -tAc "SELECT 1 FROM pg_database WHERE datname='$DB_NAME'"
if ($checkDB -ne "1") {
    psql -U postgres -c "CREATE DATABASE $DB_NAME OWNER $DB_USER;"
}

psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;"

# === Virtualenv setup ===
if (-not (Test-Path $VENV_DIR)) {
    Write-Host "🐍 Creating virtualenv..."
    python -m venv $VENV_DIR
}

Write-Host "📂 Activating virtualenv..."
& "$VENV_DIR\Scripts\Activate.ps1"

# === Run FastAPI ===
Write-Host "🚀 Running FastAPI app..."
uvicorn main:app --reload
