import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearModificarServiciosComponent } from './crear-modificar-servicios.component';

describe('CrearModificarServiciosComponent', () => {
  let component: CrearModificarServiciosComponent;
  let fixture: ComponentFixture<CrearModificarServiciosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearModificarServiciosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearModificarServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
