 Product Chatbot with Groq AI

A full-stack intelligent chatbot application that helps users find and learn about products from the DummyJSON API using Groq's LLM (llama-3.3-70b-versatile model). The application features a modern chat interface and automatic API documentation.

## Features

- **Intelligent Product Search**: RAG-like system that caches all products on startup for fast retrieval
- **Natural Language Processing**: Powered by Groq AI (llama-3.3-70b-versatile) for conversational responses
- **Real-time Chat Interface**: Clean, modern UI with typing indicators and message history
- **Automatic API Documentation**: Live API request/response logging in the API Docs tab
- **Docker Support**: Easy deployment with docker-compose
- **Product Information**: Get details about price, ratings, warranty, shipping, stock, and more


## Prerequisites

- Docker and Docker Compose installed on your system
- Groq API key (already configured in the project)


## ️ Project Structure

```plaintext
.
├── server/                      # FastAPI Backend
│   ├── app/
│   │   ├── main.py             # Application entry point with startup caching
│   │   ├── core/
│   │   │   └── config.py       # Configuration and environment variables
│   │   ├── models/
│   │   │   └── schemas.py      # Pydantic models for request/response
│   │   ├── services/
│   │   │   ├── product_service.py    # Product fetching and search logic
│   │   │   └── chatbot_service.py    # Chatbot logic and context building
│   │   ├── utils/
│   │   │   └── groq_client.py        # Groq API integration
│   │   └── api/
│   │       └── routes_chatbot.py     # API endpoints
│   ├── requirements.txt        # Python dependencies
│   ├── Dockerfile             # Backend Docker configuration
│   └── .env                   # Environment variables
│
├── frontend/                   # React + TypeScript + Vite Frontend
│   ├── src/
│   │   ├── App.tsx            # Main application component
│   │   ├── App.css            # Styling
│   │   ├── main.tsx           # Application entry point
│   │   └── index.css          # Global styles
│   ├── index.html             # HTML template
│   ├── package.json           # Node dependencies
│   ├── vite.config.ts         # Vite configuration
│   └── tsconfig.json          # TypeScript configuration
│
├── Dockerfile.frontend         # Frontend Docker configuration
└── docker-compose.yml         # Docker Compose orchestration
```

## Quick Start

### Step 1: Clone or Download the Project

### Step 2: Run with Docker Compose

Open a terminal in the project root directory and run:

```shellscript
docker-compose up --build
```

This command will:

- Build the backend (FastAPI) container
- Build the frontend (React + TypeScript) container
- Start both services
- Fetch and cache all products from DummyJSON API on startup


### Step 3: Access the Application

Once the containers are running, open your browser and navigate to:

- **Chat Interface**: [http://localhost:3000](http://localhost:3000)
- **Backend API Docs (Swagger)**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **Backend Health Check**: [http://localhost:8000/health](http://localhost:8000/health)


## How to Use

### Chat Interface

1. Go to [http://localhost:3000](http://localhost:3000)
2. Click on the **Chat** tab (default view)
3. Type your question in the input box at the bottom
4. Examples:

1. "Tell me about iPhone"
2. "What is the price of laptop?"
3. "Show me products in the beauty category"
4. "What's the rating of Samsung phone?"





### API Documentation

1. Click on the **API Docs** tab
2. This tab automatically displays all API requests and responses from your chat interactions
3. You'll see:

1. Timestamp of each request
2. HTTP method and endpoint
3. Request body (your message)
4. Response body (chatbot's reply)
5. Status code





## Configuration

### Environment Variables

The project uses the following environment variables (already configured in `server/.env`):

```plaintext
GROQ_API_KEY=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
DUMMYJSON_API_URL=https://dummyjson.com/products
```

### Ports

- **Frontend**: 3000
- **Backend**: 8000

## How It Works (RAG-like System)

1. **Startup**: When the backend starts, it fetches all products from DummyJSON API and caches them in memory
2. **User Query**: When you ask a question, the system:

1. Tokenizes your query into keywords
2. Searches cached products using intelligent matching (exact word matches first, then partial matches)
3. Finds relevant products across title, category, description, tags, and brand


3. **Context Building**: Relevant product information is formatted and sent to Groq AI
4. **AI Response**: Groq's LLM generates a natural, conversational response with specific product details
5. **Display**: The response is shown in the chat interface and logged in API Docs


## Dependencies

### Backend

- FastAPI - Modern web framework
- Uvicorn - ASGI server
- Groq - AI/LLM integration
- httpx - HTTP client for API calls
- Pydantic - Data validation


### Frontend

- React 18 - UI library
- TypeScript - Type safety
- Vite - Build tool and dev server
- CSS3 - Styling


## Key Features Explained

### Intelligent Search Algorithm

- **Word Tokenization**: Splits queries into individual words
- **Priority Matching**: Exact word matches score higher than partial matches
- **Multi-field Search**: Searches across title, category, description, tags, and brand
- **Case-insensitive**: Works regardless of capitalization


### Automatic Caching

- Products are fetched once on server startup
- Cached in memory for instant retrieval
- No repeated API calls to DummyJSON
- Fast response times


### Live API Documentation Wth Swagger

- Automatically captures all chat API calls
- Displays formatted JSON for requests and responses
- Color-coded status indicators
- Timestamps for each interaction

---
**Enjoy chatting with My AI-powered product assistant Chatbot**
