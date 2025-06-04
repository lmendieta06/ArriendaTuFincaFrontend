import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudCalificacionArrendadorComponent } from './solicitud-calificacion-arrendador.component';

describe('SolicitudCalificacionArrendadorComponent', () => {
  let component: SolicitudCalificacionArrendadorComponent;
  let fixture: ComponentFixture<SolicitudCalificacionArrendadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudCalificacionArrendadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudCalificacionArrendadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
