#!/bin/bash
# ChinaLLM chat completions example - minimal curl request
#
# Usage: 
#   1. Set your API key: export CHINALLM_API_KEY="your-key"
#   2. Run: bash chat-completions.sh

curl https://chinallmapi.com/v1/chat/completions \
  -H "Authorization: Bearer $CHINALLM_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-5.4",
    "messages": [
      {"role": "user", "content": "Say hello in 3 languages"}
    ]
  }'