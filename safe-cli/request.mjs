export const API_BASE_URL = 'https://chinallmapi.com'

const cleanString = (value, fallback = '') => {
  const normalized = String(value ?? '').trim()
  return normalized || fallback
}

const toDuration = (value) => {
  const duration = Number(value ?? 5)
  if (!Number.isInteger(duration) || duration < 3 || duration > 15) {
    throw new Error('--duration must be an integer from 3 to 15')
  }
  return duration
}

export function buildRequest(options = {}) {
  const kind = cleanString(options.kind, 'chat')
  const prompt = cleanString(options.prompt, '用一句话介绍 ChinaLLM。')

  if (kind === 'chat') {
    return {
      method: 'POST',
      url: `${API_BASE_URL}/v1/chat/completions`,
      body: {
        model: cleanString(options.model, 'gpt-5.4'),
        messages: [{ role: 'user', content: prompt }],
      },
    }
  }

  if (kind === 'image') {
    const imageUrl = cleanString(options.imageUrl)
    return {
      method: 'POST',
      url: `${API_BASE_URL}/v1/images/generations`,
      body: {
        model: cleanString(options.model, 'seedream_5.0Pro'),
        prompt,
        aspect_ratio: cleanString(options.ratio, '1:1'),
        resolution: cleanString(options.resolution, '1K'),
        watermark: options.watermark !== 'false',
        ...(imageUrl ? { reference_images: [imageUrl] } : {}),
      },
    }
  }

  if (kind === 'video') {
    const model = cleanString(options.model, 'happyhorse-1.0-t2v')
    const imageUrl = cleanString(options.imageUrl)
    const referenceImages = cleanString(options.referenceImages)
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)

    if (model === 'happyhorse-1.0-i2v' && !imageUrl) {
      throw new Error('happyhorse-1.0-i2v requires --image-url')
    }
    if (model === 'happyhorse-1.0-r2v' && referenceImages.length === 0) {
      throw new Error(
        'happyhorse-1.0-r2v requires --reference-images url1,url2'
      )
    }

    return {
      method: 'POST',
      url: `${API_BASE_URL}/v1/videos`,
      body: {
        model,
        prompt,
        resolution: cleanString(options.resolution, '720P'),
        duration: toDuration(options.duration),
        ...(model === 'happyhorse-1.0-i2v'
          ? { image_url: imageUrl }
          : {}),
        ...(model === 'happyhorse-1.0-r2v'
          ? { referenceImages }
          : {}),
        ...(model === 'happyhorse-1.0-i2v'
          ? {}
          : { ratio: cleanString(options.ratio, '16:9') }),
      },
    }
  }

  throw new Error(`Unsupported --kind: ${kind}`)
}

export function redactRequest(request) {
  return {
    ...request,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ***',
    },
  }
}

export function parseArgs(args) {
  const options = {}
  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index]
    if (argument === '--send') {
      options.send = true
      continue
    }
    if (!argument.startsWith('--')) continue
    const key = argument.slice(2).replace(/-([a-z])/g, (_, letter) =>
      letter.toUpperCase()
    )
    options[key] = args[index + 1]
    index += 1
  }
  return options
}
