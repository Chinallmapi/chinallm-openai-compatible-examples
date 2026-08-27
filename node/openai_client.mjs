#!/usr/bin/env node
/**
 * ChinaLLM chat completions example using the OpenAI Node.js SDK.
 *
 * Dry run: node openai_client.mjs
 * Send:    CHINALLM_API_KEY=... node openai_client.mjs --send
 */

const request = {
  model: 'gpt-5.4',
  messages: [
    { role: 'user', content: 'Explain quantum computing in one paragraph.' },
  ],
}

if (!process.argv.includes('--send')) {
  console.log(
    JSON.stringify(
      {
        baseURL: 'https://chinallmapi.com/v1',
        apiKey: '***',
        request,
      },
      null,
      2
    )
  )
  console.log('\nDry run only. Add --send to perform this request.')
  process.exit(0)
}

const apiKey = process.env.CHINALLM_API_KEY?.trim()
if (!apiKey) throw new Error('Set CHINALLM_API_KEY before using --send')

const { default: OpenAI } = await import('openai')
const client = new OpenAI({
  baseURL: 'https://chinallmapi.com/v1',
  apiKey,
})

const response = await client.chat.completions.create(request)
console.log(response.choices[0].message.content)
console.log(`\nModel used: ${response.model}`)
console.log(`Tokens: ${response.usage?.total_tokens ?? 'not returned'}`)
