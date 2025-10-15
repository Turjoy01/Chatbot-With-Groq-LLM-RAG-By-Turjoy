from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    GROQ_API_KEY: str = "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"
    DUMMYJSON_API_URL: str = "https://dummyjson.com/products"
    
    class Config:
        env_file = ".env"

settings = Settings()
