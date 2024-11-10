import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  PurchaseResponse,
  PaymentStatus,
} from '../../../../shared/models/purchase-response.model';
import { PurchaseService } from '../../../../core/services/purchase.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  purchases: PurchaseResponse[] = [];
  private purchaseService = inject(PurchaseService);

  ngOnInit(): void {
    this.loadPurchaseHistory();
  }

  loadPurchaseHistory(): void {
    this.purchaseService.getPurchaseHistory().subscribe({
      next: (data) => (this.purchases = data),
      error: () => console.error('Error al cargar el historial de compras'),
    });
  }

  getPaymentStatusClass(status: PaymentStatus): string {
    switch (status) {
      case PaymentStatus.PAID:
        return 'status-paid';
      case PaymentStatus.PENDING:
        return 'status-pending';
      case PaymentStatus.FAILED:
        return 'status-failed';
      default:
        return '';
    }
  }
}
