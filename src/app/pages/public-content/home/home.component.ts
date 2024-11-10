import { Component, OnInit, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { BookCardComponent } from '../../../shared/components/book-card/book-card.component';
import { BookDetailsResponse } from '../../../shared/models/book-details-response.model';
import { HomeService } from '../../../core/services/home.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatFormFieldModule, MatInputModule, MatIconModule, FormsModule,
    BookCardComponent
],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  recentBooks: BookDetailsResponse[] = [];
  filteredBooks: BookDetailsResponse[] = [];
  searchQuery: string = '';

  private bookService = inject(HomeService);

  constructor() {}

  ngOnInit(): void {
    this.bookService.getRecentBooks().subscribe({
      next: (books) => {
        this.recentBooks = books;
        this.filteredBooks = books;
      },
      error: (error) => console.error('Error al cargar los libros recientes', error)
    });
  }

  onSearch(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredBooks = this.recentBooks.filter(book =>
      book.title.toLowerCase().includes(query) ||
      book.authorName.toLowerCase().includes(query)
    );
  }
}
