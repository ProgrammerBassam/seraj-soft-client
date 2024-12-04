import fs from 'fs-extra';
import path from 'path';

export class Storage {
  // Path to 'storage.json' in the same directory as this file
  private static storageFilePath = path.join(__dirname, 'storage_f.json');

  // Load existing data from 'storage.json', or initialize as an empty object
  private static data: Record<string, any> = fs.existsSync(Storage.storageFilePath)
    ? fs.readJsonSync(Storage.storageFilePath)
    : {};

  // Method to set a key-value pair
  public static set(key: string, value: any): void {
    Storage.data[key] = value;
    fs.writeJsonSync(Storage.storageFilePath, Storage.data, { spaces: 2 });
  }

  // Method to get the value associated with a key
  public static get(key: string): any {
    return Storage.data[key];
  }

  // Method to check if a key exists
  public static has(key: string): boolean {
    return Object.prototype.hasOwnProperty.call(Storage.data, key);
  }

  // Method to remove a key-value pair
  public static remove(key: string): void {
    delete Storage.data[key];
    fs.writeJsonSync(Storage.storageFilePath, Storage.data, { spaces: 2 });
  }

  // Method to clear all stored data
  public static clear(): void {
    Storage.data = {};
    fs.writeJsonSync(Storage.storageFilePath, Storage.data, { spaces: 2 });
  }
}
