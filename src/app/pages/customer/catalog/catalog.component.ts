import { Component, OnInit, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { BookCardComponent } from '../../../shared/components/book-card/book-card.component';
import { BookDetailsResponse } from '../../../shared/models/book-details-response.model';
import { HomeService } from '../../../core/services/home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    BookCardComponent,
  ],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent {
  recentBooks: BookDetailsResponse[] = [];
  filteredBooks: BookDetailsResponse[] = [];
  searchQuery: string = '';

  private bookService = inject(HomeService);

  private router = inject(Router);

  constructor() {}

  ngOnInit(): void {
    this.bookService.getRecentBooks().subscribe({
      next: (books) => {
        this.recentBooks = books;
        this.filteredBooks = books;
      },
      error: (error) =>
        console.error('Error al cargar los libros recientes', error),
    });
  }

  onSearch(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredBooks = this.recentBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(query) ||
        book.authorName.toLowerCase().includes(query)
    );
  }

  goToCart(): void {
    this.router.navigate(['/customer/cart']);
  }
}
