import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../models/usuario.model';
import { Solicitud } from '../../models/solicitud.model';
import { Propiedad } from '../../models/propiedad.model';
import { Pago } from '../../models/pago.model';
import { SolicitudService } from '../../services/solicitud-services/solicitud.service';
import { FormsModule } from '@angular/forms';
import { PaymentCreateDTO, PaymentService } from '../../services/payments-services/payments.service';

@Component({
  selector: 'app-solicitud-pagos-arrendador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './solicitud-pagos-arrendador.component.html',
  styleUrl: './solicitud-pagos-arrendador.component.css'
})
export class SolicitudPagosArrendadorComponent implements OnInit, OnChanges {
    @Input() visible = false;
    @Input() solicitudId: number = 0;
    
    @Output() closeEvent = new EventEmitter<void>();
    @Output() pagoRealizado = new EventEmitter<PaymentCreateDTO>();

    solicitud!: Solicitud;
    propiedad!: Propiedad;
    arrendador!: Usuario;
    pago?: Pago;
    bancoSeleccionado: string = '';
    valorIngresado: number = 0;
    usuarioId!: number; // Se llenará desde la solicitud
    pagoEnProceso: boolean = false;
    mensajePago: string | null = null;
    referenciaPago: string ='';


  
    property: any = {};
    reservation: any = {};
    
    dataLoaded = false;
    errorMessage: string | null = null;
    showDetailsModal: boolean = false;

    constructor(private solicitudService: SolicitudService, private paymentService: PaymentService) { }

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
          if (data.arrendador) {
            this.arrendador = data.arrendador;
          }
          if (data.pago) {
            this.pago = data.pago;
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
      if (!this.propiedad || !this.arrendador) {
        if (this.solicitudId > 0) {
          this.loadSolicitudData();
          return;
        } else {
          this.errorMessage = 'Datos de solicitud incompletos';
          return;
        }
      }
  
      // Datos de la propiedad
      this.property = {
        code: this.getPropertyCode(this.propiedad),
        name: this.propiedad.nombre,
        price: this.propiedad.precioPorDia
      };
  
      
  
      // Datos del pago
      let paymentStatus = 'Pendiente';
      let paymentMethod = undefined;
      let paymentReference = undefined;
      let paymentDate = undefined;
      
      if (this.pago) {
        paymentStatus = this.pago.estadoPago;
        paymentMethod = this.pago.metodoPago;
        paymentReference = this.pago.referenciaPago;
        paymentDate = this.pago.fechaPago;
      }
    }
    
    private getPropertyCode(propiedad: Propiedad): string {
      if (!propiedad || !propiedad.nombre) return 'P0';
      
      // Esta lógica puede variar según tus necesidades
      const tipoPropiedad = propiedad.nombre.startsWith('Finca') ? 'F' : 
                            propiedad.nombre.startsWith('Hacienda') ? 'H' : 'P';
      return `${tipoPropiedad}${propiedad.id}`;
    }
  



  close(): void {
    this.visible = false;
    this.closeEvent.emit();
  }
  
    /**
     * Obtiene las iniciales del nombre
     */
    getInitials(name: string): string {
      if (!name) return '';
      
      return name
        .split(' ')
        .map(part => part.charAt(0))
        .join('')
        .substring(0, 2)
        .toUpperCase();
    }

  
    procesarPago() {

      if (!this.valorIngresado || this.valorIngresado < this.property.price) {
        this.mensajePago = 'El monto ingresado es insuficiente.';
        return;
      }

      
      if (!this.bancoSeleccionado || this.valorIngresado < this.property.price) {
        this.errorMessage = 'Debes seleccionar un método de pago y un valor válido.';
        return;
      }
  
      const pago: PaymentCreateDTO = {
        solicitudId: this.solicitudId,
        monto: this.valorIngresado,
        metodoPago: this.bancoSeleccionado.toUpperCase(), // Asumiendo que el enum en el back usa mayúsculas
        referenciaPago: 'REF-' + Date.now() // Puedes mejorarlo con un campo real si quieres
      };
  
      this.paymentService.createPago(pago).then(()=>{
        this.pagoRealizado.emit(pago);
        this.close();
      })
      .catch(error => {
        console.error('Error al hacer el pago:', error);
        this.mensajePago = 'Ocurrió un error al procesar el pago. Intenta nuevamente.';
      });
      
    }
}