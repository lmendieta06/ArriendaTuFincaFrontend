import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-propiedad-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './propiedad-card.component.html',
  styleUrl: './propiedad-card.component.css'
})
export class PropiedadCardComponent {
  @Input() name: string = '';
  @Input() location: string = '';
  @Input() price: number = 0;
  @Input() description: string = '';
  @Input() capacity: number = 0;
  @Input() rating: number = 0;
  @Input() reservations: number = 0;
  @Input() status: string = 'Disponible';
  @Input() amenities: string[] = [];
  @Input() image:string ='';
}
