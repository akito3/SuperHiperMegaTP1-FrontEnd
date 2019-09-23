import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarComisionesComponent } from './listar-comisiones.component';

describe('ListarComisionesComponent', () => {
  let component: ListarComisionesComponent;
  let fixture: ComponentFixture<ListarComisionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarComisionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarComisionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
