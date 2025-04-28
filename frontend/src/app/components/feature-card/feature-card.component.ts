import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
interface Feature {
  title: string;
  description: string;
  icon: string;
  iconClass: string;
}

@Component({
  selector: 'app-feature-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature-card.component.html',
  styleUrl: './feature-card.component.css'
})
export class FeatureCardComponent {
  @Input() feature: Feature = {
    title: '',
    description: '',
    icon: '',
    iconClass: ''
  };
}
