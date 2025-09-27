FROM python:3.12-slim
WORKDIR /app
COPY backend/requirements.txt /app/requirements.txt
RUN apt-get update && apt-get install -y gcc build-essential
RUN pip install --no-cache-dir -r /app/requirements.txt
COPY backend /app/backend
EXPOSE 8000
CMD ["uvicorn", "backend.app.main:app", "--host", "0.0.0.0", "--port", "8000"]
