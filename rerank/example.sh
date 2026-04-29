#!/bin/bash
# ChinaLLM rerank endpoint example
# Rerank documents by relevance to a query - useful for RAG and search refinement
#
# Usage:
#   1. Set your API key: export CHINALLM_API_KEY="your-key"
#   2. Run: bash example.sh

curl https://chinallmapi.com/v1/rerank \
  -H "Authorization: Bearer $CHINALLM_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "rerank-1",
    "query": "What is the capital of France?",
    "documents": [
      "Paris is the capital and most populous city of France.",
      "London is the capital of the United Kingdom.",
      "Berlin is the capital city of Germany.",
      "Madrid is the capital of Spain.",
      "Rome is the capital city of Italy."
    ],
    "top_n": 3
  }'

# Another example: technical documentation search
curl https://chinallmapi.com/v1/rerank \
  -H "Authorization: Bearer $CHINALLM_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "rerank-1",
    "query": "How to handle authentication errors?",
    "documents": [
      "Authentication fails when the token is expired. Refresh the token to continue.",
      "The server returns 404 when the endpoint does not exist.",
      "Rate limiting prevents abuse. You may need to slow down your requests.",
      "Network timeouts can occur when the server is unreachable.",
      "Invalid JSON format causes parsing errors. Validate your input."
    ],
    "top_n": 2
  }'