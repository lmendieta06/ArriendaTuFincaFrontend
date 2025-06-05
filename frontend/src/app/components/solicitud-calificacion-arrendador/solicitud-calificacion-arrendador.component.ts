import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, output, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SolicitudService } from '../../services/solicitud-services/solicitud.service';
import { Solicitud } from '../../models/solicitud.model';
import { Propiedad } from '../../models/propiedad.model';
import { Usuario } from '../../models/usuario.model';
import { Calificacion } from '../../models/calificacion.model';
import { CalificacionCreateDTO, GradeService } from '../../services/grade_services/grade.service';
import { TipoCalificacion } from '../../enums/tipo_calificacion';
import { LoginService } from '../../services/login_services/login.service';

@Component({
  selector: 'app-solicitud-calificacion-arrendador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './solicitud-calificacion-arrendador.component.html',
  styleUrls: ['./solicitud-calificacion-arrendador.component.css']
})
export class SolicitudCalificacionArrendadorComponent {
  @Input() visible = false;
  @Input() solicitudId: number = 0;

  @Output() closeEvent = new EventEmitter<void>();
  @Output() calificacionEnviada = new EventEmitter<Calificacion>();

  etapa: 'finca' | 'arrendatario' = 'finca';
  dataLoaded = false;
  errorMessage: string | null = null;
  showDetailsModal: boolean = false;

  calificacionPropiedad!: Calificacion;
  comentarioPropiedad = '';
  rating: number = 0;
  solicitud!: Solicitud;
  propiedad!: Propiedad;
  isSubmitting = false;

  calificacionArrendatario!: Calificacion;
  comentarioArrendatario = '';
  ratingArrendatario: number = 0;
  arrendatario!: Usuario;

  constructor(private cdr: ChangeDetectorRef, private solicitudService: SolicitudService, private loginService: LoginService, private gradeService: GradeService) { }

  ngOnInit(): void {
    console.log('Modal de pago iniciado con ID:', this.solicitudId);
    if (this.solicitudId > 0) {
      this.loadSolicitudData();
    } else if (this.solicitud) {
      this.actualizarDatosVista();
    }
  }
    
  ngOnChanges(changes: SimpleChanges): void {
    // Si cambia el ID de la solicitud, cargar nuevos datos
    if (changes['solicitudId'] && !changes['solicitudId'].firstChange && this.solicitudId > 0) {
      this.loadSolicitudData();
    }
        
    // Si se actualiza la solicitud directamente
    if (changes['solicitud'] && changes['solicitud'].currentValue) {
      this.actualizarDatosVista();
    }
        
    // Si cambia la visibilidad a true y tenemos un ID, cargar datos
    if (changes['visible'] && changes['visible'].currentValue === true && this.solicitudId > 0) {
      this.loadSolicitudData();
    }
  }

  /**
   * Carga los datos completos de la solicitud usando el ID
   */
  loadSolicitudData(): void {
    this.dataLoaded = false;
    this.errorMessage = null;
      
    this.solicitudService.getSolicitudById(this.solicitudId)
    .then((data: Solicitud) => {
      this.solicitud = data;
        if (data.propiedad) {
          this.propiedad = data.propiedad;
        }
        if (data.arrendatario) {
          this.arrendatario = data.arrendatario;
        }
        if (data.calificacionPropiedad) {
          this.calificacionPropiedad = data.calificacionPropiedad;
        }
        if (data.calificacionArrendatario) {
          this.calificacionArrendatario = data.calificacionArrendatario;
        }

        this.actualizarDatosVista();
        this.dataLoaded = true;
    })
    .catch(error => {
      console.error('Error al cargar detalles de solicitud:', error);
      this.errorMessage = 'No se pudo cargar la información de la solicitud.';
      this.dataLoaded = true; // Para mostrar el mensaje de error
    });
  }

  private actualizarDatosVista(): void {
    if (!this.solicitud) {
      this.errorMessage = 'No hay datos de solicitud disponibles';
      return;
    }
      
    // Si no hay propiedad o usuario, intentar cargar completamente desde el servicio
    if (!this.propiedad || !this.arrendatario) {
      if (this.solicitudId > 0) {
        this.loadSolicitudData();
        return;
      } else {
        this.errorMessage = 'Datos de solicitud incompletos';
        return;
      }
    }

  }

  enviarCalificacionPropiedad() {
    // Validar que haya una calificación (rating) y un comentario
    if (!this.rating || this.comentarioPropiedad.trim() === '') {
      alert('Por favor, completa la calificación y el comentario antes de continuar.');
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
      comentario: this.comentarioPropiedad,
      tipoCalificacion: TipoCalificacion.PROPIEDAD // Calificando a la propiedad
    };
    
    // Enviar la calificación
    this.gradeService.createCalificacion(usuarioId, calificacionDTO)
    .then(calificacion => {
      // Éxito - emitir el evento con la calificación creada
      //this.calificacionEnviada.emit(calificacion);
      console.log('✅ Calificación de propiedad creada con éxito:', calificacion);
      this.etapa = 'arrendatario'; // Cambiar a la etapa de calificación del arrendatario
    })
    .catch((error: any) => {
      console.error('Error al enviar calificación:', error);
      this.errorMessage = 'No se pudo enviar la calificación. Por favor intenta nuevamente.';
      this.isSubmitting = false;
    });
    
  }

  enviarCalificacionArrendatario() {
  if (!this.ratingArrendatario || this.comentarioArrendatario.trim() === '') {
    alert('Por favor, completa la calificación y el comentario del arrendatario.');
    return;
  }

  this.isSubmitting = true;
  this.errorMessage = null;

  const usuarioId = this.loginService.getUserId();

  if (!usuarioId) {
    this.errorMessage = 'Debes iniciar sesión para enviar una calificación.';
    this.isSubmitting = false;
    return;
  }

  const calificacionDTO: CalificacionCreateDTO = {
    propiedadId: this.solicitud.propiedad.id,
    puntuacion: this.ratingArrendatario,
    comentario: this.comentarioArrendatario,
    tipoCalificacion: TipoCalificacion.ARRENDATARIO // Calificando al arrendatario
  };

  this.gradeService.createCalificacion(usuarioId, calificacionDTO)
    .then(calificacion => {
      console.log('✅ Calificación de arrendador creada con éxito:', calificacion);
      this.calificacionEnviada.emit(calificacion);
      this.close();
    })
    .catch((error: any) => {
      console.error('Error al enviar calificación de arrendador:', error);
      this.errorMessage = 'No se pudo enviar la calificación del arrendador.';
      this.isSubmitting = false;
    });
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

  close() {
    this.etapa = 'finca'; // Reset
    this.closeEvent.emit();
  }
}

