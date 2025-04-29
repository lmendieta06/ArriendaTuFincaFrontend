import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, throwError } from 'rxjs';
import { catchError, map } from 'rxjs';
import axios, { AxiosInstance, AxiosResponse }from 'axios';
import { TipoUsuario } from '../../enums/tipo_usuario';
import { environment } from '../../../environments/environment';

export interface LoginDTO {
  email: string;
  password: string;
}

export interface UsuarioResponse {
  id: number;
  nombre: string;
  email: string;
  tipoUsuario: TipoUsuario;
}

@Injectable({
  providedIn: 'root'
})

export class LoginService{

  private apiUrl = `${environment.apiUrl}/auth`;
  private axios: AxiosInstance;
  private currentUserSubject: BehaviorSubject<UsuarioResponse | null>;
  public currentUser: Observable<UsuarioResponse | null>;

  constructor() {
    // Inicializar con el usuario guardado en localStorage (si existe)
    this.currentUserSubject = new BehaviorSubject<UsuarioResponse | null>(
      this.getUserFromStorage()
    );
    this.currentUser = this.currentUserSubject.asObservable();

    // Configurar instancia de Axios
    this.axios = axios.create({
      baseURL: this.apiUrl,
      withCredentials: true // Importante para incluir cookies de sesión
    });

    // Interceptor para manejar errores de autenticación
    this.axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response && [401, 403].includes(error.response.status) && this.isAuthenticated()) {
          // Si recibimos un 401 o 403 y estamos "autenticados", la sesión ha expirado
          this.clearUserData();
        }
        return Promise.reject(error);
      }
    );
  }

  // Obtener el usuario actual del BehaviorSubject
  public get currentUserValue(): UsuarioResponse | null {
    return this.currentUserSubject.value;
  }

  // Obtener usuario del localStorage
  private getUserFromStorage(): UsuarioResponse | null {
    const storedUser = localStorage.getItem('usuario');
    return storedUser ? JSON.parse(storedUser) : null;
  }

  // Guardar usuario en localStorage y actualizar BehaviorSubject
  private setUserData(user: UsuarioResponse): void {
    localStorage.setItem('usuario', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  // Limpiar datos del usuario
  private clearUserData(): void {
    localStorage.removeItem('usuario');
    this.currentUserSubject.next(null);
  }

  // Iniciar sesión
  login(email: string, password: string): Observable<UsuarioResponse> {
    return from(this.axios.post<UsuarioResponse>(
      '/login',
      { email, password }
    )).pipe(
      map((response: AxiosResponse<UsuarioResponse>) => {
        // Obtener datos del cuerpo de la respuesta
        const userData = response.data;
        
        // Obtener headers con información del usuario
        const userId = response.headers['x-usuario-id'];
        const userName = response.headers['x-usuario-nombre'];
        const userType = response.headers['x-usuario-tipo'];
        
        // Combinar datos del cuerpo y headers
        const user: UsuarioResponse = {
          id: userId ? Number(userId) : userData.id,
          nombre: userName || userData.nombre,
          email: userData.email,
          tipoUsuario: (userType as TipoUsuario) || userData.tipoUsuario
        };
        
        // Guardar datos del usuario
        this.setUserData(user);
        
        return user;
      }),
      catchError(error => {
        if (error.response) {
          if (error.response.status === 404) {
            return throwError(() => new Error('Usuario no encontrado'));
          } else if (error.response.status === 401) {
            return throwError(() => new Error('Contraseña incorrecta'));
          }
        }
        return throwError(() => new Error('Error del servidor'));
      })
    );
  }

  // Obtener solo el ID del usuario
  public getUserId(): number | null {
    return this.currentUserValue?.id || null;
  }

  // Cerrar sesión
  logout(): Observable<void> {
    return from(this.axios.post<void>('/logout')).pipe(
      map(() => {
        this.clearUserData();
      }),
      catchError(error => {
        console.error('Error al cerrar sesión:', error);
        this.clearUserData(); // Limpiar de todos modos
        return throwError(() => new Error('Error al cerrar sesión'));
      })
    );
  }

  // Verificar si el usuario tiene un rol específico
  hasRole(requiredRole: TipoUsuario): boolean {
    const user = this.currentUserValue;
    if (!user) return false;
    
    return user.tipoUsuario === requiredRole;
  }

  // Verificar si el usuario puede acceder basado en roles permitidos
  canAccess(allowedRoles: TipoUsuario[]): boolean {
    const user = this.currentUserValue;
    if (!user) return false;
    
    return allowedRoles.includes(user.tipoUsuario);
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!this.currentUserValue;
  }
}