import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { BookDetailsResponse } from '../../../../shared/models/book-details-response.model';
import { BookService } from '../../../../core/services/book.service';
import { ApiImgPipe } from '../../../../core/pipes/api-img.pipe';
import { PageableResponse } from '../../../../shared/models/pageble.response.model';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ApiImgPipe,
  ],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  books: BookDetailsResponse[] = [];
  filteredBooks: BookDetailsResponse[] = [];
  filterText = '';

  displayedColumns: string[] = [
    'cover',
    'title',
    'authorName',
    'categoryName',
    'price',
    'actions',
  ];
  totalElements = 0;
  pageSize = 5;
  pageIndex = 0;

  private bookService = inject(BookService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(pageIndex: number = 0, pageSize: number = 5): void {
    this.bookService.paginateBooks(pageIndex, pageSize).subscribe({
      next: (response: PageableResponse<BookDetailsResponse>) => {
        this.books = response.content;
        this.filteredBooks = response.content;
        this.totalElements = response.totalElements;
        this.pageSize = response.size;
        this.pageIndex = response.number;
        console.log(this.books);
      },
      error: () => this.showSnackBar('Error al cargar la lista de libros'),
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.filteredBooks = this.books.filter((book) =>
      book.title.toLowerCase().includes(filterValue)
    );
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadBooks(this.pageIndex, this.pageSize);
  }

  createNewBook(): void {
    this.router.navigate(['/author/books/new']);
  }

  editBook(bookId: number): void {
    this.router.navigate(['/author/books/edit', bookId]);
  }

  deleteBook(bookId: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este libro?')) {
      this.bookService.deleteBook(bookId).subscribe({
        next: () => {
          this.showSnackBar('Libro eliminado exitosamente');
          this.loadBooks(this.pageIndex, this.pageSize);
        },
        error: () => this.showSnackBar('Error al eliminar el libro'),
      });
    }
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }
}
