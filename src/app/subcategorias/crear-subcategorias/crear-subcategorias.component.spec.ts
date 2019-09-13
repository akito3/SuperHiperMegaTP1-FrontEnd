import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearSubcategoriasComponent } from './crear-subcategorias.component';

describe('CrearSubcategoriasComponent', () => {
  let component: CrearSubcategoriasComponent;
  let fixture: ComponentFixture<CrearSubcategoriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearSubcategoriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearSubcategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
