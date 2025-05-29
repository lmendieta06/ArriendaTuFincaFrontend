import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificacionesArrendadorComponent } from './calificaciones-arrendador.component';

describe('CalificacionesArrendadorComponent', () => {
  let component: CalificacionesArrendadorComponent;
  let fixture: ComponentFixture<CalificacionesArrendadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalificacionesArrendadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalificacionesArrendadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
