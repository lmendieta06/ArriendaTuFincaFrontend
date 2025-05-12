import { Component } from '@angular/core';
import { NavarrendadorComponent } from '../../components/nav-arrendador/nav-arrendador.component';
import { HeaderArrendatarioComponent } from '../../components/header-arrendatario/header-arrendatario.component';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-home-arrendador',
  standalone: true,
  imports: [NavarrendadorComponent, HeaderArrendatarioComponent, RouterOutlet],
  templateUrl: './home-arrendador.component.html',
  styleUrl: './home-arrendador.component.css'
})
export class HomeArrendadorComponent {
 
}