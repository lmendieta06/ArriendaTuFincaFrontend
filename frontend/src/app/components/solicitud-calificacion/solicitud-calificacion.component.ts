import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { Calificacion } from '../../models/calificacion.model';
import { TipoCalificacion } from '../../enums/tipo_calificacion';
import { Solicitud } from '../../models/solicitud.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SolicitudService } from '../../services/solicitud-services/solicitud.service';
import { GradeService, CalificacionCreateDTO } from '../../services/grade_services/grade.service';
import { LoginService } from '../../services/login_services/login.service';
import { TipoUsuario } from '../../enums/tipo_usuario';

@Component({
  selector: 'app-solicitud-calificacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './solicitud-calificacion.component.html',
  styleUrls: ['./solicitud-calificacion.component.css']
})
export class SolicitudCalificacionComponent implements OnChanges {
  @Input() visible = false;
  @Input() solicitudId: number = 0;

  guest: Usuario | null = null;
  solicitud: Solicitud | null = null;
  

  @Output() close = new EventEmitter<void>();
  @Output() reviewSubmitted = new EventEmitter<Calificacion>();

  rating: number = 0;
  comment: string = '';
  dataLoaded = false;
  isSubmitting = false;
  errorMessage: string | null = null;

  constructor(
    private solicitudService: SolicitudService,
    private gradeService: GradeService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    if (this.solicitudId) {
      this.loadData();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['solicitudId'] && this.solicitudId) {
      this.loadData();
    }
  }

  loadData(): void {
    this.dataLoaded = false;
    this.errorMessage = null;
    
    this.solicitudService.getSolicitudById(this.solicitudId)
      .then((data: Solicitud) => {
        this.solicitud = data;
        this.guest = data.arrendador;
        this.dataLoaded = true;
      })
      .catch(error => {
        console.error('Error al cargar detalles de solicitud:', error);
        this.errorMessage = 'No se pudo cargar la información de la solicitud.';
        this.dataLoaded = true; // Para mostrar el mensaje de error
      });
  }

  getInitials(name: string): string {
    if (!name) return '';
    return name.split(' ').map(part => part.charAt(0)).join('').substring(0, 2).toUpperCase();
  }

  getMemberSince(): Date {
    return new Date(2024, 2, 1); // Simulado - Aquí podrías obtener la fecha real del usuario
  }

  getDuration(): number {
    if (!this.solicitud?.fechaInicio || !this.solicitud?.fechaFin) return 0;
    const start = new Date(this.solicitud.fechaInicio);
    const end = new Date(this.solicitud.fechaFin);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  setRating(value: number): void {
    this.rating = value;
  }

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

  closeModal(): void {
    this.visible = false;
    this.rating = 0;
    this.comment = '';
    this.errorMessage = null;
    this.close.emit();
  }

  submitReview(): void {
    if (this.rating === 0 || !this.solicitud || !this.solicitud.propiedad) {
      this.errorMessage = 'Por favor asigna una calificación.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = null;

    // Obtener el ID del usuario actual (arrendatario/propietario)
    const usuarioId = this.loginService.getUserId();
    
    if (!usuarioId) {
      this.errorMessage = 'Debes iniciar sesión para enviar una calificación.';
      this.isSubmitting = false;
      return;
    }

    // Crear el DTO para la calificación
    const calificacionDTO: CalificacionCreateDTO = {
      propiedadId: this.solicitud.propiedad.id,
      puntuacion: this.rating,
      comentario: this.comment,
      tipoCalificacion: TipoCalificacion.ARRENDADOR // Calificando al arrendador/huésped
    };

    // Enviar la calificación
    this.gradeService.createCalificacion(usuarioId, calificacionDTO)
      .then(calificacion => {
        // Éxito - emitir el evento con la calificación creada
        this.reviewSubmitted.emit(calificacion);
        this.closeModal();
      })
      .catch(error => {
        console.error('Error al enviar calificación:', error);
        this.errorMessage = 'No se pudo enviar la calificación. Por favor intenta nuevamente.';
        this.isSubmitting = false;
      });
  }
}