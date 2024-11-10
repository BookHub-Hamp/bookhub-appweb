import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BookCreateUpdateRequest } from '../../shared/models/book-create-update-request';
import { BookDetailsResponse } from '../../shared/models/book-details-response.model';
import { PageableResponse } from '../../shared/models/pageble.response.model';
import { AuthorBookSalesReportDTO } from '../../shared/models/author-book-sales-report.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseURL = `${environment.apiUrl}/admin/books`;
  private http = inject(HttpClient);

  getBookDetails(): Observable<BookDetailsResponse[]> {
    return this.http.get<BookDetailsResponse[]>(`${this.baseURL}`);
  }

  paginateBooks(page: number, size: number): Observable<PageableResponse<BookDetailsResponse>> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<PageableResponse<BookDetailsResponse>>(`${this.baseURL}/page`,
      { params });
  }

  createBook(book: BookCreateUpdateRequest): Observable<BookDetailsResponse> {
    return this.http.post<BookDetailsResponse>(`${this.baseURL}`, book);
  }


  getBookDetailsById(id: number): Observable<BookDetailsResponse> {
    return this.http.get<BookDetailsResponse>(`${this.baseURL}/${id}`);
  }


  updateBook(id: number, book: BookCreateUpdateRequest): Observable<BookDetailsResponse> {
    return this.http.put<BookDetailsResponse>(`${this.baseURL}/${id}`, book);
  }


  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/${id}`);
  }

  getAuthorBookSalesReport(): Observable<AuthorBookSalesReportDTO[]> {
    return this.http.get<AuthorBookSalesReportDTO[]>(`${this.baseURL}/sales-report`);
  }
}
