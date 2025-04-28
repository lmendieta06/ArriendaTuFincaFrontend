import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  // Modelo para el formulario
  usuario = {
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    password: '',
    arrendar: false
  };
  
  // Variable para controlar el error de contraseña
  passwordError: boolean = false;
  
  // Limpia el error cuando el usuario edita la contraseña
  onPasswordChange(): void {
    this.passwordError = false;
  }
  
  // Maneja el envío del formulario
  onSubmit(form: NgForm): void {
    // Valida la contraseña (mínimo 8 caracteres sin espacios)
    if (this.usuario.password.length < 8 || this.usuario.password.includes(' ')) {
      this.passwordError = true;
      return;
    }
    
    if (form.valid) {
      console.log('Formulario enviado:', this.usuario);
      // Aquí puedes hacer la lógica para registrar al usuario
    }
  }
}