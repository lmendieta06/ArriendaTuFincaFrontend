import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisPropiedadesArrendadorComponent } from './mis-propiedades-arrendador.component';

describe('MisPropiedadesArrendadorComponent', () => {
  let component: MisPropiedadesArrendadorComponent;
  let fixture: ComponentFixture<MisPropiedadesArrendadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisPropiedadesArrendadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisPropiedadesArrendadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
