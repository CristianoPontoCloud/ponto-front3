export function getEntriesKey(key: string): string {
  const n = key.replace(/[a-zA-Z]/g, '')
  if (key.includes('entry')) return `Entrada ${n}`
  return `Saída ${n}`
}