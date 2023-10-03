"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CustomerListComponent = void 0;
var core_1 = require("@angular/core");
var table_1 = require("@angular/material/table");
var confirm_dialog_component_1 = require("src/app/shared-module/confirm-dialog/confirm-dialog.component");
var snackbar_component_1 = require("src/app/shared-module/snackbar/snackbar.component");
var CustomerListComponent = /** @class */ (function () {
    function CustomerListComponent(api, dialog, snackbar) {
        this.api = api;
        this.dialog = dialog;
        this.snackbar = snackbar;
        this.dataSource = new table_1.MatTableDataSource([]);
        this.columnsToDisplay = ['index', 'id', 'name', 'email', 'phoneNumber', 'total_value', 'visit', 'action'];
        this.types = [
            "Male",
            "Female",
            "Neutral"
        ];
        this.totalCustomer = 0;
        this.activeCustomer = 0;
        this.newCustomer = 0;
        this.noData = false;
    }
    CustomerListComponent.prototype.ngOnInit = function () {
        this.getCustomerList();
        // this.dataSource.data = this.customerData;
    };
    CustomerListComponent.prototype.applyFilter = function (filterValue) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    };
    CustomerListComponent.prototype.getCustomerList = function () {
        var _this = this;
        this.api.apiGetCall('customer/getAllCustomer').subscribe(function (data) {
            var _a, _b;
            _this.customerList = data.data;
            _this.activeCustomerList = data.data.filter(function (a) { return a.isOtpVerified === '1'; });
            _this.dataSource.data = data.data.filter(function (a) { return a.isOtpVerified === '1'; }).sort(function (a, b) { return Date.parse(b.createdAt) - Date.parse(a.createdAt); });
            _this.totalCustomer = (_a = data.data) === null || _a === void 0 ? void 0 : _a.length;
            _this.getCountStatus();
            if (!((_b = data.data) === null || _b === void 0 ? void 0 : _b.length)) {
                _this.noData = true;
            }
        }, function (error) {
            if (error) {
                _this.noData = true;
            }
        });
    };
    CustomerListComponent.prototype.applyTypeFilter = function () {
        var _this = this;
        if (this.selectedValue && this.selectedValue.length) {
            this.dataSource.data = this.activeCustomerList.filter(function (item) {
                return _this.selectedValue.some(function (option) {
                    return item.gender.indexOf(option) !== -1;
                });
            });
            if (this.dataSource.data.length === 0) {
                this.noData = true;
            }
        }
        else {
            this.dataSource.data = this.activeCustomerList;
        }
    };
    CustomerListComponent.prototype["delete"] = function (id) {
        var _this = this;
        var dialog = this.dialog.open(confirm_dialog_component_1.ConfirmDialogComponent, {
            width: '250px',
            data: {
                from: "delete"
            }
        });
        dialog.afterClosed().subscribe(function (data) {
            if (data) {
                _this.api.apiDeleteCall(id, 'customer/deleteCustomer').subscribe(function (response) {
                    if (response.message.includes('Successfully')) {
                        _this.snackbar.openFromComponent(snackbar_component_1.SnackbarComponent, {
                            data: response.message
                        });
                        _this.getCustomerList();
                    }
                });
            }
        });
    };
    CustomerListComponent.prototype.getCountStatus = function () {
        var temp1 = [];
        var temp2 = [];
        var temp3 = [];
        this.customerList.forEach(function (element) {
            if (element.isOtpVerified == '1') {
                temp1.push(element);
            }
            else if (element.isOtpVerified == '0') {
                temp2.push(element);
            }
        });
        this.activeCustomer = temp1.length;
        this.newCustomer = temp2.length;
    };
    CustomerListComponent = __decorate([
        core_1.Component({
            selector: 'app-customer-list',
            templateUrl: './customer-list.component.html',
            styleUrls: ['./customer-list.component.scss']
        })
    ], CustomerListComponent);
    return CustomerListComponent;
}());
exports.CustomerListComponent = CustomerListComponent;
