var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { TagInputModule } from 'ngx-chips';
import { MaterialModule } from '../material.module';
import { FormsRoutes } from './forms.routing';
import { ExtendedFormsComponent } from './extendedforms/extendedforms.component';
import { RegularFormsComponent } from './regularforms/regularforms.component';
import { ValidationFormsComponent } from './validationforms/validationforms.component';
import { WizardComponent } from './wizard/wizard.component';
import { FieldErrorDisplayComponent } from './validationforms/field-error-display/field-error-display.component';
var Forms = /** @class */ (function () {
    function Forms() {
    }
    Forms = __decorate([
        NgModule({
            imports: [
                CommonModule,
                RouterModule.forChild(FormsRoutes),
                FormsModule,
                ReactiveFormsModule,
                NouisliderModule,
                TagInputModule,
                MaterialModule
            ],
            declarations: [
                ExtendedFormsComponent,
                RegularFormsComponent,
                ValidationFormsComponent,
                WizardComponent,
                FieldErrorDisplayComponent
            ]
        })
    ], Forms);
    return Forms;
}());
export { Forms };
//# sourceMappingURL=forms.module.js.map