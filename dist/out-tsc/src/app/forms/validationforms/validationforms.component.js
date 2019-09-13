var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { PasswordValidation } from './password-validator.component';
var MyErrorStateMatcher = /** @class */ (function () {
    function MyErrorStateMatcher() {
    }
    MyErrorStateMatcher.prototype.isErrorState = function (control, form) {
        var isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    };
    return MyErrorStateMatcher;
}());
export { MyErrorStateMatcher };
var ValidationFormsComponent = /** @class */ (function () {
    function ValidationFormsComponent(formBuilder) {
        this.formBuilder = formBuilder;
        this.emailFormControl = new FormControl('', [
            Validators.required,
            Validators.email,
        ]);
        this.validEmailRegister = false;
        this.validConfirmPasswordRegister = false;
        this.validPasswordRegister = false;
        this.validEmailLogin = false;
        this.validPasswordLogin = false;
        this.validTextType = false;
        this.validEmailType = false;
        this.validNumberType = false;
        this.validUrlType = false;
        this.pattern = "https?://.+";
        this.validSourceType = false;
        this.validDestinationType = false;
        this.matcher = new MyErrorStateMatcher();
    }
    ValidationFormsComponent.prototype.isFieldValid = function (form, field) {
        return !form.get(field).valid && form.get(field).touched;
    };
    ValidationFormsComponent.prototype.displayFieldCss = function (form, field) {
        return {
            'has-error': this.isFieldValid(form, field),
            'has-feedback': this.isFieldValid(form, field)
        };
    };
    ValidationFormsComponent.prototype.onRegister = function () {
        if (this.register.valid) {
        }
        else {
            this.validateAllFormFields(this.register);
        }
    };
    ValidationFormsComponent.prototype.onLogin = function () {
        if (this.login.valid) {
        }
        else {
            this.validateAllFormFields(this.login);
        }
    };
    ValidationFormsComponent.prototype.onType = function () {
        if (this.type.valid) {
        }
        else {
            this.validateAllFormFields(this.type);
        }
    };
    ValidationFormsComponent.prototype.validateAllFormFields = function (formGroup) {
        var _this = this;
        Object.keys(formGroup.controls).forEach(function (field) {
            var control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            }
            else if (control instanceof FormGroup) {
                _this.validateAllFormFields(control);
            }
        });
    };
    ValidationFormsComponent.prototype.ngOnInit = function () {
        this.register = this.formBuilder.group({
            // To add a validator, we must first convert the string value into an array. The first item in the array is the default value if any, then the next item in the array is the validator. Here we are adding a required validator meaning that the firstName attribute must have a value in it.
            email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
            // We can use more than one validator per field. If we want to use more than one validator we have to wrap our array of validators with a Validators.compose function. Here we are using a required, minimum length and maximum length validator.
            optionsCheckboxes: ['', Validators.required],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            confirmPassword: ['', Validators.required],
        }, {
            validator: PasswordValidation.MatchPassword // your validation method
        });
        this.login = this.formBuilder.group({
            // To add a validator, we must first convert the string value into an array. The first item in the array is the default value if any, then the next item in the array is the validator. Here we are adding a required validator meaning that the firstName attribute must have a value in it.
            email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
            // We can use more than one validator per field. If we want to use more than one validator we have to wrap our array of validators with a Validators.compose function. Here we are using a required, minimum length and maximum length validator.
            password: ['', Validators.required]
        });
        this.type = this.formBuilder.group({
            // To add a validator, we must first convert the string value into an array. The first item in the array is the default value if any, then the next item in the array is the validator. Here we are adding a required validator meaning that the firstName attribute must have a value in it.
            text: [null, Validators.required],
            email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
            number: [null, Validators.required],
            url: [null, Validators.required],
            // We can use more than one validator per field. If we want to use more than one validator we have to wrap our array of validators with a Validators.compose function. Here we are using a required, minimum length and maximum length validator.
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
        }, {
            validator: PasswordValidation.MatchPassword // your validation method
        });
    };
    ValidationFormsComponent.prototype.emailValidationRegister = function (e) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(e).toLowerCase())) {
            this.validEmailRegister = true;
        }
        else {
            this.validEmailRegister = false;
        }
    };
    ValidationFormsComponent.prototype.passwordValidationRegister = function (e) {
        if (e.length > 5) {
            this.validPasswordRegister = true;
        }
        else {
            this.validPasswordRegister = false;
        }
    };
    ValidationFormsComponent.prototype.confirmPasswordValidationRegister = function (e) {
        if (this.register.controls['password'].value === e) {
            this.validConfirmPasswordRegister = true;
        }
        else {
            this.validConfirmPasswordRegister = false;
        }
    };
    ValidationFormsComponent.prototype.emailValidationLogin = function (e) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(e).toLowerCase())) {
            this.validEmailLogin = true;
        }
        else {
            this.validEmailLogin = false;
        }
    };
    ValidationFormsComponent.prototype.passwordValidationLogin = function (e) {
        if (e.length > 5) {
            this.validPasswordLogin = true;
        }
        else {
            this.validPasswordLogin = false;
        }
    };
    ValidationFormsComponent.prototype.textValidationType = function (e) {
        if (e) {
            this.validTextType = true;
        }
        else {
            this.validTextType = false;
        }
    };
    ValidationFormsComponent.prototype.emailValidationType = function (e) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(e).toLowerCase())) {
            this.validEmailType = true;
        }
        else {
            this.validEmailType = false;
        }
    };
    ValidationFormsComponent.prototype.numberValidationType = function (e) {
        if (e) {
            this.validNumberType = true;
        }
        else {
            this.validNumberType = false;
        }
    };
    ValidationFormsComponent.prototype.urlValidationType = function (e) {
        try {
            new URL(e);
            this.validUrlType = true;
        }
        catch (_) {
            this.validUrlType = false;
        }
    };
    ValidationFormsComponent.prototype.sourceValidationType = function (e) {
        if (e) {
            this.validSourceType = true;
        }
        else {
            this.validSourceType = false;
        }
    };
    ValidationFormsComponent.prototype.confirmDestinationValidationType = function (e) {
        if (this.type.controls['password'].value === e) {
            this.validDestinationType = true;
        }
        else {
            this.validDestinationType = false;
        }
    };
    ValidationFormsComponent = __decorate([
        Component({
            selector: 'app-validationforms-cmp',
            templateUrl: 'validationforms.component.html'
        }),
        __metadata("design:paramtypes", [FormBuilder])
    ], ValidationFormsComponent);
    return ValidationFormsComponent;
}());
export { ValidationFormsComponent };
//# sourceMappingURL=validationforms.component.js.map