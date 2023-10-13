"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CouponsAddEditComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var snackbar_component_1 = require("src/app/shared-module/snackbar/snackbar.component");
var coupons_model_1 = require("../coupons.model");
var CouponsAddEditComponent = /** @class */ (function () {
    function CouponsAddEditComponent(api, fb, router, snackbar, activeRoute) {
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
            _this.couponId = params.get('id');
            if (_this.couponId && _this.router.url.includes('edit')) {
                _this.edit = true;
                _this.getCouponDetails();
            }
            else if (_this.router.url.includes('view')) {
                _this.view = true;
                _this.getCouponDetails();
            }
        });
    }
    CouponsAddEditComponent.prototype.getCouponDetails = function () {
        var _this = this;
        this.api.apiGetDetailsCall(this.couponId, 'coupon/findCoupon').subscribe(function (data) {
            _this.couponsDetails = data.data;
            _this.form.patchValue(data.data);
            if (_this.router.url.includes('view')) {
                _this.form.disable();
            }
        });
    };
    CouponsAddEditComponent.prototype.ngOnInit = function () {
        this.form = this.fb.group({
            createdFor: ['', forms_1.Validators.required],
            couponName: ['', forms_1.Validators.required],
            description: ['', forms_1.Validators.required],
            discountPercentage: ['', forms_1.Validators.required],
            type: ['', forms_1.Validators.required],
            totalQuantity: ['', forms_1.Validators.required],
            limit: ['', forms_1.Validators.required],
            validDateTill: ['', forms_1.Validators.required]
        });
    };
    CouponsAddEditComponent.prototype.discard = function () {
        if (this.couponId) {
            this.form.patchValue(this.couponsDetails);
        }
        else {
            this.form.reset();
        }
        this.router.navigate(['/coupon/list']);
    };
    CouponsAddEditComponent.prototype.saveCoupons = function () {
        var _this = this;
        if (this.form.invalid) {
            this.submitted = true;
            return;
        }
        else {
            this.submitted = false;
            var CouponsAdd = new coupons_model_1.couponsList();
            CouponsAdd._id = this.couponId ? this.couponId : null;
            ;
            CouponsAdd.createdFor = this.form.get('createdFor').value;
            CouponsAdd.couponName = this.form.get('couponName').value;
            CouponsAdd.description = this.form.get('description').value;
            CouponsAdd.type = this.form.get('type').value;
            CouponsAdd.discountPercentage = this.form.get('discountPercentage').value;
            CouponsAdd.totalQuantity = this.form.get('totalQuantity').value;
            CouponsAdd.limit = this.form.get('limit').value;
            CouponsAdd.validDateTill = this.form.get('validDateTill').value;
            var id = localStorage.getItem('role') === 'SUPER_ADMIN' ? localStorage.getItem('superAdminId') : localStorage.getItem('storeId');
            CouponsAdd.createdBy = id;
            // couponName:req.body.couponName,
            // totalQuantity:req.body.totalQuantity,
            // availedQuantity: req.body.availedQuantity,
            // createdFor:req.body.createdFor,
            // totalOrders:req?.body?.totalOrders || 0,
            // totalSales:req?.body?.totalSales || 0,
            // totalCommissions:req?.body?.totalCommissions || 0,
            // createdDate:req.body.createdDate,
            // validDateTill:req.body.validDateTill,
            // discountPercentage:req.body.discountPercentage,
            // type:req.body.type,
            // description:req.body.description,
            // remaining:req.body.remaining
            // CouponsAdd.totalCommissions = this.form.get('totalCommissions').value;
            // CouponsAdd.totalOrders = this.form.get('totalOrders').value;
            // CouponsAdd.totalSales = this.form.get('totalSales').value;
            // CouponsAdd.availedQuantity = this.form.get('availedQuantity')?.value ? this.form.get('availedQuantity').value : '0';
            // CouponsAdd.remaining = this.form.get('remaining')?.value;
            if (this.couponId) {
                this.api.apiPutCall(CouponsAdd, 'coupon/updateCoupon').subscribe(function (data) {
                    if (data.message.includes('Successfully')) {
                        _this.snackbar.openFromComponent(snackbar_component_1.SnackbarComponent, {
                            data: data.message
                        });
                        _this.router.navigate(['/coupon/list']);
                    }
                }, function (error) {
                    if (error) {
                        _this.form.reset();
                    }
                });
            }
            else {
                this.api.apiPostCall(CouponsAdd, 'coupon/createCoupon').subscribe(function (data) {
                    if (data.message.includes('Created Successfully')) {
                        _this.snackbar.openFromComponent(snackbar_component_1.SnackbarComponent, {
                            data: data.message
                        });
                        _this.router.navigate(['/coupon/list']);
                    }
                }, function (error) {
                    if (error) {
                        _this.form.reset();
                    }
                });
            }
        }
    };
    CouponsAddEditComponent = __decorate([
        core_1.Component({
            selector: 'app-coupons-add-edit',
            templateUrl: './coupons-add-edit.component.html',
            styleUrls: ['./coupons-add-edit.component.scss']
        })
    ], CouponsAddEditComponent);
    return CouponsAddEditComponent;
}());
exports.CouponsAddEditComponent = CouponsAddEditComponent;
