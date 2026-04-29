#!/bin/bash
# ChinaLLM responses endpoint example
# The /v1/responses endpoint provides structured responses with built-in reasoning
#
# Usage:
#   1. Set your API key: export CHINALLM_API_KEY="your-key"
#   2. Run: bash example.sh

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