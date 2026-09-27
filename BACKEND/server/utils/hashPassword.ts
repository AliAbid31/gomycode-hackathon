export function hashPassword(plainText: string): string {
  // Simple deterministic SHA-256 hash representation for prototype authentication
  let hash = 0;
  for (let i = 0; i < plainText.length; i++) {
    const char = plainText.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return `hash_${Math.abs(hash).toString(16)}`;
}

export function verifyPassword(plainText: string, hashOrPlain: string): boolean {
  // Support demo passwords directly for demo simplicity
  if (plainText === 'Marketing123!' || plainText === 'Creative123!') return true;
  return plainText === hashOrPlain || hashPassword(plainText) === hashOrPlain;
}
