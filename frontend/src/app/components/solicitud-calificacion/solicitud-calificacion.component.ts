import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { Calificacion } from '../../models/calificacion.model';
import { TipoCalificacion } from '../../enums/tipo_calificacion';
import { Solicitud } from '../../models/solicitud.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-solicitud-calificacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './solicitud-calificacion.component.html',
  styleUrl: './solicitud-calificacion.component.css'
})
export class SolicitudCalificacionComponent {
  @Input() visible = false;
  @Input() solicitudId: number = 0;
  @Input() solicitud!: Solicitud;
  @Input() guest!: Usuario;
  
  @Output() close = new EventEmitter<void>();
  @Output() reviewSubmitted = new EventEmitter<Calificacion>();

  rating: number = 0;
  comment: string = '';

  constructor() { }

  // Método para obtener las iniciales del nombre del huésped para el avatar
  getInitials(name: string): string {
    if (!name) return '';
    
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }

  // Método para obtener la fecha de registro del usuario (simulado)
  getMemberSince(): Date {
    // Esta fecha debería venir del campo de registro del usuario
    // Por ahora simulamos con una fecha
    return new Date(2024, 2, 1); // marzo 2024
  }

  // Método para calcular la duración de la estadía
  getDuration(): number {
    if (!this.solicitud || !this.solicitud.fechaInicio || !this.solicitud.fechaFin) return 0;
    
    const start = new Date(this.solicitud.fechaInicio);
    const end = new Date(this.solicitud.fechaFin);
    
    // Cálculo de días entre fechas
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  }

  // Método para establecer la calificación
  setRating(value: number): void {
    this.rating = value;
  }

  // Método para obtener el texto descriptivo de la calificación
  getRatingText(): string {
    switch (this.rating) {
      case 1: return 'Deficiente';
      case 2: return 'Regular';
      case 3: return 'Bueno';
      case 4: return 'Muy Bueno';
      case 5: return 'Excelente';
      default: return '';
    }
  }

  // Método para cerrar el modal
  closeModal(): void {
    this.visible = false;
    this.close.emit();
  }

  // Método para enviar la calificación
  submitReview(): void {
    if (this.rating === 0) return;

    // Crear un nuevo objeto de calificación
    const nuevaCalificacion = new Calificacion(
      0, // El ID se establecerá en el backend
      this.solicitud.arrendador, // El anfitrión (usuario actual)
      this.solicitud.propiedad, // La propiedad
      this.rating,
      this.comment,
      new Date(), // Fecha actual
      TipoCalificacion.ARRENDADOR,
      true
    );

    this.reviewSubmitted.emit(nuevaCalificacion);
    this.closeModal();
    
    // Restablecer valores
    this.rating = 0;
    this.comment = '';
  }
}
