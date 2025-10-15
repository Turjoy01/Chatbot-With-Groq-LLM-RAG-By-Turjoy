from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

class Product(BaseModel):
    id: int
    title: str
    description: str
    category: str
    price: float
    rating: float
    stock: int
    brand: Optional[str] = None
    tags: List[str] = []
    reviews: Optional[List[Dict[str, Any]]] = []
    warrantyInformation: Optional[str] = None
    shippingInformation: Optional[str] = None
    availabilityStatus: Optional[str] = None

class ProductsResponse(BaseModel):
    products: List[Product]
    total: int
    skip: int
    limit: int
