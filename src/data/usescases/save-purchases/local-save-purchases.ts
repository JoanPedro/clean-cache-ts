import { CacheStore } from '@/data/protocols/cache';
import { SavePurchases } from '@/domain/useCases';

export class LocalSavePurchases implements SavePurchases {
  constructor(
    private readonly cacheStore: CacheStore,
    private readonly timestamp: Date
    ) {}
  
  // async save(): Primise<void> {} --> Função
  save = async (purchases: Array<SavePurchases.Params>): Promise<void> => {
    this.cacheStore.delete('purchases');
    this.cacheStore.insert('purchases', {
      timestamp: this.timestamp,
      value: purchases
    });
  }
}
