#!/usr/bin/env node
/** Compare the same prompt across multiple ChinaLLM models. */

const prompt = "What's 25 * 47? Answer with just the number."
const models = ['gpt-5.4', 'gpt-5.5', 'gpt-5.6-luna']

if (!process.argv.includes('--send')) {
  console.log(
    JSON.stringify(
      {
        baseURL: 'https://chinallmapi.com/v1',
        apiKey: '***',
        prompt,
        models,
      },
      null,
      2
    )
  )
  console.log('\nDry run only. Add --send to compare these models.')
  process.exit(0)
}

const apiKey = process.env.CHINALLM_API_KEY?.trim()
if (!apiKey) throw new Error('Set CHINALLM_API_KEY before using --send')

const { default: OpenAI } = await import('openai')
const client = new OpenAI({
  baseURL: 'https://chinallmapi.com/v1',
  apiKey,
})

console.log(`Comparing models on the same prompt:\n${prompt}\n`)
for (const model of models) {
  const response = await client.chat.completions.create({
    model,
    messages: [{ role: 'user', content: prompt }],
  })

  console.log(`[${model}]`)
  console.log(`  Response: ${response.choices[0].message.content}`)
  console.log(`  Tokens: ${response.usage?.total_tokens ?? 'not returned'}`)
  console.log()
}
