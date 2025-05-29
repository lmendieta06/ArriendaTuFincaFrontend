import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilArrendadorComponent } from './perfil-arrendador.component';

describe('PerfilArrendadorComponent', () => {
  let component: PerfilArrendadorComponent;
  let fixture: ComponentFixture<PerfilArrendadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilArrendadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilArrendadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
