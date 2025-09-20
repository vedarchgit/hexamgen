from sqlalchemy import create_engine, text

# Replace with your config
DATABASE_URL = "postgresql://ved:v@localhost:5432/hexamgen"

def test_connection():
    try:
        engine = create_engine(DATABASE_URL)
        with engine.connect() as conn:
            result = conn.execute(text("SELECT version();"))
            print("✅ Connected to:", result.scalar())
    except Exception as e:
        print("❌ Database connection failed:", str(e))

if __name__ == "__main__":
    test_connection()
