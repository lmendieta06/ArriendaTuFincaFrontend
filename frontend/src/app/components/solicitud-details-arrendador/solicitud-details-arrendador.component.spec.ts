import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudDetailsArrendadorComponent } from './solicitud-details-arrendador.component';

describe('SolicitudDetailsArrendadorComponent', () => {
  let component: SolicitudDetailsArrendadorComponent;
  let fixture: ComponentFixture<SolicitudDetailsArrendadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudDetailsArrendadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudDetailsArrendadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
