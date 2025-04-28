import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
export const routes: Routes = [
  { path: '', component: HomeComponent, title:"Arrienda Tu Finca" },
  { path: 'inicio', component: LoginComponent, title:"Inicio" },
  { path: 'registro', component: RegisterComponent, title:"Crea tu cuenta" },


];
