import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PropertyService } from '../../services/property-services/property.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Propiedad } from '../../models/propiedad.model';

@Component({
  selector: 'app-finca-card',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './finca-card.component.html',
  styleUrls: ['./finca-card.component.css']
})
export class FincaCardComponent {
  @Input() fincaName!: string;
  @Input() description!: string;
  @Input() ubicacion!: string;
  @Input() capacidad!: number;
  @Input() precioPorDia!: number;
  @Input() status!: boolean;
  @Input() image!: string;
  @Input() requestId: number = 0;
  propertyId: string = '';
  propertyLocation: string ="";
  propiedad: Propiedad | null = null;

  @Output() viewDetailsEvent = new EventEmitter<number>();

  disponible: string = '';

  constructor(private propertyService: PropertyService, private router:Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.disponible = this.status ? 'Disponible' : 'Ocupada';
    this.getData()
  }

  getData(): void {
      this.propertyService.getPropiedadById(this.requestId)
        .then((data: Propiedad) => {
          this.propiedad = data;
          
          if (data) {
            this.propertyId = data.id.toString();
            this.propertyLocation = data.ubicacion;
          }
          
        })
        .catch(error => {
          console.error('Error al cargar detalles de propiedad:', error);
        });
    }

  onViewDetails(event: Event): void {
    event.stopPropagation();
    this.viewDetailsEvent.emit(this.requestId);
  }

}
