#!/usr/bin/env python3
"""
Model switching example - compare responses from different models.
Demonstrates ChinaLLM's ability to route to multiple providers.
"""

import os
from openai import OpenAI

client = OpenAI(
    base_url="https://chinallmapi.com/v1",
    api_key=os.environ.get("CHINALLM_API_KEY", "your-api-key-here")
)

prompt = "What's 25 * 47? Answer with just the number."
models = ["gpt-5.4", "deepseek-v4-flash", "glm-4.7"]

print("Comparing models on the same prompt:")
print(f"Prompt: {prompt}\n")

for model in models:
    response = client.chat.completions.create(
        model=model,
        messages=[{"role": "user", "content": prompt}]
    )
    
    print(f"[{model}]")
    print(f"  Response: {response.choices[0].message.content}")
    print(f"  Tokens: {response.usage.total_tokens} (prompt: {response.usage.prompt_tokens}, completion: {response.usage.completion_tokens})")
    print()