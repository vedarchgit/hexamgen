from core.config import settings

def test_settings():
    print("DATABASE_URL:", settings.DATABASE_URL)
    print("ACCESS_TOKEN_EXPIRE_MINUTES:", settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    print("SECRET_KEY:", settings.SECRET_KEY)
    print("APP_NAME:", settings.APP_NAME)

if __name__ == "__main__":
    test_settings()
