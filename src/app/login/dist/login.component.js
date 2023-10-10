"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var snackbar_component_1 = require("../shared-module/snackbar/snackbar.component");
var password_Validators_1 = require("./password-Validators");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(fb, router, api, snackbar) {
        this.fb = fb;
        this.router = router;
        this.api = api;
        this.snackbar = snackbar;
        this.submitted = false;
        this.edit = false;
        this.hide = true;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.form = this.fb.group({
            email: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])],
            password: ['', forms_1.Validators.compose([
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(5),
                    password_Validators_1.PasswordValidators.patternValidator(new RegExp("(?=.*[0-9])"), {
                        requiresDigit: true
                    }),
                    password_Validators_1.PasswordValidators.patternValidator(new RegExp("(?=.*[A-Z])"), {
                        requiresUppercase: true
                    }),
                    password_Validators_1.PasswordValidators.patternValidator(new RegExp("(?=.*[a-z])"), {
                        requiresLowercase: true
                    }),
                    password_Validators_1.PasswordValidators.patternValidator(new RegExp("(?=.*[#$@^!%*?&])"), {
                        requiresSpecialChars: true
                    })
                ])]
        });
    };
    Object.defineProperty(LoginComponent.prototype, "requiredValid", {
        get: function () {
            return !this.form.controls["password"].hasError("required");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LoginComponent.prototype, "minLengthValid", {
        get: function () {
            return !this.form.controls["password"].hasError("minlength");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LoginComponent.prototype, "requiresDigitValid", {
        get: function () {
            return !this.form.controls["password"].hasError("requiresDigit");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LoginComponent.prototype, "requiresUppercaseValid", {
        get: function () {
            return !this.form.controls["password"].hasError("requiresUppercase");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LoginComponent.prototype, "requiresLowercaseValid", {
        get: function () {
            return !this.form.controls["password"].hasError("requiresLowercase");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LoginComponent.prototype, "requiresSpecialCharsValid", {
        get: function () {
            return !this.form.controls["password"].hasError("requiresSpecialChars");
        },
        enumerable: false,
        configurable: true
    });
    LoginComponent.prototype.login = function () {
        var _this = this;
        if (this.form.invalid) {
            this.submitted = true;
            return;
        }
        else {
            this.submitted = false;
            var payload = {
                email: this.form.controls['email'].value,
                password: this.form.controls['password'].value
            };
            this.api.apiPostCall(payload, 'admin/login').subscribe(function (data) {
                if (data.token) {
                    _this.snackbar.openFromComponent(snackbar_component_1.SnackbarComponent, {
                        data: 'User loggedIn Successfully'
                    });
                    if (data.data['role_flag'] === 'SUPER_ADMIN') {
                        localStorage.setItem('superAdminId', data.data['_id']);
                        _this.router.navigate(['/analytic']);
                    }
                    else if (data.data['role_flag'] === 'STORE_ADMIN') {
                        localStorage.setItem('superAdminId', data.data['super_admin_id']);
                        localStorage.setItem('storeId', data.data['_id']);
                        _this.router.navigate(['/analytic']);
                    }
                    else if (data.data['role_flag'] === 'BOCXY_ADMIN') {
                        localStorage.setItem('superAdminId', data.data['_id']);
                        _this.router.navigate(['/customers/list']);
                    }
                    else {
                        localStorage.setItem('superAdminId', data.data['_id']);
                        localStorage.setItem('storeId', data.data['_id']);
                        _this.router.navigate(['/analytic']);
                    }
                    localStorage.setItem('role', data.data['role_flag']);
                    localStorage.setItem('details', JSON.stringify(data.data));
                }
                else {
                    _this.snackbar.openFromComponent(snackbar_component_1.SnackbarComponent, {
                        data: 'Failed to Login'
                    });
                }
            }, function (error) {
                console.log(error);
                _this.snackbar.openFromComponent(snackbar_component_1.SnackbarComponent, {
                    data: error.message
                });
            });
        }
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.scss']
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
