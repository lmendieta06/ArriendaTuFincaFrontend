import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, Router} from '@angular/router';
import { LoginService } from '../../services/login_services/login.service';
import { TipoUsuario } from '../../enums/tipo_usuario';
@Component({
  selector: 'app-nav-arrendatario',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-arrendatario.component.html',
  styleUrl: './nav-arrendatario.component.css'
})
export class NavArrendatarioComponent {
  userName: string = '';
  userType: TipoUsuario | null = null;
  isLoggedIn: boolean = false;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    // Suscribirse a los cambios del usuario actual
    this.loginService.currentUser.subscribe(user => {
      if (user) {
        this.isLoggedIn = true;
        this.userName = user.nombre;
        this.userType = user.tipoUsuario;
      } else {
        this.isLoggedIn = false;
        this.userName = '';
        this.userType = null;
      }
    });
  }

  getInitial(): string {
    if (this.userName && this.userName.length > 0) {
      return this.userName.charAt(0).toUpperCase();
    }
    return '';
  }

  logout(): void {
    this.loginService.logout().subscribe({
      next: () => {
        this.router.navigate(['/inicio'])
      },
      error: (error) => {
        console.error('Error al cerrar sesión:', error);
      }
    });
  }
}
