"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.StoreAddEditComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var snackbar_component_1 = require("src/app/shared-module/snackbar/snackbar.component");
var store_model_1 = require("../store.model");
var StoreAddEditComponent = /** @class */ (function () {
    function StoreAddEditComponent(api, fb, router, snackbar, activeRoute) {
        var _this = this;
        this.api = api;
        this.fb = fb;
        this.router = router;
        this.snackbar = snackbar;
        this.activeRoute = activeRoute;
        this.types = [
            "Affiliate",
            "In Store",
        ];
        this.submitted = false;
        this.edit = false;
        this.view = false;
        this.activeRoute.paramMap.subscribe(function (params) {
            _this.storeId = params.get('id');
            if (_this.storeId && _this.router.url.includes('edit')) {
                _this.edit = true;
                _this.getStoreDetails();
            }
            else if (_this.router.url.includes('view')) {
                _this.view = true;
                _this.getStoreDetails();
            }
        });
    }
    StoreAddEditComponent.prototype.getStoreDetails = function () {
        var _this = this;
        this.api.apiGetDetailsCall(this.storeId, 'admin/getOneStore').subscribe(function (data) {
            _this.storeDetails = data.data;
            _this.form.patchValue(data.data);
            if (_this.router.url.includes('view')) {
                _this.form.disable();
            }
        });
    };
    StoreAddEditComponent.prototype.ngOnInit = function () {
        this.form = this.fb.group({
            storeName: ['', forms_1.Validators.required],
            email: ['', forms_1.Validators.required],
            co_ordinates: ['', forms_1.Validators.required],
            phoneNo: ['', forms_1.Validators.required],
            address: ['', forms_1.Validators.required],
            password: ['', forms_1.Validators.required]
        });
    };
    StoreAddEditComponent.prototype.discard = function () {
        if (this.storeId) {
            this.form.patchValue(this.storeDetails);
        }
        else {
            this.form.reset();
        }
        this.router.navigate(['/store/list']);
    };
    StoreAddEditComponent.prototype.saveCoupons = function () {
        var _this = this;
        if (this.form.invalid) {
            this.submitted = true;
            return;
        }
        else {
            this.submitted = false;
            var store = new store_model_1.Store();
            store.store_name = this.form.get('storeName').value;
            store.address = this.form.get('address').value;
            store.phone_no = this.form.get('phoneNo').value;
            store.co_ordinates = this.form.get('co_ordinates').value;
            store.email = this.form.get('email').value;
            store.password = this.form.get('password').value;
            store.role_flag = 'STORE_ADMIN';
            if (!this.storeId) {
                // store.role_flag = 'STORE_ADMIN';
                store.super_admin_id = localStorage.getItem('superAdminId');
            }
            if (this.storeId) {
                this.api.apiPutCall(store, 'admin/updateStoreAdmin').subscribe(function (data) {
                    if (data.message.includes('Successfully')) {
                        _this.snackbar.openFromComponent(snackbar_component_1.SnackbarComponent, {
                            data: data.message
                        });
                        _this.router.navigate(['/store/list']);
                    }
                }, function (error) {
                    if (error) {
                        _this.form.reset();
                    }
                });
            }
            else {
                this.api.apiPostCall(store, 'admin/createStoreAdmin').subscribe(function (data) {
                    if (data.message.includes('Created Successfully')) {
                        _this.snackbar.openFromComponent(snackbar_component_1.SnackbarComponent, {
                            data: data.message
                        });
                        _this.router.navigate(['/store/list']);
                    }
                }, function (error) {
                    if (error) {
                        _this.form.reset();
                    }
                });
            }
        }
    };
    StoreAddEditComponent = __decorate([
        core_1.Component({
            selector: 'app-store-add-edit',
            templateUrl: './store-add-edit.component.html',
            styleUrls: ['./store-add-edit.component.scss']
        })
    ], StoreAddEditComponent);
    return StoreAddEditComponent;
}());
exports.StoreAddEditComponent = StoreAddEditComponent;
