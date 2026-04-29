#!/bin/bash
# ChinaLLM audio endpoint examples
# Text-to-speech (TTS), transcriptions, and translations
#
# Usage:
#   1. Set your API key: export CHINALLM_API_KEY="your-key"
#   2. Run: bash example.sh

# Text-to-speech: Generate audio from text
curl https://chinallmapi.com/v1/audio/speech \
  -H "Authorization: Bearer $CHINALLM_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "tts-1",
    "input": "Hello, this is a text-to-speech demonstration using ChinaLLM API.",
    "voice": "alloy"
  }' \
  --output speech.mp3

# Audio transcription: Convert speech to text (requires an audio file)
# curl https://chinallmapi.com/v1/audio/transcriptions \
#   -H "Authorization: Bearer $CHINALLM_API_KEY" \
#   -F file="@your-audio.mp3" \
#   -F model="whisper-1"

# Audio translation: Translate speech to English (requires an audio file)
# curl https://chinallmapi.com/v1/audio/translations \
#   -H "Authorization: Bearer $CHINALLM_API_KEY" \
#   -F file="@your-audio.mp3" \
#   -F model="whisper-1"

echo ""
echo "Audio file saved as speech.mp3"
echo "For transcription/translation, provide your own audio file."