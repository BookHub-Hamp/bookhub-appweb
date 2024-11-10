import { Component, inject, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BookDetailsResponse } from '../../models/book-details-response.model';
import { ApiImgPipe } from '../../../core/pipes/api-img.pipe';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [MatCardModule, ApiImgPipe],
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css'],
})
export class BookCardComponent {
  @Input() book!: BookDetailsResponse;
  isCustomer: boolean = false;

  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {}

  ngOnInit(): void {
    this.isCustomer = this.authService.getUserRole() === 'CUSTOMER';
  }

  viewDetails() {
    const routePath = this.isCustomer
      ? '/customer/catalog/details'
      : '/home/book-details';
    this.router.navigate([routePath, this.book.id]);
  }
}
