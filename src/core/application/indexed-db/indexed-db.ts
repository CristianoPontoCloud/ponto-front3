import { PontoCloudCrypto } from '@/domain/crypto/crypto';
import { type IDBPDatabase, openDB } from 'idb';


export class AbstractionIDB {
  constructor(
    private readonly pontoCloudCrypto: PontoCloudCrypto
  ) { }
  private dbPromise: Promise<IDBPDatabase> | null = null;
  private initDB(storeName: string) {
    if (!this.dbPromise) {
      this.dbPromise = openDB('pontocloud-db', 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName);
          }
        },
      });
    }
    return this.dbPromise;
  }

  async saveValue<Value>(
    storeName: string,
    obj: { key: string, value: Value },
  ) {
    const encryptedValue = await this.pontoCloudCrypto.encrypt(obj.value)
    const db = await this.initDB(storeName);
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    await store.put(encryptedValue, obj.key);

    await tx.done;
  }

  async loadValue<Value>(
    storeName: string,
    key: IDBValidKey
  ): Promise<Value | null> {
    const db = await this.initDB(storeName);
    const encryptedValue = await db.get(storeName, key);
    return await this.pontoCloudCrypto.decrypt<Value>(encryptedValue)
  }
}

export async function createIndexedDbConection(userId: string) {
  const pontoCloudCrypto = await PontoCloudCrypto.create(userId)
  return new AbstractionIDB(pontoCloudCrypto);
}
