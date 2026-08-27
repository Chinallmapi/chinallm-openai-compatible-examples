#!/bin/bash
# ChinaLLM images endpoint examples
# Generate, edit, and create variations of images
#
# Usage:
#   1. Set your API key: export CHINALLM_API_KEY="your-key"
#   2. Preview: bash example.sh
#   3. Send: bash example.sh --send

set -euo pipefail
if [[ "${1:-}" != "--send" ]]; then
  echo 'Dry run only: POST https://chinallmapi.com/v1/images/generations (Authorization: Bearer ***)'
  echo 'Add --send to perform this request. Image generation can incur charges.'
  exit 0
fi
: "${CHINALLM_API_KEY:?Set CHINALLM_API_KEY before using --send}"

# Image generation
curl https://chinallmapi.com/v1/images/generations \
  -H "Authorization: Bearer $CHINALLM_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-image-2",
    "prompt": "A serene Japanese garden with a koi pond and cherry blossoms",
    "n": 1,
    "size": "1024x1024"
  }'

# Image edit (requires an image file - this example shows the API structure)
# curl https://chinallmapi.com/v1/images/edits \
#   -H "Authorization: Bearer $CHINALLM_API_KEY" \
#   -F image="@your-image.png" \
#   -F mask="@your-mask.png" \
#   -F prompt="Add a rainbow in the sky" \
#   -F model="gpt-image-2"

# Image variations (requires an image file - this example shows the API structure)
# curl https://chinallmapi.com/v1/images/variations \
#   -H "Authorization: Bearer $CHINALLM_API_KEY" \
#   -F image="@your-image.png" \
#   -F n=3 \
#   -F size="512x512"
