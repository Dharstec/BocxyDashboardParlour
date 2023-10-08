"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductListComponent = void 0;
var core_1 = require("@angular/core");
var table_1 = require("@angular/material/table");
var confirm_dialog_component_1 = require("src/app/shared-module/confirm-dialog/confirm-dialog.component");
var snackbar_component_1 = require("src/app/shared-module/snackbar/snackbar.component");
var ProductListComponent = /** @class */ (function () {
    function ProductListComponent(api, dialog, snackbar, router) {
        this.api = api;
        this.dialog = dialog;
        this.snackbar = snackbar;
        this.router = router;
        this.dataSource = new table_1.MatTableDataSource([]);
        this.columnsToDisplay = ['id', 'category', 'Formulation', 'name'];
        this.catagoryList = [
            "Haircare products",
            "Skincare products",
            "Nailcare products",
            "Cosmetics",
            "Makeup",
            "Fragrance",
            "Serums",
            "Sunscreens"
        ];
        this.colorList = [
            "Liquid",
            "Stick",
            "Cream",
            "Balm",
            "Gel"
        ];
        this.inStock = [
            "Less than 10",
            "Less than 50",
            "More than 100",
        ];
        this.noData = false;
        this.showAddProduct = false;
        if (localStorage.getItem('role') === 'SUPER_ADMIN') {
            this.showAddProduct = true;
            this.columnsToDisplay.push('action');
        }
        else {
            this.showAddProduct = false;
        }
    }
    ProductListComponent.prototype.ngOnInit = function () {
        this.getProductList();
    };
    ProductListComponent.prototype.edit = function (type, id) {
        this.router.navigate(['/product/' + type, id]);
    };
    ProductListComponent.prototype.getProductList = function () {
        var _this = this;
        this.api.apiGetCall('product/getProduct' + '/' + localStorage.getItem('superAdminId')).subscribe(function (data) {
            var _a;
            _this.inventoryList = data.data;
            _this.dataSource.data = data.data.sort(function (a, b) { return Date.parse(b.createdAt) - Date.parse(a.createdAt); });
            if (!((_a = data.data) === null || _a === void 0 ? void 0 : _a.length)) {
                _this.noData = true;
            }
        });
    };
    ProductListComponent.prototype["delete"] = function (id) {
        var _this = this;
        var dialog = this.dialog.open(confirm_dialog_component_1.ConfirmDialogComponent, {
            width: '250px',
            data: {
                from: "delete"
            }
        });
        dialog.afterClosed().subscribe(function (data) {
            if (data) {
                _this.api.apiDeleteCall(id, 'product/deleteProduct').subscribe(function (response) {
                    if (response.message.includes('Successfully')) {
                        _this.snackbar.openFromComponent(snackbar_component_1.SnackbarComponent, {
                            data: response.message
                        });
                        _this.getProductList();
                    }
                });
            }
        });
    };
    ProductListComponent.prototype.applyFilter = function (filterValue) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    };
    ProductListComponent.prototype.applyTypeFilter = function () {
        var _this = this;
        var _a, _b;
        if (((_a = this.selectedColourValue) === null || _a === void 0 ? void 0 : _a.length) || ((_b = this.selectedValue) === null || _b === void 0 ? void 0 : _b.length)) {
            this.filteredData = this.dataSource.data.filter(function (item) {
                var _a, _b, _c, _d;
                // Check if the item's category is included in the selectedValue array
                if (((_a = _this.selectedValue) === null || _a === void 0 ? void 0 : _a.length) && !((_b = _this.selectedValue) === null || _b === void 0 ? void 0 : _b.includes(item.category[0]))) {
                    return false;
                }
                // Check if the item's colour is included in the selectedColourValue array
                if (((_c = _this.selectedColourValue) === null || _c === void 0 ? void 0 : _c.length) && !((_d = _this.selectedColourValue) === null || _d === void 0 ? void 0 : _d.includes(item.colour[0]))) {
                    return false;
                }
                // If the item passed both filters, return true
                return true;
            });
        }
        else {
            this.filteredData = [];
            this.dataSource.data = this.inventoryList;
        }
    };
    ProductListComponent = __decorate([
        core_1.Component({
            selector: 'app-product-list',
            templateUrl: './product-list.component.html',
            styleUrls: ['./product-list.component.scss']
        })
    ], ProductListComponent);
    return ProductListComponent;
}());
exports.ProductListComponent = ProductListComponent;
