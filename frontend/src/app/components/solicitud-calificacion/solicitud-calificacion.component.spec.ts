import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudCalificacionComponent } from './solicitud-calificacion.component';

describe('SolicitudCalificacionComponent', () => {
  let component: SolicitudCalificacionComponent;
  let fixture: ComponentFixture<SolicitudCalificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudCalificacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudCalificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
