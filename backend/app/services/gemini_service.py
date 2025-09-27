import google.generativeai as genai
from ..core.config import settings

class GeminiService:
    def __init__(self):
        if not settings.gemini_api_key:
            raise ValueError("GEMINI_API_KEY is not set in environment variables.")
        genai.configure(api_key=settings.gemini_api_key)
        self.model = genai.GenerativeModel('gemini-pro')

    async def extract_topics(self, pyq_text: str) -> list[str]:
        prompt = f"""
        Analyze the following Previous Year Question (PYQ) and extract the main topics or concepts discussed.
        Return the topics as a comma-separated list.

        PYQ:
        {pyq_text}

        Topics:
        """
        try:
            response = await self.model.generate_content_async(prompt)
            # Assuming the response text is a comma-separated string of topics
            topics_str = response.text.strip()
            return [topic.strip() for topic in topics_str.split(',') if topic.strip()]
        except Exception as e:
            print(f"Error extracting topics with Gemini: {e}")
            return []

gemini_service = GeminiService()
