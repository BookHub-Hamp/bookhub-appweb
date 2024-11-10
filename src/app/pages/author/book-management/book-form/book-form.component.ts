import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

import { ApiImgPipe } from '../../../../core/pipes/api-img.pipe';
import { BookService } from '../../../../core/services/book.service';
import { MediaService } from '../../../../core/services/media.service';
import { CategoryService } from '../../../../core/services/category.service';
import { AuthService } from '../../../../core/services/auth.service';

import { CategoryResponse } from '../../../../shared/models/category-response.model';
import { BookCreateUpdateRequest } from '../../../../shared/models/book-create-update-request';
import { BookDetailsResponse } from '../../../../shared/models/book-details-response.model';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ApiImgPipe,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule,
  ],
})
export default class BookFormComponent  {
  private bookService = inject(BookService);
  private mediaService = inject(MediaService);
  private categoryService = inject(CategoryService);
  private authService = inject(AuthService);


  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  categories: CategoryResponse[] = [];
  errors: string[] = [];
  bookId?: number;

  form: FormGroup = this.fb.group({
    title: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(250)],
    ],
    slug: ['', [Validators.required, Validators.pattern('[a-z0-9-]+')]],
    description: ['', [Validators.required]],
    price: ['', [Validators.required, Validators.min(0)]],
    coverPath: ['', Validators.required],
    filePath: ['', Validators.required],
    categoryId: ['', Validators.required],
  });

  ngOnInit(): void {
    this.bookId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadCategories();
  }

  private loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        if (this.bookId) this.loadBookForEdit();
      },
      error: () => this.errors.push('Error al cargar las categorías.'),
    });
  }

  private loadBookForEdit(): void {
    this.bookService.getBookDetailsById(this.bookId!).subscribe({
      next: (book: BookDetailsResponse) => {
        const category = this.categories.find(
          (cat) => cat.name === book.categoryName
        );
        if (category) {
          this.form.patchValue({
            ...book,
            categoryId: category.id,
          });
        }
      },
      error: () => this.errors.push('Error al cargar los detalles del libro.'),
    });
  }

  uploadFile(event: Event, control: string): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      this.mediaService.upload(formData).subscribe({
        next: (response) => this.form.controls[control].setValue(response.path),
        error: () => this.errors.push('Error al cargar el archivo.'),
      });
    }
  }

  createSlug(): void {
    const slug = this.form
      .get('title')
      ?.value.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
    this.form.get('slug')?.setValue(slug);
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formData: BookCreateUpdateRequest = {
      ...this.form.value,
      authorId: this.authService.getUser()?.authorId,
    };

    const request: Observable<BookDetailsResponse> = this.bookId
      ? this.bookService.updateBook(this.bookId, formData)
      : this.bookService.createBook(formData);

    request.subscribe({
      next: () => {
        this.snackBar.open('Libro guardado exitosamente', 'Cerrar', {
          duration: 3000,
        });
        this.router.navigate(['/author/books/list']);
      },
      error: (error) => {
        this.errors = error.error.errors || ['Error al guardar el libro'];
        this.snackBar.open('Error al guardar el libro', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }
}
