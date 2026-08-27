# ChinaLLM OpenAI-Compatible API Examples

[简体中文](README.zh-CN.md)

Runnable, dry-run-first examples for the ChinaLLM API: OpenAI-compatible chat, Responses, embeddings, rerank, images, audio, and asynchronous video tasks.

- API base URL: `https://chinallmapi.com/v1`
- Live model catalog and pricing: [ChinaLLM Model Marketplace](https://chinallmapi.com/pricing)
- Full documentation: [ChinaLLM Docs](https://chinallmapi.com/docs)

Model availability and pricing can change. Query `/v1/models` and check the live marketplace before production use instead of copying a static price table.

## Safety first

Every runnable example in this repository defaults to a dry run.

- No request is sent unless you explicitly add `--send`.
- `CHINALLM_API_KEY` is required only when sending.
- Printed examples redact authorization as `Bearer ***`.
- Generation examples do not auto-retry or auto-submit duplicate jobs.
- Never commit API keys, `.env` files, user prompts, or generated private assets.

## Quick start without sending a request

Node.js 18 or newer is enough for the safe CLI:

```bash
npm run example -- --kind chat --prompt "Explain asynchronous task polling"
```

Seedream image request preview:

```bash
npm run example -- --kind image \
  --model seedream_5.0Pro \
  --resolution 1K \
  --ratio 1:1 \
  --prompt "A white-background product photo"
```

HappyHorse image-to-video request preview:

```bash
npm run example -- --kind video \
  --model happyhorse-1.0-i2v \
  --image-url "https://example.com/first-frame.png" \
  --prompt "Slow camera push-in"
```

These commands only print redacted requests and do not incur API charges.

## Explicitly send a request

Set your API key locally, then add `--send`:

```bash
export CHINALLM_API_KEY='your_api_key_here'
npm run example -- --kind chat --prompt 'Hello' --send
```

PowerShell:

```powershell
$env:CHINALLM_API_KEY = 'your_api_key_here'
npm run example -- --kind chat --prompt 'Hello' --send
```

Image and video calls can incur charges. Confirm the model, account group, request parameters, and live price before sending.

## Query an existing asynchronous task once

Use the `poll_url` returned by a previously submitted image or video task:

```bash
npm run poll -- \
  --poll-url "/v1/images/generations/climg_sync_xxxxx"
```

Add `--send` to perform one GET request. The example does not loop automatically. Production clients should stop immediately on a failed terminal state and avoid resubmitting the original generation request.

## Repository examples

| Path | Purpose | Default behavior |
| --- | --- | --- |
| `safe-cli/` | Chat, Seedream image, HappyHorse video, task query | Dry run |
| `curl/chat-completions.sh` | Minimal Chat Completions cURL | Dry run |
| `python/openai_client.py` | OpenAI Python SDK | Dry run |
| `node/openai_client.mjs` | OpenAI Node.js SDK | Dry run |
| `model-switching/` | Preview or compare several text models | Dry run |
| `responses/example.sh` | Responses API | Dry run |
| `embeddings/example.sh` | Text embeddings | Dry run |
| `rerank/example.sh` | Document reranking | Dry run |
| `images/example.sh` | GPT Image generation/edit structure | Dry run |
| `audio/example.sh` | Speech and transcription structure | Dry run |

The Node.js SDK examples need the `openai` package only when you use `--send`:

```bash
npm install openai
```

The Python SDK examples need the `openai` package only when you use `--send`:

```bash
python -m pip install openai
```

## Current implementation guides

- [OpenAI-compatible API migration in China](https://chinallmapi.com/guides/openai-compatible-api-china)
- [OpenAI SDK compatible API guide](https://chinallmapi.com/guides/openai-sdk-compatible-api)
- [Python image generation API](https://chinallmapi.com/guides/python-image-generation-api)
- [Node.js video generation API](https://chinallmapi.com/guides/nodejs-video-generation-api)
- [Image-to-video image parameters](https://chinallmapi.com/guides/image-to-video-image-parameters)
- [Video task polling and failure handling](https://chinallmapi.com/guides/video-generation-task-polling)
- [401 Invalid token troubleshooting](https://chinallmapi.com/guides/401-invalid-token-api-error)
- [429 Too Many Requests troubleshooting](https://chinallmapi.com/guides/429-too-many-requests-api-error)
- [API balance and billing troubleshooting](https://chinallmapi.com/guides/api-balance-billing-errors)

## Validate locally

The test suite validates request shapes without accessing the API:

```bash
npm test
npm run check
```

CI also checks Node.js syntax, Python syntax, and Bash syntax without using secrets.

## License

MIT. See [LICENSE](LICENSE).
