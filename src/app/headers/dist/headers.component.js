"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HeadersComponent = void 0;
var core_1 = require("@angular/core");
var HeadersComponent = /** @class */ (function () {
    function HeadersComponent(api, router) {
        this.api = api;
        this.router = router;
        this.collapsed = false;
        this.screenWidth = 0;
    }
    HeadersComponent.prototype.ngOnInit = function () {
        this.getCustomerList();
        this.logDet = JSON.parse(localStorage.getItem('details'));
        console.log(this.logDet);
    };
    HeadersComponent.prototype.getCustomerList = function () {
        var _this = this;
        this.api.apiGetCall('customer/getAllCustomer').subscribe(function (data) {
            var _a;
            _this.customerList = data.data;
            if (!((_a = data.data) === null || _a === void 0 ? void 0 : _a.length)) {
                _this.noData = true;
            }
        });
    };
    HeadersComponent.prototype.getHeadClass = function () {
        var styleClass = '';
        if (this.collapsed && this.screenWidth > 768) {
            styleClass = 'head-trimmed';
        }
        else {
            styleClass = "head-md-screen";
        }
        return styleClass;
    };
    HeadersComponent.prototype.logout = function () {
        localStorage.clear();
        this.router.navigate(['/login']);
    };
    __decorate([
        core_1.Input()
    ], HeadersComponent.prototype, "collapsed");
    __decorate([
        core_1.Input()
    ], HeadersComponent.prototype, "screenWidth");
    HeadersComponent = __decorate([
        core_1.Component({
            selector: 'app-headers',
            templateUrl: './headers.component.html',
            styleUrls: ['./headers.component.scss']
        })
    ], HeadersComponent);
    return HeadersComponent;
}());
exports.HeadersComponent = HeadersComponent;
