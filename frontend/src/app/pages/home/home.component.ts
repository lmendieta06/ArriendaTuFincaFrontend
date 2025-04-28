import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestimonialCardComponent } from '../../components/testimonial-card/testimonial-card.component';
import { OptionCardComponent } from '../../components/option-card/option-card.component';
import { FeatureCardComponent } from '../../components/feature-card/feature-card.component';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TestimonialCardComponent, OptionCardComponent, FeatureCardComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  features = [
    {
      title: 'Variedad de Propiedades',
      description: 'Accede a propiedades únicas y personalízalas según tus necesidades específicas para cada tipo de evento.',
      icon: 'fas fa-home',
      iconClass: 'variety'
    },
    {
      title: 'Gestión Sencilla',
      description: 'Maneja tus propiedades y reservas de forma simple con una interfaz fácil de usar.',
      icon: 'fas fa-mobile-alt',
      iconClass: 'simple'
    },
    {
      title: 'Sistema de Calificaciones',
      description: 'Conoce la experiencia de otros usuarios y garantiza la calidad antes de reservar.',
      icon: 'fas fa-star',
      iconClass: 'secure'
    },
    {
      title: 'Pagos Seguros',
      description: 'Realiza pagos y recibe dinero con los métodos más seguros y convenientes.',
      icon: 'fas fa-credit-card',
      iconClass: 'payments'
    }
  ];

  // Datos de ejemplo para los testimonios
  testimonials = [
    {
      name: 'Carlos Pérez',
      initials: 'CP',
      avatarColor: '#e74c3c',
      rating: 5,
      comment: 'Desde que publiqué mi finca en la plataforma, el número de pedidos ha aumentado. La gestión de pedidos es increíble.'
    },
    {
      name: 'Laura Gómez',
      initials: 'LG',
      avatarColor: '#3498db',
      rating: 4,
      comment: 'Excelente servicio desde el principio hasta el final. La experiencia fue mejor que nunca. Volveré a alquilar aquí.'
    },
    {
      name: 'Daniel Martínez',
      initials: 'DM',
      avatarColor: '#f1c40f',
      rating: 5,
      comment: 'La plataforma me ha permitido encontrar las mejores fincas de mi zona. Totalmente recomendada.'
    }
  ];
}
