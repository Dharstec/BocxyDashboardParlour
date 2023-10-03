"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OrderListComponent = void 0;
var core_1 = require("@angular/core");
var table_1 = require("@angular/material/table");
var confirm_dialog_component_1 = require("src/app/shared-module/confirm-dialog/confirm-dialog.component");
var snackbar_component_1 = require("src/app/shared-module/snackbar/snackbar.component");
var OrderListComponent = /** @class */ (function () {
    function OrderListComponent(api, dialog, router, snackbar) {
        this.api = api;
        this.dialog = dialog;
        this.router = router;
        this.snackbar = snackbar;
        this.dataSource = new table_1.MatTableDataSource([]);
        this.columnsToDisplay = ['order_id', 'gift', 'customer_details', 'order_details', 'created_At', 'order_status'];
        this.orderStatus = [
            { label: 'Dispatch', value: 'pending' },
            { label: 'On the way', value: 'dispatch' },
            { label: 'Delivered', value: 'delivered' },
        ];
        this.noData = false;
        this.orderStatusPending = 0;
        this.orderStatusDispatch = 0;
        this.orderStatusdelivery = 0;
    }
    OrderListComponent.prototype.ngOnInit = function () {
        this.getOrderList();
    };
    OrderListComponent.prototype.applyFilter = function (filterValue) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    };
    OrderListComponent.prototype.applyTypeFilter = function () {
        var _this = this;
        console.log(this.selectedValue);
        if (this.selectedValue && this.selectedValue.length) {
            this.dataSource.data = this.orderList.filter(function (item) {
                return _this.selectedValue.some(function (option) {
                    return item.orderStatus.indexOf(option) !== -1;
                });
            });
        }
        else {
            this.dataSource.data = this.orderList;
        }
    };
    OrderListComponent.prototype.viewMarket = function (id) {
        this.router.navigate(['/marketing/view', id]);
    };
    OrderListComponent.prototype.getOrderList = function () {
        var _this = this;
        this.api.apiGetCall('order/getAllOrder' + '/' + localStorage.getItem('storeId')).subscribe(function (data) {
            var _a;
            _this.orderList = data.data;
            // this.orderList=result.data.orders
            // console.log("orderList",this.orderList);
            _this.dataSource.data = data.data.sort(function (a, b) { return Date.parse(b.createdAt) - Date.parse(a.createdAt); });
            _this.allOrderList = _this.orderList;
            _this.getCountStatus();
            if (!((_a = data.data) === null || _a === void 0 ? void 0 : _a.length)) {
                _this.noData = true;
            }
        });
    };
    OrderListComponent.prototype.getCountStatus = function () {
        var temp1 = [];
        var temp2 = [];
        var temp3 = [];
        this.allOrderList.forEach(function (element) {
            if (element.orderStatus == 'pending') {
                temp1.push(element);
            }
            else if (element.orderStatus == 'dispatch') {
                temp2.push(element);
            }
            else {
                temp3.push(element);
            }
        });
        this.orderStatusPending = temp1.length;
        this.orderStatusDispatch = temp2.length;
        this.orderStatusdelivery = temp3.length;
    };
    OrderListComponent.prototype.updateOrderStatus = function (req) {
        var _this = this;
        var dialog = this.dialog.open(confirm_dialog_component_1.ConfirmDialogComponent, {
            width: req.orderStatus === 'pending' ? '350px' : '300px',
            data: {
                from: 'orderStatus',
                data: req
            }
        });
        dialog.afterClosed().subscribe(function (data) {
            if (data) {
                var params = {
                    "_id": req._id,
                    "orderStatus": req.orderStatus === 'pending' ? 'dispatch' : 'delivered'
                };
                _this.api.apiPutCall(params, 'order/updateOrder').subscribe(function (data) {
                    if (data.message.includes('Update Order Successfully')) {
                        _this.snackbar.openFromComponent(snackbar_component_1.SnackbarComponent, {
                            data: data.message
                        });
                        _this.getOrderList();
                    }
                }, function (error) {
                });
            }
        });
    };
    OrderListComponent = __decorate([
        core_1.Component({
            selector: 'app-order-list',
            templateUrl: './order-list.component.html',
            styleUrls: ['./order-list.component.scss']
        })
    ], OrderListComponent);
    return OrderListComponent;
}());
exports.OrderListComponent = OrderListComponent;
