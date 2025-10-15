"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ApiDocsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline" className="gap-2 bg-transparent">
              <ArrowLeft className="w-4 h-4" />
              Back to Chat
            </Button>
          </Link>
        </div>

        <Card className="p-8">
          <h1 className="text-3xl font-bold mb-6">API Documentation</h1>

          <div className="space-y-8">
            {/* Overview */}
            <section>
              <h2 className="text-2xl font-semibold mb-3">Overview</h2>
              <p className="text-gray-700 leading-relaxed">
                The Turjoys Chatbot API provides endpoints for fetching product information and interacting with an
                AI-powered chatbot that can answer questions about products.
              </p>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="font-semibold">Base URL:</p>
                <code className="text-blue-600">http://localhost:8000</code>
              </div>
            </section>

            {/* GET /api/products */}
            <section className="border-t pt-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded font-mono text-sm font-semibold">
                  GET
                </span>
                <code className="text-lg font-mono">/api/products</code>
              </div>

              <p className="text-gray-700 mb-4">Fetch all products from the DummyJSON API.</p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Response (200 OK)</h3>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                    {`{
  "products": [
    {
      "id": 1,
      "title": "Product Name",
      "description": "Product description",
      "category": "category",
      "price": 9.99,
      "rating": 4.5,
      "stock": 100,
      "brand": "Brand Name",
      "tags": ["tag1", "tag2"],
      "warrantyInformation": "1 year warranty",
      "shippingInformation": "Ships in 1-2 days",
      "availabilityStatus": "In Stock"
    }
  ],
  "total": 194,
  "skip": 0,
  "limit": 30
}`}
                  </pre>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Example Request</h3>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                    {`curl -X GET http://localhost:8000/api/products`}
                  </pre>
                </div>
              </div>
            </section>

            {/* POST /api/chat */}
            <section className="border-t pt-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded font-mono text-sm font-semibold">
                  POST
                </span>
                <code className="text-lg font-mono">/api/chat</code>
              </div>

              <p className="text-gray-700 mb-4">
                Send a message to the chatbot and receive an AI-generated response about products.
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Request Body</h3>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                    {`{
  "message": "Tell me about Kiwi"
}`}
                  </pre>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Response (200 OK)</h3>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                    {`{
  "response": "Kiwi is a nutrient-rich fruit priced at $2.49, rated 4.93 stars by our customers. It ships overnight and comes with a 6-month warranty. We currently have 99 units in stock."
}`}
                  </pre>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Example Request</h3>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                    {`curl -X POST http://localhost:8000/api/chat \\
  -H "Content-Type: application/json" \\
  -d '{"message": "What is the price of mascara?"}'`}
                  </pre>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Example Questions</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>"Tell me about Kiwi"</li>
                    <li>"What's the price of mascara?"</li>
                    <li>"Do you have any electronics?"</li>
                    <li>"Show me products with ratings above 4"</li>
                    <li>"What furniture do you have?"</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Swagger UI Link */}
            <section className="border-t pt-6">
              <h2 className="text-2xl font-semibold mb-3">Interactive Documentation</h2>
              <p className="text-gray-700 mb-4">For interactive API testing, visit the Swagger UI documentation:</p>
              <a href="http://localhost:8000/docs" target="_blank" rel="noopener noreferrer" className="inline-block">
                <Button className="bg-blue-500 hover:bg-blue-600">Open Swagger UI →</Button>
              </a>
            </section>
          </div>
        </Card>
      </div>
    </div>
  )
}
