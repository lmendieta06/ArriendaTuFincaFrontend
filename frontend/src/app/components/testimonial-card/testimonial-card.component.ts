import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Testimonial {
  name: string;
  initials: string;
  avatarColor: string;
  rating: number;
  comment: string;
}

@Component({
  selector: 'app-testimonial-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonial-card.component.html',
  styleUrl: './testimonial-card.component.css'
})
export class TestimonialCardComponent {
  @Input() testimonial: Testimonial = {
    name: '',
    initials: '',
    avatarColor: '',
    rating: 5,
    comment: ''
  };
}
