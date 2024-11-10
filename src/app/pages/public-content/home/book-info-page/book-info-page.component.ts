import { Component, inject } from '@angular/core';
import { BookDetailsComponent } from '../../../../shared/components/book-details/book-details.component';
import { BookReviewsComponent } from '../../../../shared/components/book-reviews/book-reviews.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-info-page',
  standalone: true,
  imports: [BookDetailsComponent, BookReviewsComponent],
  templateUrl: './book-info-page.component.html',
  styleUrl: './book-info-page.component.css'
})
export class BookInfoPageComponent {
  bookId: number;
  private route=inject(ActivatedRoute);

  constructor() {
    this.bookId = +this.route.snapshot.paramMap.get('id')!;
  }
}
