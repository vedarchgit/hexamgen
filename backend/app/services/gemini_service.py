import google.generativeai as genai
from ..core.config import settings
import json
from fastapi import HTTPException
from ..schemas import Concept, Flashcard, QuizQuestionGenerated, StudyPlanGenerated
from typing import List

class GeminiService:
    def __init__(self):
        if not settings.gemini_api_key:
            raise ValueError("GEMINI_API_KEY is not set in environment variables.")
        genai.configure(api_key=settings.gemini_api_key)
        self.model = genai.GenerativeModel('gemini-pro')

    async def _generate_content(self, prompt: str, response_model):
        try:
            response = await self.model.generate_content_async(prompt)
            response_text = response.text.strip()
            # Clean the response to extract only the JSON part
            json_start = response_text.find('[')
            json_end = response_text.rfind(']') + 1
            if json_start == -1:
                json_start = response_text.find('{')
                json_end = response_text.rfind('}') + 1
            
            if json_start != -1:
                response_text = response_text[json_start:json_end]

            data = json.loads(response_text)
            if isinstance(data, list):
                return [response_model(**item) for item in data]
            return response_model(**data)
        except json.JSONDecodeError:
            raise HTTPException(status_code=500, detail="Failed to decode JSON from Gemini response.")
        except Exception as e:
            print(f"Error generating content with Gemini: {e}")
            raise HTTPException(status_code=500, detail=str(e))

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

    async def extract_difficulty(self, pyq_text: str) -> int:
        prompt = f"""
        Analyze the following Previous Year Question (PYQ) and rate its difficulty on a scale of 1 to 10.
        Return only the integer value.

        PYQ:
        {pyq_text}

        Difficulty (1-10):
        """
        try:
            response = await self.model.generate_content_async(prompt)
            difficulty_str = response.text.strip()
            return int(difficulty_str)
        except Exception as e:
            print(f"Error extracting difficulty with Gemini: {e}")
            return 0

    async def extract_concepts(self, text_content: str) -> List[Concept]:
        prompt = f"""
        Analyze the following academic content (notes/slides) and extract key concepts and their concise definitions.
        Return the concepts as a JSON array of objects, where each object has "concept" and "definition" keys.

        Content:
        {text_content}

        Concepts (JSON array):
        """
        return await self._generate_content(prompt, Concept)

    async def generate_quiz(self, text_content: str) -> List[QuizQuestionGenerated]:
        prompt = f"""
        Generate a multiple-choice quiz (MCQ) from the following academic content.
        Each question should have 4 options and indicate the correct answer.
        Return the quiz as a JSON array of objects, where each object has "question", "options" (an array of strings), and "answer" (the correct option string) keys.

        Content:
        {text_content}

        Quiz (JSON array):
        """
        return await self._generate_content(prompt, QuizQuestionGenerated)

    async def generate_flashcards(self, text_content: str) -> List[Flashcard]:
        prompt = f"""
        Generate flashcards from the following academic content.
        Return the flashcards as a JSON array of objects, where each object has "front" (question/term) and "back" (answer/definition) keys.

        Content:
        {text_content}

        Flashcards (JSON array):
        """
        return await self._generate_content(prompt, Flashcard)

    async def generate_study_plan(self, text_content: str, exam_date: str) -> List[StudyPlanGenerated]:
        prompt = f"""
        Generate a personalized study plan based on the following academic content and an upcoming exam date.
        The study plan should be a JSON array of objects, where each object has "date" and "topics" (an array of strings) keys.
        Ensure the plan covers the content effectively until the exam date: {exam_date}.

        Content:
        {text_content}

        Study Plan (JSON array):
        """
        return await self._generate_content(prompt, StudyPlanGenerated)

gemini_service = GeminiService()
