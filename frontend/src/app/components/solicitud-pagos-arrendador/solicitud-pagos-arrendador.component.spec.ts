import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudPagosArrendadorComponent } from './solicitud-pagos-arrendador.component';

describe('SolicitudPagosArrendadorComponent', () => {
  let component: SolicitudPagosArrendadorComponent;
  let fixture: ComponentFixture<SolicitudPagosArrendadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudPagosArrendadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudPagosArrendadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
