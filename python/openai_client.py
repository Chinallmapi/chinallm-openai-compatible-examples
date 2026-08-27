#!/usr/bin/env python3
"""ChinaLLM chat completions example using the OpenAI Python SDK."""

import json
import os
import sys

REQUEST = {
    "model": "gpt-5.4",
    "messages": [
        {
            "role": "user",
            "content": "What's the capital of France? Answer in one sentence.",
        }
    ],
}

if "--send" not in sys.argv:
    print(
        json.dumps(
            {
                "base_url": "https://chinallmapi.com/v1",
                "api_key": "***",
                "request": REQUEST,
            },
            ensure_ascii=False,
            indent=2,
        )
    )
    print("\nDry run only. Add --send to perform this request.")
    raise SystemExit(0)

api_key = os.environ.get("CHINALLM_API_KEY", "").strip()
if not api_key:
    raise SystemExit("Set CHINALLM_API_KEY before using --send")

from openai import OpenAI  # Imported only when an explicit send is requested.

client = OpenAI(base_url="https://chinallmapi.com/v1", api_key=api_key)
response = client.chat.completions.create(**REQUEST)
print(response.choices[0].message.content)
print(f"\nModel used: {response.model}")
print(f"Tokens: {response.usage.total_tokens}")
