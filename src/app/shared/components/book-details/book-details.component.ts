import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BookDetailsResponse } from '../../models/book-details-response.model';
import { ApiImgPipe } from '../../../core/pipes/api-img.pipe';
import { BookService } from '../../../core/services/book.service';
import { HomeService } from '../../../core/services/home.service';
import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service';
import { PurchaseItemCreateUpdateRequest } from '../../models/purchase-create-update-request.model';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatSnackBarModule, ApiImgPipe],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent implements OnInit {
  book!: BookDetailsResponse;
  @Input() bookId!: number;

  private route = inject(ActivatedRoute);
  private bookService = inject(BookService);
  private homeService = inject(HomeService);
  private router = inject(Router);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);

  private cartService = inject(CartService);

  isAuthenticated = false;
  isCustomer: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.isCustomer = this.authService.getUserRole() === 'CUSTOMER';

    if (this.bookId) {
      this.loadBookDetails(this.bookId);
    }
  }

  loadBookDetails(bookId: number): void {
    this.homeService.getBookDetailsById(bookId).subscribe({
      next: (data) => (this.book = data),
      error: () => this.showSnackBar('Error al cargar detalles del libro'),
    });
  }

  goBackToHome(): void {
    const routePath = this.isCustomer ? '/customer/catalog' : '/home';
    this.router.navigate([routePath]);
  }

  addToCart(): void {
    if (!this.isCustomer) {
      this.showSnackBar(
        'Debe iniciar sesión como cliente para agregar al carrito'
      );
      return;
    }

    const cartItem: PurchaseItemCreateUpdateRequest = {
      bookId: this.book.id,
      bookName: this.book.title,
      quantity: 1,
      price: this.book.price,
    };

    this.cartService.addToCart(cartItem);
    console.log('Libro agregado al carrito:', cartItem);
    this.showSnackBar('Libro agregado al carrito');
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }
}
