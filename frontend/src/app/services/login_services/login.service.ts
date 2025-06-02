import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, throwError } from 'rxjs';
import { catchError, map } from 'rxjs';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
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
export class LoginService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private axios: AxiosInstance;
  private currentUserSubject: BehaviorSubject<UsuarioResponse | null>;
  public currentUser: Observable<UsuarioResponse | null>;
  
  // Almacenamiento en memoria para el token y usuario
  private token: string | null = null;
  private user: UsuarioResponse | null = null;

  constructor() {
    // Inicializar con null
    this.currentUserSubject = new BehaviorSubject<UsuarioResponse | null>(null);
    this.currentUser = this.currentUserSubject.asObservable();

    // Configurar instancia de Axios
    this.axios = axios.create({
      baseURL: this.apiUrl,
    });

    // Interceptor para añadir token JWT en cada solicitud
    this.axios.interceptors.request.use(config => {
      const currentToken = this.getToken();
      if (currentToken) {
        config.headers['Authorization'] = `Bearer ${currentToken}`;
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

  // Obtener token JWT
  public getToken(): string | null {
    return this.token;
  }  

  // Guardar usuario y token 
  private setUserData(user: UsuarioResponse, token: string): void {
    this.token = token;
    this.user = user;
    this.currentUserSubject.next(user);
  }

  // Limpiar datos del usuario
  private clearUserData(): void {
    this.token = null;
    this.user = null;
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