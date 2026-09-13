const encoder = new TextEncoder()

function base64Url(buffer: ArrayBuffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buffer))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export function randomString(length = 64) {
  const bytes = new Uint8Array(length)
  crypto.getRandomValues(bytes)
  return base64Url(bytes.buffer).slice(0, length)
}

export async function createCodeChallenge(verifier: string) {
  return base64Url(await crypto.subtle.digest('SHA-256', encoder.encode(verifier)))
}
