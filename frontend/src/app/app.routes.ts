import { Routes } from '@angular/router';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { LoginComponent } from './pages/login/login.component';
import { TemporalComponent } from './pages/temporal/temporal.component';
export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'temporal', component: TemporalComponent },
];
