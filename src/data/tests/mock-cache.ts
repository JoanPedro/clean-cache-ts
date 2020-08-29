import { CacheStore } from "@/data/protocols/cache";
import { SavePurchases } from "@/domain/useCases";
import { CacheStoreSpys } from './cacheStorySpy'

const MAXAGEINDAYS = 3;

export const getCacheExpirationDate = (timestamp: Date): Date => {
  const maxCacheAge = new Date(timestamp);
  maxCacheAge.setDate(maxCacheAge.getDate() - MAXAGEINDAYS);
  return maxCacheAge;
}

export class CacheStoreSpy implements CacheStore {
  actions: CacheStoreSpys.Action[] = [];
  insertValues: SavePurchases.Params[] = [];
  deleteKey: string;
  insertKey: string;
  fetchKey: string;
  fetchResult: any;

  fetch(key: string): void {
    this.actions.push(CacheStoreSpys.Action.fetch);
    this.fetchKey = key;
    return this.fetchResult;
  }

  delete(key: string): void {
    this.actions.push(CacheStoreSpys.Action.delete);
    this.deleteKey = key;
  }

  insert(key: string, value: any): void {
    this.actions.push(CacheStoreSpys.Action.insert);
    this.insertKey = key;
    this.insertValues = value;
  }

  replace(key: string, value: any): void {
    this.delete(key);
    this.insert(key, value);
  }

  simulateDeleteError = (): void => {
    jest.spyOn(CacheStoreSpy.prototype, 'delete').mockImplementationOnce(() => {
      this.actions.push(CacheStoreSpys.Action.delete);
      throw new Error();
    });
  }
  simulateInsertError = (): void => {
    jest.spyOn(CacheStoreSpy.prototype, 'insert').mockImplementationOnce(() => { 
      this.actions.push(CacheStoreSpys.Action.insert);
      throw new Error() 
    });
  }
  simulateFetchError = (): void => {
    jest.spyOn(CacheStoreSpy.prototype, 'fetch').mockImplementationOnce(() => { 
      this.actions.push(CacheStoreSpys.Action.fetch);
      throw new Error() 
    });
  }
}
