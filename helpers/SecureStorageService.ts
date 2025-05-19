import EncryptedStorage from 'react-native-encrypted-storage';

class SecureStorageService {
  static async setItem<T>(key: string, value: T): Promise<void> {
    const serialized = JSON.stringify(value);
    await EncryptedStorage.setItem(key, serialized);
  }

  static async getItem<T>(key: string): Promise<T | null> {
    const item = await EncryptedStorage.getItem(key);
    if (!item) return null;

    try {
      return JSON.parse(item) as T;
    } catch (e) {
      console.error(`Failed to parse item for key ${key}`, e);
      return null;
    }
  }

  static async removeItem(key: string): Promise<void> {
    await EncryptedStorage.removeItem(key);
  }

  static async hasItem(key: string): Promise<boolean> {
    const item = await EncryptedStorage.getItem(key);
    return item !== null;
  }
}

export default SecureStorageService;
