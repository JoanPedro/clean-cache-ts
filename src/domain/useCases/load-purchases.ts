import { PurchaseModel } from '@/domain/models';

export interface LoadPurchases {
  // purchases: LoadPurchases.Result[] --> Equivalente.
  loadAll: () => Promise<Array<LoadPurchases.Result>>
}

export namespace LoadPurchases {
  export type Result = PurchaseModel
}
