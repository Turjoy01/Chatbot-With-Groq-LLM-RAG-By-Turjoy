from groq import Groq
from app.core.config import settings

def get_groq_client() -> Groq:
    """Get Groq client instance"""
    return Groq(api_key=settings.GROQ_API_KEY)
