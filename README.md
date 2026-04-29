# ChinaLLM OpenAI-Compatible API Examples

> Minimal, runnable code samples for ChinaLLM's OpenAI-compatible gateway.

## What is this?

This repo contains copy-paste-ready examples for calling **ChinaLLM API** — an OpenAI-compatible gateway that routes to OpenAI and leading China-native models with better pricing.

**Base URL:** https://chinallmapi.com/v1

Everything here uses the standard OpenAI SDK or plain HTTP. No vendor-specific client needed.

## Why use ChinaLLM?

- **Cost-efficient** — Better pricing than direct API calls
- **OpenAI-compatible** — Use your existing OpenAI SDK, just change the base URL
- **China-native models** — Access DeepSeek, GLM, Alibaba, Kimi, MiniMax, Qwen alongside OpenAI
- **Full endpoint coverage** — Chat, Responses, Embeddings, Rerank, Images, Audio

## Supported Models & Pricing

**11 models currently available.** Pricing per 1M tokens (input / completion):

| Model | Input | Completion | Cache Read | Provider | Multiplier |
|-------|-------|------------|------------|----------|------------|
| **gpt-5.4** | `.3250` | `.9500` | `.0330` | OpenAI | 1.30x |
| **gpt-5.5** | `.6500` | `.2000` | `.0650` | OpenAI | 1.30x |
| **gpt-image-2** | `.039/image` | — | — | OpenAI | 1.30x |
| **deepseek-v4-flash** | `.1470` | `.2940` | `.0290` | DeepSeek | 1.05x |
| **deepseek-v4-pro** | `.9240` | `.8480` | `.0770` | DeepSeek | 1.05x |
| **glm-4.7** | `.6600` | `.5850` | — | GLM | 1.05x |
| **glm-5** | `.9900` | `.5530` | — | GLM | 1.05x |
| **GLM-5.1** | `.1970` | `.2000` | `.2150` | GLM | 1.05x |
| **kimi-k2.5** | `.6600` | `.4100` | — | Kimi | — |
| **MiniMax-M2.5** | `.3520` | `.3750` | — | MiniMax | — |
| **qwen3.5-plus** | `.3200` | `.8500` | — | Alibaba | 1.10x |

**Multipliers** are relative to base model pricing. Lower = more savings.

**Best value picks:**
- **deepseek-v4-flash** — Lowest cost for fast responses (`.147/1M` input)
- **gpt-5.4** — Balanced OpenAI model with cache support
- **glm-4.7** — Strong Chinese model at competitive pricing

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

### Core examples

| Path | What it shows |
|------|---------------|
| curl/chat-completions.sh | Minimal curl request |
| python/openai_client.py | Python OpenAI SDK usage |
| 
ode/openai_client.mjs | Node.js OpenAI SDK usage |
| model-switching/python_switch.py | Compare models (gpt-5.4 vs deepseek vs glm) |
| model-switching/node_switch.mjs | Model comparison (Node.js) |

### Advanced endpoints

| Path | What it shows |
|------|---------------|
| esponses/example.sh | Responses API (structured reasoning output) |
| embeddings/example.sh | Text embeddings for semantic search/RAG |
| erank/example.sh | Document relevance ranking |
| images/example.sh | Image generation, editing, variations |
| udio/example.sh | TTS, transcription, translation |

## Endpoints

All standard OpenAI endpoints work:

- /v1/chat/completions — Chat messages
- /v1/responses — Structured responses with reasoning
- /v1/responses/compact — Compact response format
- /v1/embeddings — Text vector embeddings
- /v1/rerank — Document relevance ranking
- /v1/images/generations — Generate images from text
- /v1/images/edits — Edit images with masks
- /v1/images/variations — Generate image variations
- /v1/audio/speech — Text-to-speech
- /v1/audio/transcriptions — Speech to text
- /v1/audio/translations — Speech translation to English

See full docs at [chinallmapi.com/docs](https://chinallmapi.com/docs).

## License

MIT — use freely, no restrictions.

---

Made by [ChinaLLM](https://chinallmapi.com). Questions? Reach us at support@chinallmapi.com.