import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarSubcategoriasComponent } from './editar-subcategorias.component';

describe('EditarSubcategoriasComponent', () => {
  let component: EditarSubcategoriasComponent;
  let fixture: ComponentFixture<EditarSubcategoriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarSubcategoriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarSubcategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
