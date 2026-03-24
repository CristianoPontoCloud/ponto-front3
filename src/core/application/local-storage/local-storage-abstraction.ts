class PontoCloudStorage {
  private baseKey = "@pontoCloudClient:";

  get(key: string): string | null {
    return localStorage.getItem(this.baseKey + key);
  }

  set(key: string, value: string): void {
    localStorage.setItem(this.baseKey + key, value);
  }

  remove(key: string): void {
    localStorage.removeItem(this.baseKey + key);
  }

  clear(): void {
    for (const storageKey of Object.keys(localStorage)) {
      if (storageKey.startsWith(this.baseKey)) {
        localStorage.removeItem(storageKey);
      }
    }
  }
}

export const pontoCloudLocalStorage = new PontoCloudStorage();
