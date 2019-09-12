import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarReservasComponent } from './agregar-reservas.component';

describe('AgregarReservasComponent', () => {
  let component: AgregarReservasComponent;
  let fixture: ComponentFixture<AgregarReservasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarReservasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
