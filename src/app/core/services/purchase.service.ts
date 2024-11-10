import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PurchaseResponse } from '../../shared/models/purchase-response.model';
import { PurchaseCreateUpdateRequest } from '../../shared/models/purchase-create-update-request.model';
import { PurchaseReportResponse } from '../../shared/models/purchase-report-response.model';

@Injectable({
  providedIn: 'root',
})
export class PurchaseService {
  private baseURL = `${environment.apiUrl}/purchases`;
  private http = inject(HttpClient);

  getAllPurchases(): Observable<PurchaseResponse[]> {
    return this.http.get<PurchaseResponse[]>(this.baseURL);
  }

  createPurchase(
    purchase: PurchaseCreateUpdateRequest
  ): Observable<PurchaseResponse> {
    return this.http.post<PurchaseResponse>(this.baseURL, purchase);
  }

  getPurchaseHistory(): Observable<PurchaseResponse[]> {
    return this.http.get<PurchaseResponse[]>(`${this.baseURL}/user`);
  }

  getPurchaseReport(): Observable<PurchaseReportResponse[]> {
    return this.http.get<PurchaseReportResponse[]>(`${this.baseURL}/report`);
  }

  getPurchaseById(id: number): Observable<PurchaseResponse> {
    return this.http.get<PurchaseResponse>(`${this.baseURL}/${id}`);
  }

  confirmPurchase(id: number): Observable<PurchaseResponse> {
    return this.http.put<PurchaseResponse>(`${this.baseURL}/confirm/${id}`, {});
  }
}
