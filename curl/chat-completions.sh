#!/bin/bash
# ChinaLLM chat completions example - minimal curl request
#
# Usage: 
#   1. Set your API key: export CHINALLM_API_KEY="your-key"
#   2. Preview: bash chat-completions.sh
#   3. Send: bash chat-completions.sh --send

set -euo pipefail
if [[ "${1:-}" != "--send" ]]; then
  echo 'Dry run only: POST https://chinallmapi.com/v1/chat/completions (Authorization: Bearer ***)'
  echo 'Add --send to perform this request.'
  exit 0
fi
: "${CHINALLM_API_KEY:?Set CHINALLM_API_KEY before using --send}"

curl https://chinallmapi.com/v1/chat/completions \
  -H "Authorization: Bearer $CHINALLM_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-5.4",
    "messages": [
      {"role": "user", "content": "Say hello in 3 languages"}
    ]
  }'
