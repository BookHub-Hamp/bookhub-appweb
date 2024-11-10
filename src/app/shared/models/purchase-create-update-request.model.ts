export interface PurchaseCreateUpdateRequest {
  total: number;
  customerId: number;
  items: PurchaseItemCreateUpdateRequest[];
}

export interface PurchaseItemCreateUpdateRequest {
  bookId: number;
  bookName: string;
  quantity: number;
  price: number;
}
