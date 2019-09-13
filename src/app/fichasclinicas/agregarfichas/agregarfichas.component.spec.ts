import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarfichasComponent } from './agregarfichas.component';

describe('AgregarfichasComponent', () => {
  let component: AgregarfichasComponent;
  let fixture: ComponentFixture<AgregarfichasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarfichasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarfichasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
