
const encoder = new TextEncoder();
const decoder = new TextDecoder();
const FIXED_SALT = encoder.encode("app-fixed-salt");

export class PontoCloudCrypto {
  constructor(
    private readonly key: CryptoKey
  ) { }

  static async create(
    userId: string
  ): Promise<PontoCloudCrypto> {
    const SECRET = process.env.SYS_CONFIG_SECRET ?? ""
    const baseSecret = `${userId}:${SECRET}`;
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      encoder.encode(baseSecret),
      { name: "PBKDF2" },
      false,
      ["deriveKey"]
    );
    const key = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: FIXED_SALT,
        iterations: 100_000,
        hash: "SHA-256"
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"]
    );
    return new PontoCloudCrypto(key)
  }


  async encrypt<T>(
    data: T
  ): Promise<string> {
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encoded = encoder.encode(JSON.stringify(data));

    const ciphertext = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      this.key,
      encoded
    );

    const buffer = new Uint8Array(iv.length + ciphertext.byteLength);
    buffer.set(iv);
    buffer.set(new Uint8Array(ciphertext), iv.length);

    return this.uint8ArrayToBase64(buffer);
  }

  async decrypt<T>(
    encryptedData: string,
  ): Promise<T | null> {
    const key = await this.key;
    const rawData = this.base64ToUint8Array(encryptedData);

    const iv = rawData.slice(0, 12);
    const ciphertext = rawData.slice(12);

    const decrypted = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      ciphertext
    );

    return JSON.parse(decoder.decode(decrypted));
  }

  private uint8ArrayToBase64(buffer: Uint8Array): string {
    let binary = '';
    for (let i = 0; i < buffer.length; i++) {
      binary += String.fromCharCode(buffer[i]);
    }
    return btoa(binary);
  }

  private base64ToUint8Array(base64: string): Uint8Array {
    const binaryStr = atob(base64);
    return Uint8Array.from(binaryStr, c => c.charCodeAt(0));
  }
}

