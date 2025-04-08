import { Injectable } from '@angular/core';
import { UserService } from '../user_services/user.service';
import { Usuario } from '../../models/usuario.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userService: UserService) { }

  async login(email: string, password: string): Promise<any> {
    try {
      // Obtener la lista de usuarios
      const usuarios = await this.userService.getUsers();

      console.log(usuarios);

      let usuarioEncontrado: Usuario | null = null;
      
      for (const usuario of usuarios) {
        // console.log(usuario);
        // console.log("user email: " + usuario.email);
        // console.log("user password: " + usuario.password);
        // console.log("email: " + email);
        // console.log("password: " + password);
        if (usuario.email === email && usuario.password === password) {
          usuarioEncontrado = usuario;
          console.log(usuario);
        }
      }
      
      console.log(usuarioEncontrado);

      if (usuarioEncontrado) {
        // Almacenar el usuario en localStorage (sin token por ahora)
        localStorage.setItem('currentUser', JSON.stringify(usuarioEncontrado));
        return { success: true, user: usuarioEncontrado };
      } else {
        throw new Error('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  getCurrentUser(): any {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }
}