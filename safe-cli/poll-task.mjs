import { parseArgs } from './request.mjs'

const options = parseArgs(process.argv.slice(2))
const pollUrl = String(options.pollUrl ?? '').trim()

if (!pollUrl) {
  throw new Error('Provide --poll-url from a previously submitted task')
}

const parsedUrl = new URL(pollUrl, 'https://chinallmapi.com')
if (parsedUrl.origin !== 'https://chinallmapi.com') {
  throw new Error('--poll-url must use https://chinallmapi.com')
}

console.log(
  JSON.stringify(
    {
      method: 'GET',
      url: parsedUrl.toString(),
      headers: { Authorization: 'Bearer ***' },
    },
    null,
    2
  )
)

if (!options.send) {
  console.log('\nDry run only. Add --send to query this existing task once.')
  process.exit(0)
}

const apiKey = process.env.CHINALLM_API_KEY?.trim()
if (!apiKey) {
  throw new Error('Set CHINALLM_API_KEY before using --send')
}

const response = await fetch(parsedUrl, {
  headers: { Authorization: `Bearer ${apiKey}` },
})
const body = await response.text()
console.log(`\nHTTP ${response.status}`)
console.log(body)
if (!response.ok) process.exitCode = 1
