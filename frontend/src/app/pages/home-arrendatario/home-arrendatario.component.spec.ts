import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeArrendatarioComponent } from './home-arrendatario.component';

describe('HomeArrendatarioComponent', () => {
  let component: HomeArrendatarioComponent;
  let fixture: ComponentFixture<HomeArrendatarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeArrendatarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeArrendatarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
