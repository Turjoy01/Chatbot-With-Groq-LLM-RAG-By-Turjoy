"use client"

import { useState, useRef, useEffect } from "react"
import "./App.css"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface ApiLog {
  timestamp: string
  request: {
    method: string
    endpoint: string
    body: any
  }
  response: {
    status: number
    data: any
  }
}

function App() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<"chat" | "api">("chat")
  const [apiLogs, setApiLogs] = useState<ApiLog[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const userMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    const messageContent = input
    setInput("")
    setLoading(true)

    try {
      const requestBody = { message: messageContent }
      const timestamp = new Date().toLocaleTimeString()

      const response = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      })

      const data = await response.json()

      const newLog: ApiLog = {
        timestamp,
        request: {
          method: "POST",
          endpoint: "/api/chat",
          body: requestBody,
        },
        response: {
          status: response.status,
          data: data,
        },
      }
      setApiLogs((prev) => [...prev, newLog])

      const assistantMessage: Message = {
        role: "assistant",
        content: data.response,
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error:", error)
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🤖 Chatbot With Groq LLM & RAG By Turjoy</h1>
        <p>Ask me anything about our products.</p>
      </header>

      <div className="tabs">
        <button className={`tab ${activeTab === "chat" ? "active" : ""}`} onClick={() => setActiveTab("chat")}>
          💬 Chat
        </button>
        <button className={`tab ${activeTab === "api" ? "active" : ""}`} onClick={() => setActiveTab("api")}>
          📡 API Docs
        </button>
      </div>

      {activeTab === "chat" ? (
        <div className="chat-container">
          <div className="messages">
            {messages.length === 0 && (
              <div className="welcome">
                <h2>Welcome With Turjoy's Chatbot</h2>
                <p>Ask me anything about our products. Try asking about specific items, categories or prices</p>
              </div>
            )}

            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.role}`}>
                <div className="avatar">{msg.role === "user" ? "👤" : "🤖"}</div>
                <div className="content">
                  <div className="role">{msg.role === "user" ? "You" : "Assistant"}</div>
                  <div className="text">{msg.content}</div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="message assistant">
                <div className="avatar">🤖</div>
                <div className="content">
                  <div className="role">Assistant</div>
                  <div className="typing">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="input-area">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask about products..."
              disabled={loading}
            />
            <button onClick={sendMessage} disabled={loading || !input.trim()}>
              Send
            </button>
          </div>
        </div>
      ) : (
        <div className="api-container">
          <div className="api-section">
            <h2>📡 Live API Documentation</h2>
            <p>All API calls are automatically logged here when you chat</p>

            {apiLogs.length === 0 ? (
              <div className="no-logs">
                <p>No API calls yet. Start chatting to see live API requests and responses!</p>
              </div>
            ) : (
              <div className="api-logs">
                {apiLogs.map((log, idx) => (
                  <div key={idx} className="api-log-item">
                    <div className="log-header">
                      <span className="log-time">⏰ {log.timestamp}</span>
                      <span className="log-method">{log.request.method}</span>
                      <span className="log-endpoint">{log.request.endpoint}</span>
                      <span className={`log-status status-${log.response.status}`}>{log.response.status}</span>
                    </div>

                    <div className="log-body">
                      <div className="log-section">
                        <h4>📤 Request:</h4>
                        <pre>{JSON.stringify(log.request.body, null, 2)}</pre>
                      </div>

                      <div className="log-section">
                        <h4>📥 Response:</h4>
                        <pre>{JSON.stringify(log.response.data, null, 2)}</pre>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="swagger-link">
              <p>💡 For interactive Swagger documentation, visit:</p>
              <a href="http://localhost:8000/docs" target="_blank" rel="noopener noreferrer">
                http://localhost:8000/docs
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
