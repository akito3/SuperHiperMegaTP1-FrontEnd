import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFisioterapeutasComponent } from './modal-fisioterapeutas.component';

describe('ModalFisioterapeutasComponent', () => {
  let component: ModalFisioterapeutasComponent;
  let fixture: ComponentFixture<ModalFisioterapeutasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalFisioterapeutasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFisioterapeutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
