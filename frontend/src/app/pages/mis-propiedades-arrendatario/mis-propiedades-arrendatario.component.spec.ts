import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisPropiedadesArrendatarioComponent } from './mis-propiedades-arrendatario.component';

describe('MisPropiedadesArrendatarioComponent', () => {
  let component: MisPropiedadesArrendatarioComponent;
  let fixture: ComponentFixture<MisPropiedadesArrendatarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisPropiedadesArrendatarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisPropiedadesArrendatarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
