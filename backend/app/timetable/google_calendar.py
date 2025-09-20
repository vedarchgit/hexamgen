from google.oauth2 import service_account
from googleapiclient.discovery import build
from app.core.config import settings

SCOPES = ['https://www.googleapis.com/auth/calendar']

def get_calendar_service():
    credentials = service_account.Credentials.from_service_account_file(
        settings.FIREBASE_CREDENTIALS, scopes=SCOPES)
    service = build('calendar', 'v3', credentials=credentials)
    return service

def sync_timetable_to_google_calendar(timetable_id: int, slots: list):
    service = get_calendar_service()
    calendar_id = 'primary'  # or a specific calendar id

    for slot in slots:
        event = {
            'summary': slot.subject,
            'start': {
                'dateTime': f"2024-01-01T{slot.start_time}:00",  # Adjust date accordingly
                'timeZone': 'Asia/Kolkata',
            },
            'end': {
                'dateTime': f"2024-01-01T{slot.end_time}:00",
                'timeZone': 'Asia/Kolkata',
            },
            'description': f"Location: {slot.location}" if slot.location else "",
            'recurrence': [
                'RRULE:FREQ=WEEKLY;BYDAY=' + slot.day_of_week[:2].upper()
            ],
        }
        service.events().insert(calendarId=calendar_id, body=event).execute()