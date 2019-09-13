var PasswordValidation = /** @class */ (function () {
    function PasswordValidation() {
    }
    PasswordValidation.MatchPassword = function (AC) {
        var password = AC.get('password').value; // to get value in input tag
        var confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
        if (password !== confirmPassword) {
            AC.get('confirmPassword').setErrors({ MatchPassword: true });
        }
        else {
            return null;
        }
    };
    return PasswordValidation;
}());
export { PasswordValidation };
//# sourceMappingURL=password-validator.component.js.map