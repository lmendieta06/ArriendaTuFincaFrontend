import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificacionArrendatarioComponent } from './calificacion-arrendatario.component';

describe('CalificacionArrendatarioComponent', () => {
  let component: CalificacionArrendatarioComponent;
  let fixture: ComponentFixture<CalificacionArrendatarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalificacionArrendatarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalificacionArrendatarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
