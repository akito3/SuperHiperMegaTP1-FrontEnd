import { async, TestBed } from '@angular/core/testing';
import { CrearSubcategoriasComponent } from './crear-subcategorias.component';
describe('CrearSubcategoriasComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [CrearSubcategoriasComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(CrearSubcategoriasComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=crear-subcategorias.component.spec.js.map