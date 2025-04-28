import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegisterService } from '../../services/register_services/register.service';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private registerService: RegisterService, private router: Router) {}
  console = console;

  usuario = {
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    password: '',
    arrendar: false
  };

  passwordError: boolean = false;

  onPasswordChange(): void {
    this.passwordError = false;
  }

  async onSubmit(form: NgForm): Promise<void> {
    console.log('Formulario enviado, estado:', form.valid);
    console.log('Valores del formulario:', form.value);
    if (this.usuario.password.length < 8 || this.usuario.password.includes(' ')) {
      this.passwordError = true;
      return;
    }
    
    if (form.valid) {
      try {
        console.log('Enviando datos al backend...', this.usuario);
        const usuarioCreado = await this.registerService.createUsuario(this.usuario);
        console.log('Usuario creado exitosamente:', usuarioCreado);

        // Redirigir a login o donde quieras
        // this.router.navigate(['/inicio']);
      } catch (error) {
        console.error('Error creando el usuario:', error);
        // Aquí podrías mostrar una alerta o mensaje en pantalla
      }
    }
  }
}