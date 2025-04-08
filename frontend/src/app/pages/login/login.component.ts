import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/login_services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { 
    // Verificar si ya hay una sesión activa
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/temporal']);
    }
  }

  onSubmit(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.authService.login(this.email, this.password)
      .then(response => {
        this.isLoading = false;
        // Redirigir al usuario a la página principal después del login exitoso
        this.router.navigate(['/temporal']);
      })
      .catch(error => {
        this.isLoading = false;
        this.errorMessage = 'Usuario o contraseña incorrectos';
        console.error('Error de login:', error);
      });
  }
}