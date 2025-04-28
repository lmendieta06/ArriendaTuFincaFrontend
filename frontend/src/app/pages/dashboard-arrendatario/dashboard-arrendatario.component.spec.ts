import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardArrendatarioComponent } from './dashboard-arrendatario.component';

describe('DashboardArrendatarioComponent', () => {
  let component: DashboardArrendatarioComponent;
  let fixture: ComponentFixture<DashboardArrendatarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardArrendatarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardArrendatarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
