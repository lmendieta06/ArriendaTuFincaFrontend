import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PropertyService, PropiedadDetalle, PropiedadUpdateDTO } from '../../services/property-services/property.service';

@Component({
  selector: 'app-update-propiedad',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-propiedad.component.html',
  styleUrls: ['./update-propiedad.component.css']
})
export class UpdatePropiedadComponent implements OnInit {
  @Input() visible = false;
  @Input() propiedad!: PropiedadDetalle;
  @Output() close = new EventEmitter<void>();
  @Output() propiedadActualizada = new EventEmitter<void>();

  submitted = false;
  selectedImages: any[] = [];

  // Propiedades locales para las características
  caracteristicas = {
    permiteMascotas: false,
    tienePiscina: false,
    tieneAsador: false
  };

  departamentos: { id: number, nombre: string }[] = [
    { id: 1, nombre: 'Cundinamarca' },
    { id: 2, nombre: 'Antioquia' },
    { id: 3, nombre: 'Valle del Cauca' }
  ];

  municipios: { id: number, nombre: string, departamentoId: number }[] = [
    { id: 1, nombre: 'Bogotá', departamentoId: 1 },
    { id: 2, nombre: 'Soacha', departamentoId: 1 },
    { id: 3, nombre: 'Medellín', departamentoId: 2 },
    { id: 4, nombre: 'Cali', departamentoId: 3 }
  ];

  municipiosFiltrados: { id: number, nombre: string }[] = [];

  constructor(private propertyService: PropertyService) {}

  ngOnInit(): void {
    if (this.propiedad?.departamento) {
      const dep = this.departamentos.find(d => d.nombre === this.propiedad?.departamento);
      if (dep) {
        this.municipiosFiltrados = this.municipios.filter(m => m.departamentoId === dep.id);
      }
    }

    // Parsear características desde el string
    if (this.propiedad?.caracteristicas) {
      const caracteristicasArray = this.propiedad.caracteristicas.split(', ');
      this.caracteristicas.permiteMascotas = caracteristicasArray.includes('Permite mascotas');
      this.caracteristicas.tienePiscina = caracteristicasArray.includes('Piscina');
      this.caracteristicas.tieneAsador = caracteristicasArray.includes('Asador');
    }
  }

  onDepartamentoChange(): void {
    const selectedDep = this.departamentos.find(d => d.nombre === this.propiedad?.departamento);
    if (selectedDep) {
      this.municipiosFiltrados = this.municipios.filter(m => m.departamentoId === selectedDep.id);
    }
  }

  closeModal(): void {
    this.visible = false;
    this.close.emit();
  }

  onSubmit(): void {
    this.submitted = true;
    if (!this.propiedad) return;

    const updateDTO: PropiedadUpdateDTO = {
      nombre: this.propiedad.nombre,
      descripcion: this.propiedad.descripcion,
      precioPorDia: this.propiedad.precioPorDia,
      disponible: this.propiedad.disponible,
      capacidad: this.propiedad.capacidad,
      caracteristicas: this.getCaracteristicasString()
    };

    this.propertyService.updatePropiedad(this.propiedad.id, updateDTO)
      .then(() => {
        this.propiedadActualizada.emit();
        this.closeModal();
      })
      .catch(error => {
        console.error('Error actualizando propiedad:', error);
      });
  }

  getCaracteristicasString(): string {
    const caracteristicas = [
      this.caracteristicas.permiteMascotas ? 'Permite mascotas' : null,
      this.caracteristicas.tienePiscina ? 'Piscina' : null,
      this.caracteristicas.tieneAsador ? 'Asador' : null
    ].filter(c => c !== null) as string[];
    
    return caracteristicas.join(', ');
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