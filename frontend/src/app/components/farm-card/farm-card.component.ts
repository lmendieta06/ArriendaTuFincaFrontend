import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-farm-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './farm-card.component.html',
  styleUrls: ['./farm-card.component.scss']
})
export class FarmCardComponent {
  @Input() farmName: string = '';
  @Input() description: string = '';
  @Input() status: string = 'Disponible';
  @Input() imageNumber: number = 1;
}