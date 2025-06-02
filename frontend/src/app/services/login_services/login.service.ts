import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, throwError } from 'rxjs';
import { catchError, map } from 'rxjs';
import axios, { AxiosInstance, AxiosResponse }from 'axios';
import { TipoUsuario } from '../../enums/tipo_usuario';
import { environment } from '../../../environments/environment';
import { TokenResponse } from '../../models/token_response';
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
    });
    // Interceptor para añadir token JWT en cada solicitud
    this.axios.interceptors.request.use(config => {
      const token = this.getToken();
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    });

    // Interceptor para manejar errores de autenticación
    this.axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response && [401, 403].includes(error.response.status) && this.isAuthenticated()) {
          // Si recibimos un 401 o 403 y estamos "autenticados", el token ha expirado
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

    // Obtener token JWT del localStorage
  public getToken(): string | null {
    return localStorage.getItem('token');
  }  

  // Guardar usuario y token en localStorage y actualizar BehaviorSubject
  private setUserData(user: UsuarioResponse, token: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  // Limpiar datos del usuario
  private clearUserData(): void {
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  // Iniciar sesión
  login(email: string, password: string): Observable<UsuarioResponse> {
    return from(this.axios.post<TokenResponse>(
      '/login',
      { email, password }
    )).pipe(
      map((response: AxiosResponse<TokenResponse>) => {
        // Obtener datos del cuerpo de la respuesta
        const tokenData = response.data;
        const userData = tokenData.usuario;
        
        // Guardar datos del usuario y token
        this.setUserData(userData, tokenData.token);
        
        return userData;
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
    // Aquí puedes considerar invalidar el token en el servidor si tienes un endpoint para eso
    this.clearUserData();
    return new Observable<void>(observer => {
      observer.next();
      observer.complete();
    });
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!this.currentUserValue && !!this.getToken();
  }
}