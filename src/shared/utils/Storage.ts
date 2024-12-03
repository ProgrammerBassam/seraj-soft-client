import fs from 'fs-extra';
import path from 'path';
import { app } from 'electron';

export class Storage {
  private static storageFilePath = path.join(app.getPath('userData'), 'storage.json');
  private static data: Record<string, any> = fs.existsSync(Storage.storageFilePath)
    ? fs.readJsonSync(Storage.storageFilePath)
    : {};

  public static set(key: string, value: any): void {
    Storage.data[key] = value;
    fs.writeJsonSync(Storage.storageFilePath, Storage.data, { spaces: 2 });
  }

  public static get(key: string): any {
    return Storage.data[key];
  }

  public static has(key: string): boolean {
    return Object.prototype.hasOwnProperty.call(Storage.data, key);
  }

  public static remove(key: string): void {
    delete Storage.data[key];
    fs.writeJsonSync(Storage.storageFilePath, Storage.data, { spaces: 2 });
  }

  public static clear(): void {
    Storage.data = {};
    fs.writeJsonSync(Storage.storageFilePath, Storage.data, { spaces: 2 });
  }
}
