import { async, TestBed } from '@angular/core/testing';
import { RegistrarFichasComponent } from './registrar-fichas.component';
describe('RegistrarFichasComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [RegistrarFichasComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(RegistrarFichasComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=registrar-fichas.component.spec.js.map