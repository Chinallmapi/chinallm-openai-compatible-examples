import { buildRequest, parseArgs, redactRequest } from './request.mjs'

const options = parseArgs(process.argv.slice(2))
const request = buildRequest(options)

console.log(JSON.stringify(redactRequest(request), null, 2))

if (!options.send) {
  console.log('\nDry run only. Add --send to perform this request.')
  process.exit(0)
}

const apiKey = process.env.CHINALLM_API_KEY?.trim()
if (!apiKey) {
  throw new Error('Set CHINALLM_API_KEY before using --send')
}

const response = await fetch(request.url, {
  method: request.method,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  },
  body: JSON.stringify(request.body),
})

const responseText = await response.text()
let responseBody = responseText
try {
  responseBody = JSON.parse(responseText)
} catch {
  // Keep non-JSON upstream errors readable.
}

console.log(`\nHTTP ${response.status}`)
console.log(
  typeof responseBody === 'string'
    ? responseBody
    : JSON.stringify(responseBody, null, 2)
)

if (!response.ok) process.exitCode = 1
