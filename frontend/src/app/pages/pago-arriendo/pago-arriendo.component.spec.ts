import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoArriendoComponent } from './pago-arriendo.component';

describe('PagoArriendoComponent', () => {
  let component: PagoArriendoComponent;
  let fixture: ComponentFixture<PagoArriendoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagoArriendoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagoArriendoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
