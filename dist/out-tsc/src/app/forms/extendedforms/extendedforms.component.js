var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
var ExtendedFormsComponent = /** @class */ (function () {
    function ExtendedFormsComponent() {
        this.simpleSlider = 40;
        this.doubleSlider = [20, 60];
        this.regularItems = ['Pizza', 'Pasta', 'Parmesan'];
        this.selectTheme = 'primary';
        this.cities = [
            { value: 'paris-0', viewValue: 'Paris' },
            { value: 'miami-1', viewValue: 'Miami' },
            { value: 'bucharest-2', viewValue: 'Bucharest' },
            { value: 'new-york-3', viewValue: 'New York' },
            { value: 'london-4', viewValue: 'London' },
            { value: 'barcelona-5', viewValue: 'Barcelona' },
            { value: 'moscow-6', viewValue: 'Moscow' },
        ];
    }
    ExtendedFormsComponent.prototype.ngOnInit = function () { };
    ExtendedFormsComponent.prototype.myFunc = function (val) {
        // code here
    };
    ExtendedFormsComponent = __decorate([
        Component({
            selector: 'app-extendedforms-cmp',
            templateUrl: 'extendedforms.component.html',
            styles: ["md-calendar {\n      width: 300px;\n  }"]
        })
    ], ExtendedFormsComponent);
    return ExtendedFormsComponent;
}());
export { ExtendedFormsComponent };
//# sourceMappingURL=extendedforms.component.js.map