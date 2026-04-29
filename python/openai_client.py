#!/usr/bin/env python3
"""
ChinaLLM chat completions example using OpenAI Python SDK.

Usage:
  1. pip install openai
  2. Set API key: export CHINALLM_API_KEY="your-key"
  3. Run: python openai_client.py
"""

import os
from openai import OpenAI

# Initialize client with ChinaLLM base URL
client = OpenAI(
    base_url="https://chinallmapi.com/v1",
    api_key=os.environ.get("CHINALLM_API_KEY", "your-api-key-here")
)

# Make a chat completion request
response = client.chat.completions.create(
    model="gpt-5.4",
    messages=[
        {"role": "user", "content": "What's the capital of France? Answer in one sentence."}
    ]
)

print(response.choices[0].message.content)
print(f"\nModel used: {response.model}")
print(f"Tokens: {response.usage.total_tokens}")