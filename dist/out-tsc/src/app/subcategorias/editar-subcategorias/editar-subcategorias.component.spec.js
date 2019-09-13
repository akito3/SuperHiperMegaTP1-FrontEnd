import { async, TestBed } from '@angular/core/testing';
import { EditarSubcategoriasComponent } from './editar-subcategorias.component';
describe('EditarSubcategoriasComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [EditarSubcategoriasComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(EditarSubcategoriasComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=editar-subcategorias.component.spec.js.map