// book.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { BookDetailsResponse } from '../../shared/models/book-details-response.model';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private baseURL = `${environment.apiUrl}/books`;

  constructor(private http: HttpClient) {}

  getRecentBooks(): Observable<BookDetailsResponse[]> {
    return this.http.get<BookDetailsResponse[]>(`${this.baseURL}/recent`);
  }

  getBookDetailsById(id: number): Observable<BookDetailsResponse> {
    return this.http.get<BookDetailsResponse>(`${this.baseURL}/${id}`);
  }
}
