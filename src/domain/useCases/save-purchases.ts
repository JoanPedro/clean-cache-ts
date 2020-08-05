export interface SavePurchases {
  // purchases: SavePurchases.Params[] --> Equivalente.
  save: (purchases: Array<SavePurchases.Params>) => Promise<void>
}

export namespace SavePurchases {
  export type Params = {
    id: string,
    date: Date,
    value: number
  }
}
