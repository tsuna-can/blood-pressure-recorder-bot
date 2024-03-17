const enc = new TextEncoder()
const algorithm = { name: 'HMAC', hash: 'SHA-256' }

export const validateSign = async (
  xLineSignature: string,
  channelSecret: string,
  data: string,
): Promise<boolean> => {
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(channelSecret),
    algorithm,
    false,
    ['sign'],
  )

  const signature = await crypto.subtle.sign(
    algorithm.name,
    key,
    enc.encode(data),
  )

  const digest = btoa(String.fromCharCode(...new Uint8Array(signature)))

  if (digest === xLineSignature) {
    return true
  }
  console.error('Invalid signature')
  return false
}
