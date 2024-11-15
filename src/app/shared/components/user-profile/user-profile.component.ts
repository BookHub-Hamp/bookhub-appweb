import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileService } from '../../../core/services/user-profile.service';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { UserProfile } from '../../models/user-profile.model';
import { MatSnackBar } from '@angular/material/snack-bar'; // Importar MatSnackBar

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  profile!: UserProfile;
  //operador de aserción de no nulo.
  //En resumen, ! le dice al compilador que ignore las posibles verificaciones de null o undefined y asuma que la variable tiene un valor válido.

  private userProfileService = inject(UserProfileService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar); // Inyectar MatSnackBar

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const authData = this.authService.getUser();
    const userId = authData?.id;

    if (userId) {
      this.userProfileService.getUserProfile(userId).subscribe({
        next: (profile) => {
          this.profile = profile;
          this.showSnackBar('Perfil cargado con éxito');
        },
        error: (error) => {

          this.showSnackBar('Error al cargar el perfil');
        }
      });
    } else {

      this.showSnackBar('Usuario no autenticado');
      this.router.navigate(['/auth/login']);
    }
  }

  navigateToUpdateProfile(): void {
    this.router.navigate(['/customer/profile/update']);
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }
}
