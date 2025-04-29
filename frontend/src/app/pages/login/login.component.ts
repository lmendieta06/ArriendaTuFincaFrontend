import { Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, Router} from '@angular/router';
import { LoginService } from '../../services/login_services/login.service';
import { TipoUsuario } from '../../enums/tipo_usuario';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  // Modelo para el formulario
  email: string = '';
  password: string = '';
  
  loading = false;
  error = '';
  submitted = false;

  constructor(
    private authService: LoginService,
    private router: Router
  ) {
    // Redirigir si ya está autenticado
    if (this.authService.isAuthenticated()) {
      this.redirectBasedOnRole();
    }
  }

  onSubmit() {
    this.submitted = true;
    this.error = '';

    // Validación simple
    if (!this.email || !this.password) {
      this.error = 'Por favor complete todos los campos';
      return;
    }

    this.loading = true;
    this.authService.login(this.email, this.password)
      .subscribe({
        next: () => {
          this.redirectBasedOnRole();
        },
        error: error => {
          this.error = error?.message || 'Error al iniciar sesión';
          this.loading = false;
        }
      });
  }

  // Redirigir según el tipo de usuario
  private redirectBasedOnRole() {
    const currentUser = this.authService.currentUserValue;
    
    if (!currentUser) {
      return;
    }

    switch (currentUser.tipoUsuario) {
      case TipoUsuario.ARRENDADOR:
        this.router.navigate(['/home-arrendador']);
        break;
      case TipoUsuario.ARRENDATARIO:
        this.router.navigate(['/home-arrendatario']);
        break;
      default:
        this.router.navigate(['/dashboard']);
    }
  }
}