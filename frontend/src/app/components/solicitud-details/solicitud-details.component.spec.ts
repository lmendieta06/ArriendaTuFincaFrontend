import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudDetailsComponent } from './solicitud-details.component';

describe('SolicitudDetailsComponent', () => {
  let component: SolicitudDetailsComponent;
  let fixture: ComponentFixture<SolicitudDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
