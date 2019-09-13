import { async, TestBed } from '@angular/core/testing';
import { ListarSubcategoriasComponent } from './listar-subcategorias.component';
describe('ListarSubcategoriasComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [ListarSubcategoriasComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(ListarSubcategoriasComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=listar-subcategorias.component.spec.js.map