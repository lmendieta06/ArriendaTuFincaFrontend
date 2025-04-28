import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavArrendatarioComponent } from './nav-arrendatario.component';

describe('NavArrendatarioComponent', () => {
  let component: NavArrendatarioComponent;
  let fixture: ComponentFixture<NavArrendatarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavArrendatarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavArrendatarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
