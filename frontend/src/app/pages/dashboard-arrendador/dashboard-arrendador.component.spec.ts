import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardArrendadorComponent } from './dashboard-arrendador.component';

describe('DashboardArrendadorComponent', () => {
  let component: DashboardArrendadorComponent;
  let fixture: ComponentFixture<DashboardArrendadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardArrendadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardArrendadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
