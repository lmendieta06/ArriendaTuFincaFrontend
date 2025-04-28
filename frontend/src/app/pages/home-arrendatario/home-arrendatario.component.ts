import { Component } from '@angular/core';
import { NavArrendatarioComponent } from '../../components/nav-arrendatario/nav-arrendatario.component';
import { HeaderArrendatarioComponent } from '../../components/header-arrendatario/header-arrendatario.component';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-home-arrendatario',
  standalone: true,
  imports: [NavArrendatarioComponent, HeaderArrendatarioComponent, RouterOutlet],
  templateUrl: './home-arrendatario.component.html',
  styleUrl: './home-arrendatario.component.css'
})
export class HomeArrendatarioComponent {

}
