"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MarketingListComponent = void 0;
var core_1 = require("@angular/core");
var table_1 = require("@angular/material/table");
var confirm_dialog_component_1 = require("src/app/shared-module/confirm-dialog/confirm-dialog.component");
var snackbar_component_1 = require("src/app/shared-module/snackbar/snackbar.component");
var MarketingListComponent = /** @class */ (function () {
    function MarketingListComponent(api, dialog, router, snackbar) {
        this.api = api;
        this.dialog = dialog;
        this.router = router;
        this.snackbar = snackbar;
        this.dataSource = new table_1.MatTableDataSource([]);
        this.columnsToDisplay = ['name', 'customer', 'sentVia', 'ending', 'action'];
        this.sentVia = [
            { label: 'Email', value: 'email' },
            { label: 'SMS', value: 'sms' },
            { label: 'Whatsapp', value: 'whatsApp' },
        ];
        this.noData = false;
    }
    MarketingListComponent.prototype.ngOnInit = function () {
        this.getMarketList();
    };
    MarketingListComponent.prototype.applyFilter = function (filterValue) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    };
    MarketingListComponent.prototype.applyTypeFilter = function () {
        var _this = this;
        if (this.selectedValue && this.selectedValue.length) {
            this.dataSource.data = this.marketingData.filter(function (item) {
                return _this.selectedValue.some(function (option) {
                    return item.sendVia.indexOf(option) !== -1;
                });
            });
        }
        else {
            this.dataSource.data = this.marketingData;
        }
    };
    MarketingListComponent.prototype.viewMarket = function (id) {
        this.router.navigate(['/marketing/view', id]);
    };
    MarketingListComponent.prototype.getMarketList = function () {
        var _this = this;
        this.api.apiGetCall('marketing/getAllMarketing').subscribe(function (data) {
            var _a;
            _this.marketingData = data.data;
            _this.dataSource.data = data.data.sort(function (a, b) { return Date.parse(b.createdAt) - Date.parse(a.createdAt); });
            if (!((_a = data.data) === null || _a === void 0 ? void 0 : _a.length)) {
                _this.noData = true;
            }
        });
    };
    MarketingListComponent.prototype["delete"] = function (id) {
        var _this = this;
        var dialog = this.dialog.open(confirm_dialog_component_1.ConfirmDialogComponent, {
            width: '250px',
            data: {
                from: "delete"
            }
        });
        dialog.afterClosed().subscribe(function (data) {
            if (data) {
                _this.api.apiDeleteCall(id, 'marketing/deleteMarketing').subscribe(function (response) {
                    if (response.message === 'Delete Marketing Successfully') {
                        _this.snackbar.openFromComponent(snackbar_component_1.SnackbarComponent, {
                            data: response.message
                        });
                        _this.getMarketList();
                    }
                });
            }
        });
    };
    MarketingListComponent = __decorate([
        core_1.Component({
            selector: 'app-marketing-list',
            templateUrl: './marketing-list.component.html',
            styleUrls: ['./marketing-list.component.scss']
        })
    ], MarketingListComponent);
    return MarketingListComponent;
}());
exports.MarketingListComponent = MarketingListComponent;
