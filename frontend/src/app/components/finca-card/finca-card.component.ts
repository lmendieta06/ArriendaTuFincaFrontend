import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

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

  @Output() detalles = new EventEmitter<void>();

  disponible: string = '';

  ngOnInit() {
    this.disponible = this.status ? 'Disponible' : 'Ocupada';
  }

  verDetalles() {
    this.detalles.emit();
  }

}
