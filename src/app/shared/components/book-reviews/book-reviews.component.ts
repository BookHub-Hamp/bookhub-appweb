import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-book-reviews',
  standalone: true,
  imports: [MatCardModule, MatIconModule, CommonModule],
  templateUrl: './book-reviews.component.html',
  styleUrls: ['./book-reviews.component.css'],
})
export class BookReviewsComponent implements OnInit {
  @Input() bookId!: number;

  //TO-DO: En su caso debe extraer los datos del api rest- es el unico componente que no esta conectado con el API
  reviews = [
    {
      reviewer: 'Juan Pérez',
      date: '2024-10-01',
      rating: 4,
      comment: 'Excelente libro, muy bien explicado y fácil de entender.',
    },
    {
      reviewer: 'Ana González',
      date: '2024-09-28',
      rating: 5,
      comment: 'Una guía completa y detallada. Me ayudó mucho en mi proyecto.',
    },
    {
      reviewer: 'Luis Mendoza',
      date: '2024-09-15',
      rating: 3,
      comment:
        'Buen libro, aunque algunos temas podrían tener más profundidad.',
    },
    {
      reviewer: 'María Lopez',
      date: '2024-09-05',
      rating: 4,
      comment: 'Lo recomendaría a cualquier estudiante de programación.',
    },
  ];

  ngOnInit(): void {
    console.log('Reseñas del libro ID:', this.bookId);
  }
}
