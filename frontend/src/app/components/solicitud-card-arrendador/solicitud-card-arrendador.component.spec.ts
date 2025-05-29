import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudCardArrendadorComponent } from './solicitud-card-arrendador.component';

describe('SolicitudCardArrendadorComponent', () => {
  let component: SolicitudCardArrendadorComponent;
  let fixture: ComponentFixture<SolicitudCardArrendadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudCardArrendadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudCardArrendadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
