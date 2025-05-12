import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePropiedadComponent } from './update-propiedad.component';

describe('UpdatePropiedadComponent', () => {
  let component: UpdatePropiedadComponent;
  let fixture: ComponentFixture<UpdatePropiedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePropiedadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePropiedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
