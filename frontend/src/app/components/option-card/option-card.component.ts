import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-option-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './option-card.component.html',
  styleUrl: './option-card.component.css'
})
export class OptionCardComponent {
  @Input() type : "arrendatario" | "arrendador" = "arrendatario";
}
