import { async, TestBed } from '@angular/core/testing';
import { FixedpluginComponent } from './fixedplugin.component';
describe('FixedpluginComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [FixedpluginComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(FixedpluginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should be created', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=fixedplugin.component.spec.js.map