import { CacheStore } from '@/data/protocols/cache';
import { LocalSavePurchases } from '@/data/usescases';
import { SavePurchases } from '@/domain';

class CacheStoreSpy implements CacheStore {
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

const mockPurchases = (): SavePurchases.Params[] => [{
  id: '1',
  date: new Date(),
  value: 50
}, {
  id: '2',
  date: new Date(),
  value: 70
}]

type SutTypes = {
  sut: LocalSavePurchases,
  cacheStore: CacheStoreSpy
}

const makeSut = (): SutTypes => {
  const cacheStore = new CacheStoreSpy();
  const sut = new LocalSavePurchases(cacheStore);

  return {
    sut,
    cacheStore
  }
}

describe('LocalSavePurchases', () => {
  test('Should not delete cache on sut.init', () => {
    const { cacheStore } = makeSut();

    expect(cacheStore.deleteCallsCount).toBe(0);
  })

  test('Should delete old cache on sut.save', async () => {
    const { cacheStore, sut } = makeSut();
    await sut.save(mockPurchases());
    expect(cacheStore.deleteCallsCount).toBe(1);
    expect(cacheStore.deleteKey).toBe('purchases');
  })

  test('Should not insert new Cache if delete fails', () => {
    const { cacheStore, sut } = makeSut();
    cacheStore.simulateDeleteError();
    const promise = sut.save(mockPurchases());
    expect(cacheStore.insertCallsCount).toBe(0);
    expect(promise).rejects.toThrow();
  })

  test('Should insert new Cache if delete succeeds', async () => {
    const { cacheStore, sut } = makeSut();
    const purchases = mockPurchases();
    await sut.save(purchases);
    expect(cacheStore.deleteCallsCount).toBe(1);
    expect(cacheStore.insertCallsCount).toBe(1);
    expect(cacheStore.insertValues).toEqual(purchases);
  })

  test('Should throw if insert throws', () => {
    const { cacheStore, sut } = makeSut();
    cacheStore.simulateInsertError();
    const promise = sut.save(mockPurchases());
    expect(promise).rejects.toThrow();
  })
})