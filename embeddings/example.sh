#!/bin/bash
# ChinaLLM embeddings endpoint example
# Generate vector embeddings for text - useful for semantic search, RAG, etc.
#
# Usage:
#   1. Set your API key: export CHINALLM_API_KEY="your-key"
#   2. Run: bash example.sh

curl https://chinallmapi.com/v1/embeddings \
  -H "Authorization: Bearer $CHINALLM_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "text-embedding-ada-002",
    "input": "The quick brown fox jumps over the lazy dog"
  }'

# Multiple texts in one request
curl https://chinallmapi.com/v1/embeddings \
  -H "Authorization: Bearer $CHINALLM_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "text-embedding-ada-002",
    "input": [
      "Machine learning is a subset of AI",
      "Deep learning uses neural networks",
      "Natural language processing handles text"
    ]
  }'