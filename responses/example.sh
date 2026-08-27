#!/bin/bash
# ChinaLLM responses endpoint example
# The /v1/responses endpoint provides structured responses with built-in reasoning
#
# Usage:
#   1. Set your API key: export CHINALLM_API_KEY="your-key"
#   2. Preview: bash example.sh
#   3. Send: bash example.sh --send

set -euo pipefail
if [[ "${1:-}" != "--send" ]]; then
  echo 'Dry run only: POST https://chinallmapi.com/v1/responses (Authorization: Bearer ***)'
  echo 'Add --send to perform these requests.'
  exit 0
fi
: "${CHINALLM_API_KEY:?Set CHINALLM_API_KEY before using --send}"

curl https://chinallmapi.com/v1/responses \
  -H "Authorization: Bearer $CHINALLM_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-5.4",
    "input": "Explain the difference between REST and GraphQL APIs"
  }'

# Compact response format (shorter, summarized output)
curl https://chinallmapi.com/v1/responses/compact \
  -H "Authorization: Bearer $CHINALLM_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "deepseek-v4-flash",
    "input": "What causes rain?"
  }'
