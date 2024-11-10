import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { AuthRequest } from '../../../shared/models/auth-request.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatCardModule, MatSnackBarModule, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  private readonly CUSTOMER_ROLE = 'CUSTOMER';
  private readonly AUTHOR_ROLE = 'AUTHOR';
  private readonly CUSTOMER_ROUTE = '/customer/catalog';
  private readonly AUTHOR_ROUTE = '/author/books/list';
  private readonly DEFAULT_ROUTE = '/home';

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  controlHasError(control: string, error: string) {
    return this.loginForm.controls[control].hasError(error);
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    const credentials: AuthRequest = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: () => {
        this.showSnackBar('Inicio de sesión exitoso');
        this.redirectUserBasedOnRole();
      },
      error: () => {
        this.showSnackBar('Error en el inicio de sesión. Por favor, intenta de nuevo.');
      },
    });
  }

  private redirectUserBasedOnRole(): void {
    const userRole = this.authService.getUserRole();

    if (userRole === this.CUSTOMER_ROLE) {
      this.router.navigate([this.CUSTOMER_ROUTE]);
    } else if (userRole === this.AUTHOR_ROLE) {
      this.router.navigate([this.AUTHOR_ROUTE]);
    } else {
      this.router.navigate([this.DEFAULT_ROUTE]);
    }
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }
}
