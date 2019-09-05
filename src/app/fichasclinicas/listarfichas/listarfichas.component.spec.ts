import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarfichasComponent } from './listarfichas.component';

describe('ListarfichasComponent', () => {
  let component: ListarfichasComponent;
  let fixture: ComponentFixture<ListarfichasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarfichasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarfichasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
