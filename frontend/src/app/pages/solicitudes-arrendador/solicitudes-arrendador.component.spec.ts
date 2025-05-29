import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesArrendadorComponent } from './solicitudes-arrendador.component';

describe('SolicitudesArrendadorComponent', () => {
  let component: SolicitudesArrendadorComponent;
  let fixture: ComponentFixture<SolicitudesArrendadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudesArrendadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudesArrendadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
