import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeArrendatarioComponent } from './pages/home-arrendatario/home-arrendatario.component';
import { MisPropiedadesArrendatarioComponent } from './pages/mis-propiedades-arrendatario/mis-propiedades-arrendatario.component';
import { DashboardArrendatarioComponent } from './pages/dashboard-arrendatario/dashboard-arrendatario.component';
import { DashboardArrendadorComponent } from './pages/dashboard-arrendador/dashboard-arrendador.component';
import { SolicitudesArrendadorComponent } from './pages/solicitudes-arrendador/solicitudes-arrendador.component';
import { SolicitudesArrendatarioComponent } from './pages/solicitudes-arrendatario/solicitudes-arrendatario.component';
import { HomeArrendadorComponent } from './pages/home-arrendador/home-arrendador.component';
import { PagoArriendoComponent } from './pages/pago-arriendo/pago-arriendo.component';
import { CalificacionArrendatarioComponent } from './pages/calificacion-arrendatario/calificacion-arrendatario.component';


export const routes: Routes = [
  { path: '', component: HomeComponent, title:"Arrienda Tu Finca" },
  { path: 'inicio', component: LoginComponent, title:"Inicio" },
  { path: 'registro', component: RegisterComponent, title:"Crea tu cuenta" },
  { path: 'home-arrendatario', component: HomeArrendatarioComponent, title:"Panel de control", children:[
    {path: '', component: DashboardArrendatarioComponent, title:"Panel Arrendatario"},
    {path: 'mis-propiedades', component: MisPropiedadesArrendatarioComponent, title:"Mis Propiedades"},
    {path: 'solicitudes', component: SolicitudesArrendatarioComponent, title:"Solicitudes Recibidas"}
  ]},
  { path: 'home-arrendador', component: HomeArrendadorComponent, title:"Panel de control", children:[
    {path: '', component: DashboardArrendadorComponent, title:"Panel Arrendador"},
    {path: 'solicitudes', component: SolicitudesArrendadorComponent, title:"Solicitudes Recibidas"},
    { path: 'pago/:id', component: PagoArriendoComponent, title:"Pago de Arriendo" },
    { path: 'calificacion/:id', component: CalificacionArrendatarioComponent, title:"Calificacion Arrendatario" },
    //{ path: 'propiedad/:id', component: DetallePropiedadComponent }

  ]
  }


];
