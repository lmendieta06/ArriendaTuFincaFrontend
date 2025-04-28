import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeArrendatarioComponent } from './pages/home-arrendatario/home-arrendatario.component';
import { MisPropiedadesArrendatarioComponent } from './pages/mis-propiedades-arrendatario/mis-propiedades-arrendatario.component';
import { DashboardArrendatarioComponent } from './pages/dashboard-arrendatario/dashboard-arrendatario.component';
import { SolicitudesArrendatarioComponent } from './pages/solicitudes-arrendatario/solicitudes-arrendatario.component';
export const routes: Routes = [
  { path: '', component: HomeComponent, title:"Arrienda Tu Finca" },
  { path: 'inicio', component: LoginComponent, title:"Inicio" },
  { path: 'registro', component: RegisterComponent, title:"Crea tu cuenta" },
  { path: 'home-arrendatario', component: HomeArrendatarioComponent, title:"Panel de control", children:[
    {path: '', component: DashboardArrendatarioComponent, title:"Panel Arrendatario"},
    {path: 'mis-propiedades', component: MisPropiedadesArrendatarioComponent, title:"Mis Propiedades"},
    {path: 'solicitudes', component: SolicitudesArrendatarioComponent, title:"Solicitudes Recibidas"}
  ]},


];
