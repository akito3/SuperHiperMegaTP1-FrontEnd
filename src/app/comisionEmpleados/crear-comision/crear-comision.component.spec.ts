import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearComisionComponent } from './crear-comision.component';

describe('CrearComisionComponent', () => {
  let component: CrearComisionComponent;
  let fixture: ComponentFixture<CrearComisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearComisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearComisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
