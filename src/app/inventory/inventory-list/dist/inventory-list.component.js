"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.InventoryListComponent = void 0;
var core_1 = require("@angular/core");
var table_1 = require("@angular/material/table");
var confirm_dialog_component_1 = require("src/app/shared-module/confirm-dialog/confirm-dialog.component");
var snackbar_component_1 = require("src/app/shared-module/snackbar/snackbar.component");
var InventoryListComponent = /** @class */ (function () {
    function InventoryListComponent(api, dialog, snackbar, router) {
        this.api = api;
        this.dialog = dialog;
        this.snackbar = snackbar;
        this.router = router;
        this.dataSource = new table_1.MatTableDataSource([]);
        this.columnsToDisplay = ['id', 'category', 'Formulation', 'name', 'in_stock', 'action'];
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
    }
    InventoryListComponent.prototype.ngOnInit = function () {
        this.getInventoryList();
    };
    InventoryListComponent.prototype.edit = function (type, id) {
        this.router.navigate(['/inventory/' + type, id]);
    };
    InventoryListComponent.prototype.getInventoryList = function () {
        var _this = this;
        this.api.apiGetCall('inventory/getInventoryProduct' + '/' + localStorage.getItem('storeId')).subscribe(function (data) {
            var _a;
            _this.inventoryList = data.data;
            _this.dataSource.data = data.data.sort(function (a, b) { return Date.parse(b.createdAt) - Date.parse(a.createdAt); });
            if (!((_a = data.data) === null || _a === void 0 ? void 0 : _a.length)) {
                _this.noData = true;
            }
        });
    };
    InventoryListComponent.prototype["delete"] = function (id) {
        var _this = this;
        var dialog = this.dialog.open(confirm_dialog_component_1.ConfirmDialogComponent, {
            width: '250px',
            data: {
                from: "delete"
            }
        });
        dialog.afterClosed().subscribe(function (data) {
            if (data) {
                _this.api.apiDeleteCall(id, 'inventory/deleteInventoryProduct').subscribe(function (response) {
                    if (response.message.includes('Successfully')) {
                        _this.snackbar.openFromComponent(snackbar_component_1.SnackbarComponent, {
                            data: response.message
                        });
                        _this.getInventoryList();
                    }
                });
            }
        });
    };
    InventoryListComponent.prototype.applyFilter = function (filterValue) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    };
    InventoryListComponent.prototype.applyTypeFilter = function () {
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
    InventoryListComponent = __decorate([
        core_1.Component({
            selector: 'app-inventory-list',
            templateUrl: './inventory-list.component.html',
            styleUrls: ['./inventory-list.component.scss']
        })
    ], InventoryListComponent);
    return InventoryListComponent;
}());
exports.InventoryListComponent = InventoryListComponent;
