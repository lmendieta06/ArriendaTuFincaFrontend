import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeArrendadorComponent } from './home-arrendador.component';

describe('HomeArrendadorComponent', () => {
  let component: HomeArrendadorComponent;
  let fixture: ComponentFixture<HomeArrendadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeArrendadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeArrendadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
