import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavArrendadorComponent } from './nav-arrendador.component';

describe('NavArrendadorComponent', () => {
  let component: NavArrendadorComponent;
  let fixture: ComponentFixture<NavArrendadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavArrendadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavArrendadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
