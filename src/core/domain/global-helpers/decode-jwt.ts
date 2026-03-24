export function decodeJWT<T>(token: string): T | null {
  const [, payload] = token.split('.');

  if (!payload) {
    return null
  }

  // base64url -> base64
  const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
  // padding (complementa com "=" se necessário)
  const padded = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, '=');

  const jsonPayload = Buffer.from(padded, 'base64').toString('utf-8');

  return JSON.parse(jsonPayload);
}
