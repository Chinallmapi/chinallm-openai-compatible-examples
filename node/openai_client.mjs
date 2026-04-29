#!/usr/bin/env node
/**
 * ChinaLLM chat completions example using OpenAI Node.js SDK.
 *
 * Usage:
 *   1. npm install openai
 *   2. Set API key: export CHINALLM_API_KEY="your-key"
 *   3. Run: node openai_client.mjs
 */

import OpenAI from 'openai';

// Initialize client with ChinaLLM base URL
const client = new OpenAI({
  baseURL: 'https://chinallmapi.com/v1',
  apiKey: process.env.CHINALLM_API_KEY || 'your-api-key-here'
});

async function main() {
  const response = await client.chat.completions.create({
    model: 'gpt-5.4',
    messages: [
      { role: 'user', content: 'Explain quantum computing in one paragraph.' }
    ]
  });

  console.log(response.choices[0].message.content);
  console.log(\nModel used: );
  console.log(Tokens: );
}

main();