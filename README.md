# ChinaLLM OpenAI-Compatible API Examples

> Minimal, runnable code samples for ChinaLLM's OpenAI-compatible gateway.

## What is this?

This repo contains copy-paste-ready examples for calling **ChinaLLM API** — an OpenAI-compatible gateway that routes to OpenAI and leading China-native models with better pricing.

**Base URL:** https://chinallmapi.com/v1

Everything here uses the standard OpenAI SDK or plain HTTP. No vendor-specific client needed.

## Why use ChinaLLM?

- **Cost-efficient** — Better pricing than direct API calls
- **OpenAI-compatible** — Use your existing OpenAI SDK, just change the base URL
- **China-native models** — Access DeepSeek, GLM, Alibaba models alongside OpenAI
- **Full endpoint coverage** — Chat, Responses, Embeddings, Rerank, Images, Audio

## Supported Models

| Provider | Models | Multiplier |
|----------|--------|------------|
| OpenAI | gpt-5.4, gpt-5.5, gpt-image-2 | 1.3x |
| DeepSeek | deepseek-v4-flash, deepseek-v4-pro | 1.05x |
| GLM | glm-4.7 | 1.05x |
| Coding Plan (Alibaba) | — | 1.1x |

Multipliers are relative to base model pricing. Lower = more savings.

## Quick Start (3 minutes)

### 1. Get your API key

Sign up at [chinallmapi.com](https://chinallmapi.com) and get an API key.

### 2. Set environment variable

```bash
export CHINALLM_API_KEY="your-api-key-here"
```

### 3. Run your first request

**curl:**
```bash
curl https://chinallmapi.com/v1/chat/completions \
  -H "Authorization: Bearer $CHINALLM_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model": "gpt-5.4", "messages": [{"role": "user", "content": "Hello!"}]}'
```

**Python:**
```python
from openai import OpenAI

client = OpenAI(
    base_url="https://chinallmapi.com/v1",
    api_key="your-api-key-here"
)

response = client.chat.completions.create(
    model="gpt-5.4",
    messages=[{"role": "user", "content": "Hello!"}]
)
print(response.choices[0].message.content)
```

**Node.js:**
```javascript
import OpenAI from 'openai';

const client = new OpenAI({
  baseURL: 'https://chinallmapi.com/v1',
  apiKey: process.env.CHINALLM_API_KEY
});

const response = await client.chat.completions.create({
  model: 'gpt-5.4',
  messages: [{ role: 'user', content: 'Hello!' }]
});
console.log(response.choices[0].message.content);
```

## Examples in this repo

| Path | What it shows |
|------|---------------|
| curl/chat-completions.sh | Minimal curl request |
| python/openai_client.py | Python OpenAI SDK usage |
| 
ode/openai_client.mjs | Node.js OpenAI SDK usage |
| model-switching/ | Switch between models (gpt-5.4 → deepseek → glm) |

More endpoints coming: responses, embeddings, rerank, images, audio.

## Endpoints

All standard OpenAI endpoints work:

- /v1/chat/completions
- /v1/responses
- /v1/embeddings
- /v1/rerank
- /v1/images/generations
- /v1/audio/speech
- /v1/audio/transcriptions

See full docs at [chinallmapi.com/docs](https://chinallmapi.com/docs).

## License

MIT — use freely, no restrictions.

---

Made by [ChinaLLM](https://chinallmapi.com). Questions? Reach us at support@chinallmapi.com.