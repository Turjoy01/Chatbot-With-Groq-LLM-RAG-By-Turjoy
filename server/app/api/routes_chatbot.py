from fastapi import APIRouter, HTTPException
from app.models.schemas import ChatRequest, ChatResponse, ProductsResponse
from app.services.chatbot_service import chatbot_service
from app.services.product_service import product_service

router = APIRouter()

@router.get("/products", response_model=ProductsResponse)
async def get_products():
    """
    Fetch all products from DummyJSON API
    """
    try:
        products_data = await product_service.fetch_all_products()
        return products_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching products: {str(e)}")

@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Chat endpoint - accepts customer message and returns AI-generated response
    
    Example questions:
    - "Tell me about Kiwi"
    - "What's the price of mango?"
    - "Do you have any electronics?"
    - "Show me products with ratings above 4"
    """
    try:
        if not request.message or not request.message.strip():
            raise HTTPException(status_code=400, detail="Message cannot be empty")
        
        response = await chatbot_service.generate_response(request.message)
        return ChatResponse(response=response)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating response: {str(e)}")
