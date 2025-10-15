from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes_chatbot import router as chatbot_router
from app.services.product_service import product_service

app = FastAPI(
    title="Chatbot with Groq LLM and RAG By Turjoy",
    description="AI-powered chatbot for product inquiries using Groq LLM",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    """Pre-load all products into cache on startup for fast RAG retrieval"""
    print("[T1] Loading products into cache for RAG retrieval...")
    await product_service.fetch_all_products()
    print("[T1] Products cached successfully!")

# Include routers
app.include_router(chatbot_router, prefix="/api", tags=["chatbot"])

@app.get("/")
async def root():
    return {"message": "Turjoys Chatbot API is running. Visit /docs for API documentation."}
