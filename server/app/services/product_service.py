import httpx
from typing import List, Dict, Any
from app.core.config import settings
import re

class ProductService:
    def __init__(self):
        self.api_url = settings.DUMMYJSON_API_URL
        self.products_cache = None
    
    async def fetch_all_products(self) -> Dict[str, Any]:
        """Fetch all products from DummyJSON API and cache them (RAG-like storage)"""
        if self.products_cache:
            return self.products_cache
        
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{self.api_url}?limit=200")
            response.raise_for_status()
            self.products_cache = response.json()
            print(f"[T1] Cached {len(self.products_cache.get('products', []))} products for RAG retrieval")
            return self.products_cache
    
    async def search_products(self, query: str) -> List[Dict[str, Any]]:
        """Search products using intelligent matching (RAG-like retrieval)"""
        all_products = await self.fetch_all_products()
        query_lower = query.lower()
        
        query_words = re.findall(r'\b\w+\b', query_lower)
        
        matching_products = []
        exact_matches = []
        partial_matches = []
        
        for product in all_products.get("products", []):
            title = product.get("title", "").lower()
            category = product.get("category", "").lower()
            description = product.get("description", "").lower()
            tags = [tag.lower() for tag in product.get("tags", [])]
            brand = product.get("brand", "").lower()
            
            title_words = set(re.findall(r'\b\w+\b', title))
            if any(word in title_words for word in query_words):
                exact_matches.append(product)
                continue
            
            if (any(word in title for word in query_words) or
                any(word in category for word in query_words) or
                any(word in description for word in query_words) or
                any(any(word in tag for word in query_words) for tag in tags) or
                any(word in brand for word in query_words)):
                partial_matches.append(product)
        
        matching_products = exact_matches + partial_matches
        
        print(f"[T1] Found {len(matching_products)} products matching query: {query}")
        if matching_products:
            print(f"[T1] Top match: {matching_products[0].get('title')}")
        
        return matching_products

product_service = ProductService()
