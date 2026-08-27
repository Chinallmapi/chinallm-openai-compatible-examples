#!/bin/bash
# ChinaLLM embeddings endpoint example
# Generate vector embeddings for text - useful for semantic search, RAG, etc.
#
# Usage:
#   1. Set your API key: export CHINALLM_API_KEY="your-key"
#   2. Preview: bash example.sh
#   3. Send: bash example.sh --send

set -euo pipefail
if [[ "${1:-}" != "--send" ]]; then
  echo 'Dry run only: POST https://chinallmapi.com/v1/embeddings (Authorization: Bearer ***)'
  echo 'Add --send to perform these requests.'
  exit 0
fi
: "${CHINALLM_API_KEY:?Set CHINALLM_API_KEY before using --send}"

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
