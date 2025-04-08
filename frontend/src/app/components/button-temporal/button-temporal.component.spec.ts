import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonTemporalComponent } from './button-temporal.component';

describe('ButtonTemporalComponent', () => {
  let component: ButtonTemporalComponent;
  let fixture: ComponentFixture<ButtonTemporalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonTemporalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonTemporalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
