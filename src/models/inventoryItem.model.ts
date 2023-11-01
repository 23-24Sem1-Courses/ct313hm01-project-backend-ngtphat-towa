export interface InventoryItem {
  id?: string;
  userId: string;
  catalogItemId: string;
  quantity: number;
  acquireDate: Date;
}
