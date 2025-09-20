import firebase_admin
from firebase_admin import credentials, db
from app.core.config import settings

if not firebase_admin._apps:
    cred = credentials.Certificate(settings.FIREBASE_CREDENTIALS)
    firebase_admin.initialize_app(cred, {
        'databaseURL': 'https://your-firebase-project.firebaseio.com/'  # Change accordingly
    })

def update_user_score(user_id: int, xp: int):
    ref = db.reference(f'/leaderboard/{user_id}')
    current = ref.get()
    if current:
        new_xp = current.get('xp', 0) + xp
    else:
        new_xp = xp
    ref.update({'xp': new_xp})

def get_leaderboard(top_n: int = 10):
    ref = db.reference('/leaderboard')
    all_scores = ref.get()
    if not all_scores:
        return []
    sorted_scores = sorted(all_scores.items(), key=lambda x: x[1].get('xp', 0), reverse=True)
    return sorted_scores[:top_n]