"use strict";
exports.__esModule = true;
exports.PasswordValidators = void 0;
var PasswordValidators = /** @class */ (function () {
    function PasswordValidators() {
    }
    PasswordValidators.patternValidator = function (regex, error) {
        return function (control) {
            if (!control.value) {
                // if control is empty return no error.
                return null;
            }
            // test the value of the control against the regexp supplied.
            var valid = regex.test(control.value);
            // if true, return no error (no error), else return error passed in the second parameter.
            return valid ? null : error;
        };
    };
    PasswordValidators.MatchValidator = function (control) {
        var password = control.get("password").value; // get password from our password form control
        var confirmPassword = control.get("confirmPassword").value; // get password from our confirmPassword form control
        // if the confirmPassword value is null or empty, don't return an error.
        if (!(confirmPassword === null || confirmPassword === void 0 ? void 0 : confirmPassword.length)) {
            return null;
        }
        // if the confirmPassword length is < 8, set the minLength error.
        if (confirmPassword.length < 8) {
            control.get('confirmPassword').setErrors({ minLength: true });
        }
        else {
            // compare the passwords and see if they match.
            if (password !== confirmPassword) {
                control.get("confirmPassword").setErrors({ mismatch: true });
            }
            else {
                // if passwords match, don't return an error.
                return null;
            }
        }
    };
    return PasswordValidators;
}());
exports.PasswordValidators = PasswordValidators;
