#!/usr/bin/env python3
"""Compare the same prompt across multiple ChinaLLM models."""

import json
import os
import sys

PROMPT = "What's 25 * 47? Answer with just the number."
MODELS = ["gpt-5.4", "gpt-5.5", "gpt-5.6-luna"]

if "--send" not in sys.argv:
    print(
        json.dumps(
            {
                "base_url": "https://chinallmapi.com/v1",
                "api_key": "***",
                "prompt": PROMPT,
                "models": MODELS,
            },
            ensure_ascii=False,
            indent=2,
        )
    )
    print("\nDry run only. Add --send to compare these models.")
    raise SystemExit(0)

api_key = os.environ.get("CHINALLM_API_KEY", "").strip()
if not api_key:
    raise SystemExit("Set CHINALLM_API_KEY before using --send")

from openai import OpenAI  # Imported only when an explicit send is requested.

client = OpenAI(base_url="https://chinallmapi.com/v1", api_key=api_key)
print(f"Comparing models on the same prompt:\n{PROMPT}\n")

for model in MODELS:
    response = client.chat.completions.create(
        model=model,
        messages=[{"role": "user", "content": PROMPT}],
    )
    print(f"[{model}]")
    print(f"  Response: {response.choices[0].message.content}")
    print(f"  Tokens: {response.usage.total_tokens}")
    print()
