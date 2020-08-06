import { CacheStore } from '@/data/protocols/cache';
import { SavePurchases, LoadPurchases } from '@/domain/useCases';

export class LocalLoadPurchases implements SavePurchases, LoadPurchases {
  private readonly key = 'purchases';

  constructor(
    private readonly cacheStore: CacheStore,
    private readonly timestamp: Date
    ) {}
  
  // async save(): Primise<void> {} --> Função
  save = async (purchases: Array<SavePurchases.Params>): Promise<void> => {
    this.cacheStore.replace(this.key, {
      timestamp: this.timestamp,
      value: purchases
    });
  }

  loadAll = async (): Promise<Array<LoadPurchases.Result>> => {
    try {
      this.cacheStore.fetch(this.key)
      return []
    } catch (error) {
      this.cacheStore.delete(this.key)
      return []
    }
  }
}
