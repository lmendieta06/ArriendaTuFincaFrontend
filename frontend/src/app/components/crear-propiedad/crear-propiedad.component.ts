import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PropertyService, PropiedadCreateDTO } from '../../services/property-services/property.service';
import { LoginService } from '../../services/login_services/login.service';

@Component({
  selector: 'app-crear-propiedad',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-propiedad.component.html',
  styleUrl: './crear-propiedad.component.css'
})
export class CrearPropiedadComponent implements OnInit {
  @Input() visible = false;
  @Output() close = new EventEmitter<void>();
  @Output() propiedadCreada = new EventEmitter<void>();

  submitted = false;
  selectedImages: any[] = [];

  propiedad = {
    nombre: '',
    descripcion: '',
    valorNoche: 0,
    habitaciones: 1,
    banos: 1,
    departamento: '',
    municipio: '',
    tipoIngreso: '',
    permiteMascotas: false,
    tienePiscina: false,
    tieneAsador: false
  };

  departamentos = [
    { id: 1, nombre: 'Cundinamarca' },
    { id: 2, nombre: 'Antioquia' },
    { id: 3, nombre: 'Valle del Cauca' }
  ];

  municipios = [
    { id: 1, nombre: 'Bogotá', departamentoId: 1 },
    { id: 2, nombre: 'Soacha', departamentoId: 1 },
    { id: 3, nombre: 'Medellín', departamentoId: 2 },
    { id: 4, nombre: 'Cali', departamentoId: 3 }
  ];

  municipiosFiltrados: { id: number, nombre: string }[] = [];

  constructor(
    private propertyService: PropertyService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.filtrarMunicipios();
  }

  filtrarMunicipios(): void {
    const dep = this.departamentos.find(d => d.nombre === this.propiedad.departamento);
    if (dep) {
      this.municipiosFiltrados = this.municipios.filter(m => m.departamentoId === dep.id);
    } else {
      this.municipiosFiltrados = [];
    }
  }

  onDepartamentoChange(): void {
    this.propiedad.municipio = ''; // limpiar selección actual
    this.filtrarMunicipios();
  }

  closeModal(): void {
    this.visible = false;
    this.close.emit();
  }

  onSubmit(): void {
    this.submitted = true;

    // Validación simple por campos requeridos
    const camposRequeridos = [
      this.propiedad.nombre,
      this.propiedad.descripcion,
      this.propiedad.departamento,
      this.propiedad.municipio,
      this.propiedad.tipoIngreso,
    ];
    if (camposRequeridos.some(c => !c) || this.propiedad.valorNoche <= 0) return;

    const userId = this.loginService.getUserId();
    if (!userId) return;

    const dto: PropiedadCreateDTO = {
      nombre: this.propiedad.nombre,
      descripcion: this.propiedad.descripcion,
      ubicacion: `${this.propiedad.municipio}, ${this.propiedad.departamento}`,
      precioPorDia: this.propiedad.valorNoche,
      disponible: true,
      capacidad: this.propiedad.habitaciones,
      caracteristicas: this.getCaracteristicas(),
      direccion: '', 
      ciudad: this.propiedad.municipio,
      departamento: this.propiedad.departamento,
      imagen: 'imagen.jpg' 
    };

    this.propertyService.createPropiedad(userId, dto)
      .then(() => {
        this.propiedadCreada.emit();
        this.closeModal();
      })
      .catch(error => {
        console.error('Error al crear propiedad:', error);
      });
  }

  getCaracteristicas(): string {
    const features: string[] = [];
    if (this.propiedad.permiteMascotas) features.push('Permite mascotas');
    if (this.propiedad.tienePiscina) features.push('Piscina');
    if (this.propiedad.tieneAsador) features.push('Asador');
    return features.join(', ');
  }

  onFileSelected(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      this.selectedImages = Array.from(files).map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
    }
  }

  removeImage(index: number): void {
    this.selectedImages.splice(index, 1);
  }
}
