import { CacheStore } from "@/data/protocols/cache";
import { SavePurchases } from "@/domain/useCases";


export class CacheStoreSpy implements CacheStore {
  deleteCallsCount: number = 0;
  insertCallsCount: number = 0;
  insertValues: SavePurchases.Params[] = [];
  deleteKey: string;
  insertKey: string;

  delete(key: string): void {
    this.deleteCallsCount++;
    this.deleteKey = key;
  }

  insert(key: string, value: any): void {
    this.insertCallsCount++;
    this.insertKey = key;
    this.insertValues = value;
  }

  simulateDeleteError = (): void => {
    jest.spyOn(CacheStoreSpy.prototype, 'delete').mockImplementationOnce(() => { throw new Error() });
  }
  simulateInsertError = (): void => {
    jest.spyOn(CacheStoreSpy.prototype, 'insert').mockImplementationOnce(() => { throw new Error() });
  }
}