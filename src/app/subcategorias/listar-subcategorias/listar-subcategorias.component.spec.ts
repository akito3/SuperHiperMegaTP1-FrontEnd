import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarSubcategoriasComponent } from './listar-subcategorias.component';

describe('ListarSubcategoriasComponent', () => {
  let component: ListarSubcategoriasComponent;
  let fixture: ComponentFixture<ListarSubcategoriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarSubcategoriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarSubcategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
