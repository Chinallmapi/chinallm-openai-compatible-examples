#!/usr/bin/env node
/**
 * Model switching example - compare responses from different models.
 * Demonstrates ChinaLLM's ability to route to multiple providers.
 */

import OpenAI from 'openai';

const client = new OpenAI({
  baseURL: 'https://chinallmapi.com/v1',
  apiKey: process.env.CHINALLM_API_KEY || 'your-api-key-here'
});

const prompt = "What's 25 * 47? Answer with just the number.";
const models = ['gpt-5.4', 'deepseek-v4-flash', 'glm-4.7'];

console.log('Comparing models on the same prompt:');
console.log(Prompt: \n);

async function compareModels() {
  for (const model of models) {
    const response = await client.chat.completions.create({
      model,
      messages: [{ role: 'user', content: prompt }]
    });

    console.log([]);
    console.log(  Response: );
    console.log(  Tokens:  (prompt: , completion: ));
    console.log();
  }
}

compareModels();