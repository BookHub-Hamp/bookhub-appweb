export interface PurchaseResponse {
  id: number;
  total: number;
  createdAt: string;
  paymentStatus: PaymentStatus;
  customerName: string;
  items: PurchaseItemResponse[];
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED'
}

export interface PurchaseItemResponse {
  bookId: number;
  bookTitle: string;
  quantity: number;
  price: number;
}
