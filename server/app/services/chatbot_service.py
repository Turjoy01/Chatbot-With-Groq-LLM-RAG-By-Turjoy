from groq import Groq
from app.core.config import settings
from app.services.product_service import product_service
import json

class ChatbotService:
    def __init__(self):
        self.client = Groq(api_key=settings.GROQ_API_KEY)
        self.model = "llama-3.3-70b-versatile"
    
    async def generate_response(self, user_message: str) -> str:
        """Generate chatbot response using Groq LLM"""
        
        # First, identify if the message is about products
        all_products = await product_service.fetch_all_products()
        products_list = all_products.get("products", [])
        
        # Extract product names and categories for context
        product_context = self._build_product_context(products_list)
        
        # Search for relevant products based on user message
        relevant_products = await product_service.search_products(user_message)
        
        # Build context for the LLM
        context = self._build_llm_context(user_message, relevant_products, product_context)
        
        # Generate response using Groq
        completion = self.client.chat.completions.create(
            model=self.model,
            messages=[
                {
                    "role": "system",
                    "content": """You are a helpful product assistant. Your job is to help customers find and learn about products. 
                    When answering questions:
                    - Be friendly and conversational
                    - Provide specific product details when available (price, rating, stock, warranty, shipping)
                    - If multiple products match, mention the most relevant ones
                    - If no products match, politely say so and suggest alternatives
                    - Format prices with $ symbol
                    - Mention ratings out of 5 stars
                    - Keep responses concise but informative"""
                },
                {
                    "role": "user",
                    "content": context
                }
            ],
            temperature=0.7,
            max_tokens=1024,
            top_p=1,
            stream=False
        )
        
        return completion.choices[0].message.content
    
    def _build_product_context(self, products: list) -> str:
        """Build a summary of available products"""
        categories = set()
        brands = set()
        
        for product in products:
            if product.get("category"):
                categories.add(product["category"])
            if product.get("brand"):
                brands.add(product["brand"])
        
        return f"Available categories: {', '.join(sorted(categories))}. Available brands: {', '.join(sorted(brands))}."
    
    def _build_llm_context(self, user_message: str, relevant_products: list, product_context: str) -> str:
        """Build context for LLM with relevant product information"""
        
        if not relevant_products:
            return f"""User question: {user_message}

{product_context}

No specific products found matching the query. Please provide a helpful response suggesting they browse categories or ask about specific products."""
        
        # Limit to top 5 most relevant products
        products_info = []
        for product in relevant_products[:5]:
            info = f"""
Product: {product.get('title')}
Description: {product.get('description')}
Category: {product.get('category')}
Price: ${product.get('price')}
Rating: {product.get('rating')}/5 stars
Stock: {product.get('stock')} units
Brand: {product.get('brand', 'N/A')}
Warranty: {product.get('warrantyInformation', 'N/A')}
Shipping: {product.get('shippingInformation', 'N/A')}
Availability: {product.get('availabilityStatus', 'N/A')}
"""
            if product.get('reviews'):
                reviews_summary = f"Reviews: {len(product['reviews'])} customer reviews"
                info += reviews_summary + "\n"
            
            products_info.append(info)
        
        return f"""User question: {user_message}

Relevant products found:
{''.join(products_info)}

Please provide a natural, conversational response about these products based on the user's question."""

chatbot_service = ChatbotService()
