import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropiedadCardComponent } from './propiedad-card.component';

describe('PropiedadCardComponent', () => {
  let component: PropiedadCardComponent;
  let fixture: ComponentFixture<PropiedadCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropiedadCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropiedadCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
