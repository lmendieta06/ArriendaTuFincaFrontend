import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesArrendatarioComponent } from './solicitudes-arrendatario.component';

describe('SolicitudesArrendatarioComponent', () => {
  let component: SolicitudesArrendatarioComponent;
  let fixture: ComponentFixture<SolicitudesArrendatarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudesArrendatarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudesArrendatarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
