import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarDetallesAsociadosComponent } from './listar-detalles-asociados.component';

describe('ListarDetallesAsociadosComponent', () => {
  let component: ListarDetallesAsociadosComponent;
  let fixture: ComponentFixture<ListarDetallesAsociadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarDetallesAsociadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarDetallesAsociadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
