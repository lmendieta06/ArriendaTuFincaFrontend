import { UsuarioResponse } from "../services/login_services/login.service";
export interface TokenResponse {
    token: string;
    usuario: UsuarioResponse;
    type: string;
    date: string;
}