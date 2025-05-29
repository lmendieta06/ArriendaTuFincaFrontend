import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FincaCardComponent } from './finca-card.component';

describe('FincaCardComponent', () => {
  let component: FincaCardComponent;
  let fixture: ComponentFixture<FincaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FincaCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FincaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
