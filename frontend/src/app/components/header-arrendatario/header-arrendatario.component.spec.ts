import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderArrendatarioComponent } from './header-arrendatario.component';

describe('HeaderArrendatarioComponent', () => {
  let component: HeaderArrendatarioComponent;
  let fixture: ComponentFixture<HeaderArrendatarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderArrendatarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderArrendatarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
