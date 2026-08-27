import assert from 'node:assert/strict'
import test from 'node:test'

import { buildRequest, parseArgs, redactRequest } from '../safe-cli/request.mjs'

test('builds an OpenAI-compatible chat request', () => {
  const request = buildRequest({ kind: 'chat', prompt: 'hello' })
  assert.equal(request.url, 'https://chinallmapi.com/v1/chat/completions')
  assert.equal(request.body.model, 'gpt-5.4')
  assert.equal(request.body.messages[0].content, 'hello')
})

test('builds a Seedream image request with an optional reference image', () => {
  const request = buildRequest({
    kind: 'image',
    prompt: 'white background product image',
    imageUrl: 'https://example.com/product.png',
  })
  assert.equal(request.url, 'https://chinallmapi.com/v1/images/generations')
  assert.deepEqual(request.body.reference_images, [
    'https://example.com/product.png',
  ])
})

test('uses top-level image_url for HappyHorse i2v', () => {
  const request = buildRequest({
    kind: 'video',
    model: 'happyhorse-1.0-i2v',
    imageUrl: 'https://example.com/first-frame.png',
  })
  assert.equal(request.url, 'https://chinallmapi.com/v1/videos')
  assert.equal(request.body.image_url, 'https://example.com/first-frame.png')
  assert.equal('ratio' in request.body, false)
})

test('uses referenceImages for HappyHorse r2v', () => {
  const request = buildRequest({
    kind: 'video',
    model: 'happyhorse-1.0-r2v',
    referenceImages: 'https://example.com/a.png, https://example.com/b.png',
  })
  assert.deepEqual(request.body.referenceImages, [
    'https://example.com/a.png',
    'https://example.com/b.png',
  ])
})

test('rejects invalid video duration', () => {
  assert.throws(
    () => buildRequest({ kind: 'video', duration: 30 }),
    /integer from 3 to 15/
  )
})

test('redacts authorization in printable request output', () => {
  const printable = redactRequest(buildRequest({ kind: 'chat' }))
  assert.equal(printable.headers.Authorization, 'Bearer ***')
})

test('parses kebab-case CLI arguments and explicit send', () => {
  assert.deepEqual(parseArgs(['--kind', 'video', '--image-url', 'x', '--send']), {
    kind: 'video',
    imageUrl: 'x',
    send: true,
  })
})
