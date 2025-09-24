can we make sim🚀 HexamGen Setup Guide

HexamGen is a FastAPI + PostgreSQL academic assistant.
Follow the steps below to set it up locally.

🔧 Prerequisites

Python 3.10+

PostgreSQL 13+

Git

🐧 Linux / macOS Setup

Clone repo:
     git clone --branch mt --single-branch https://github.com/vedarchgit/hexamgen.git
      ;cd hexamgen

Run setup script:

chmod +x run_hexamgen.sh

./run_hexamgen.sh


Open FastAPI at:
  👉 http://127.0.0.1:8000

🪟 Windows Setup

Clone repo:
      
      git clone --branch mt --single-branch https://github.com/vedarchgit/hexamgen.git
      ;cd hexamgen


Run setup script in PowerShell (Admin):
        
        cd hexamgen
        
        .\run_hexamgen.ps1
        

Open FastAPI at:
👉 http://127.0.0.1:8000

🗄 Database Setup Notes

Default DB: hexamgen

Default user: ved

Password: v

Change these in .env file if needed.

    Example .env:
          
          DATABASE_URL=postgresql+psycopg2://ved:v@localhost:5432/hexamgen
          SECRET_KEY=your_secret_key_here
          ACCESS_TOKEN_EXPIRE_MINUTES=30

📜 Running Without Script

        If you prefer manual setup:
        
        python -m venv venv
        source venv/bin/activate   # Linux/macOS
        venv\Scripts\activate.ps1  # Windows PowerShell

pip install -r requirements.txt

uvicorn main:app --reload
