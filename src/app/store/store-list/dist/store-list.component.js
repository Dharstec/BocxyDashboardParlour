"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.StoreListComponent = void 0;
var core_1 = require("@angular/core");
var table_1 = require("@angular/material/table");
var confirm_dialog_component_1 = require("src/app/shared-module/confirm-dialog/confirm-dialog.component");
var excel_map_component_1 = require("src/app/shared-module/excel-map/excel-map.component");
var snackbar_component_1 = require("src/app/shared-module/snackbar/snackbar.component");
var StoreListComponent = /** @class */ (function () {
    function StoreListComponent(api, dialog, snackbar, router) {
        this.api = api;
        this.dialog = dialog;
        this.snackbar = snackbar;
        this.router = router;
        this.dataSource = new table_1.MatTableDataSource([]);
        this.columnsToDisplay = ['name', 'mobile', 'ordinates', 'action'];
        this.types = [
            "Affiliate",
            "In Store",
        ];
        this.status = [
            { 'status': "Active", 'value': true },
            { 'status': "Inactive", 'value': false }
        ];
        this.noData = false;
    }
    StoreListComponent.prototype.ngOnInit = function () {
        this.getStoreList();
    };
    StoreListComponent.prototype.getStoreList = function () {
        var _this = this;
        this.api.apiGetCall('admin/getAllStores/' + localStorage.getItem('superAdminId')).subscribe(function (data) {
            var _a;
            _this.storeListData = data.data;
            _this.dataSource.data = data.data.sort(function (a, b) { return Date.parse(b.createdAt) - Date.parse(a.createdAt); });
            if (!((_a = data.data) === null || _a === void 0 ? void 0 : _a.length)) {
                _this.noData = true;
            }
        });
    };
    StoreListComponent.prototype.openExportDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(excel_map_component_1.ExcelMapComponent, {
            width: '500px',
            data: { headers: Object.keys(this.dataSource.data[0]), dataSource: this.dataSource.data }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.generateExcel(result);
            }
        });
    };
    StoreListComponent.prototype.generateExcel = function (headers) {
        var data = this.dataSource.data.map(function (row) {
            var newRow = {};
            headers.forEach(function (header, i) {
                newRow[header] = row[Object.keys(row)[i]];
            });
            return newRow;
        });
        // const worksheet = XLSX.utils.json_to_sheet(data);
        // const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        // const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        // const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        // const url = URL.createObjectURL(blob);
        // const a = document.createElement('a');
        // a.href = url;
        // a.download = 'data.xlsx';
        // a.click();
    };
    StoreListComponent.prototype.applyFilter = function (filterValue) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    };
    StoreListComponent.prototype["delete"] = function (id) {
        var _this = this;
        var dialog = this.dialog.open(confirm_dialog_component_1.ConfirmDialogComponent, {
            width: '250px',
            data: {
                from: "delete"
            }
        });
        dialog.afterClosed().subscribe(function (data) {
            if (data) {
                _this.api.apiDeleteCall(id, 'admin/deleteStoreAdmin').subscribe(function (response) {
                    if (response.message.includes('Successfully')) {
                        _this.snackbar.openFromComponent(snackbar_component_1.SnackbarComponent, {
                            data: response.message
                        });
                        _this.getStoreList();
                    }
                });
            }
        });
    };
    StoreListComponent.prototype.edit = function (type, id) {
        this.router.navigate(['/store/' + type, id]);
    };
    StoreListComponent.prototype.applyTypeFilter = function () {
        var _this = this;
        var _a, _b;
        if (((_a = this.selectedStatus) === null || _a === void 0 ? void 0 : _a.length) || ((_b = this.selectedValue) === null || _b === void 0 ? void 0 : _b.length)) {
            this.filteredData = this.dataSource.data.filter(function (item) {
                var _a, _b, _c, _d;
                // Check if the item's category is included in the selectedValue array
                if (((_a = _this.selectedValue) === null || _a === void 0 ? void 0 : _a.length) && !((_b = _this.selectedValue) === null || _b === void 0 ? void 0 : _b.includes(item.type[0]))) {
                    return false;
                }
                // Check if the item's colour is included in the selectedColourValue array
                if (((_c = _this.selectedStatus) === null || _c === void 0 ? void 0 : _c.length) && !((_d = _this.selectedStatus) === null || _d === void 0 ? void 0 : _d.includes(item.couponStatus[0]))) {
                    return false;
                }
                // If the item passed both filters, return true
                return true;
            });
        }
        else {
            this.filteredData = [];
            this.dataSource.data = this.storeListData;
        }
    };
    StoreListComponent = __decorate([
        core_1.Component({
            selector: 'app-store-list',
            templateUrl: './store-list.component.html',
            styleUrls: ['./store-list.component.scss']
        })
    ], StoreListComponent);
    return StoreListComponent;
}());
exports.StoreListComponent = StoreListComponent;
