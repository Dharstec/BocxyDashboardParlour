"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AnalyticsComponent = void 0;
var core_1 = require("@angular/core");
var table_1 = require("@angular/material/table");
var rxjs_1 = require("rxjs");
var AnalyticsComponent = /** @class */ (function () {
    function AnalyticsComponent(cdr, api) {
        this.cdr = cdr;
        this.api = api;
        this.REQUESTS = [
            { type: 'Sam', name: 'sam50', amount: 1000, status: 'Draft', dateModified: 1111112211111 },
            { type: 'Jagan', name: 'Jagan100', amount: 5, status: 'Submitted', dateModified: 1111991111111 },
            { type: 'New Year', name: 'New20', amount: 200, status: 'Submitted', dateModified: 1111111441111 },
            { type: 'Diwali', name: 'Diwali50', amount: 200, status: 'Submitted', dateModified: 1111111441111 },
            { type: 'Pongal', name: 'Pongal20', amount: 200, status: 'Submitted', dateModified: 1111111441111 },
        ];
        this.dataSource = new table_1.MatTableDataSource(this.REQUESTS);
        this.columnsToDisplay = ['name', 'amount', 'status', 'state'];
        this.dataSubject = new rxjs_1.BehaviorSubject([]);
        this.ProgressValue = [
            { ageCat: 'Age 20 - 25', value: 50, color: 'accent' },
            { ageCat: 'Age 25 - 30', value: 60, color: 'primary' },
            { ageCat: 'Age 30 - 35', value: 70, color: 'warn' },
        ];
        this.piechartData = [
            {
                color: "#b23392",
                data: null,
                name: "Men",
                y: 90
            },
            {
                color: "#cc9fc1",
                data: null,
                name: "Women",
                y: 213
            }, {
                color: "#8c6f89",
                data: null,
                name: "Both",
                y: 303
            }
        ];
        this.ColumnchartData = [
            ['Make Up', 500, 400],
            ['Skin', 600, 460],
            ['Hair', 700, 120],
            ['Fragrance', 130, 50]
        ];
        this.ColumnchartData1 = [
            ['MAC', 500, 400],
            ['Lakme', 600, 460],
            ['Wella', 700, 120],
            ['Olaplex', 130, 50]
        ];
        this.tabId = '#tab1';
        this.tabIdcat = '#tab1';
    }
    AnalyticsComponent.prototype.ngOnInit = function () {
        var _this = this;
        var type = ['pie', 'bar'];
        var _loop_1 = function (i) {
            setTimeout(function () {
                _this.getChartData(type[i]);
            }, 2000);
        };
        for (var i = 0; i < type.length; i++) {
            _loop_1(i);
        }
        this.drawbar();
        this.drawbar1();
        this.getAnalyticsḌata();
    };
    AnalyticsComponent.prototype.getAnalyticsḌata = function () {
        var _this = this;
        this.api.apiGetCall('product/getDashboard').subscribe(function (data) {
            _this.totalCount = data.data;
        });
    };
    AnalyticsComponent.prototype.onTabClickcat = function (tabId) {
        this.tabIdcat = tabId;
        var activeElements = document.querySelectorAll('.activeCat');
        activeElements.forEach(function (element) {
            element.classList.remove('activeCat');
        });
        var clickedTab = document.querySelector("a[href=\"" + tabId + "\"]");
        if (clickedTab) {
            clickedTab.classList.add('activeCat');
        }
        var tabContent = document.querySelector(tabId);
        if (tabContent) {
            tabContent.classList.add('activeCat');
        }
    };
    AnalyticsComponent.prototype.getChartData = function (type) {
        var _a;
        if (type === 'pie') {
            this.barChartRef.chartColumnsArray = [];
            this.barChartRef.chartDataArray = [];
            var chartData_1 = [];
            var chartDataColumns = [];
            (_a = this.piechartData) === null || _a === void 0 ? void 0 : _a.forEach(function (element) {
                if (element.name) {
                    chartData_1.push([element.name, element.y, element.color]);
                }
            });
            chartDataColumns = ['name', '', { role: 'style' }];
            this.barChartRef.chartOptionsg.height = '270';
            this.barChartRef.chartOptionsg.colors = ['#b23392', '#cc9fc1', '#f7dcf5'];
            // this.barChartRef.chartOptionsg.width = '';
            // this.barChartRef.chartOptionsg.legend.position = 'right';
            if ((chartData_1 === null || chartData_1 === void 0 ? void 0 : chartData_1.length) > 0) {
                this.barChartRef.chartDataArray.push(chartData_1);
                this.barChartRef.chartColumnsArray.push(chartDataColumns);
                this.barChartRef.refreshForLastLength();
            }
            else {
                this.barChartRef.isHide = true;
                // this.noData=true;
            }
        }
        //  else if (type === 'bar') {
        //   console.log(type)
        //   this.barChartRef.chartColumnsArray = [];
        //   this.barChartRef.chartDataArray = [];
        //   if (this.ColumnchartData.length) {
        //     const chartDataColumn = ['Galaxy', 'Distance', 'Brightness'];
        //     this.barChartRef.chartOptionsg.legend.position = 'right';
        //     this.barChartRef.chartColumnsArray.push(chartDataColumn);
        //     this.barChartRef.chartDataArray.push(this.ColumnchartData);
        //     this.barChartRef.refreshForLastLength();
        //   }
        //   else {
        //     this.barChartRef.isHide = true;
        //   }
        // }
    };
    AnalyticsComponent.prototype.drawbar = function () {
        var dataChart = [];
        dataChart.push(this.ColumnchartData);
        var chartDatas = dataChart[dataChart.length - 1];
        var dataChart1 = [];
        dataChart1.push(this.ColumnchartData1);
        var chartDatas1 = dataChart1[dataChart.length - 1];
        var chartDataColumn = ['Year', 'Viewed', 'Sold'];
        var dataColumn = [];
        dataColumn.push(chartDataColumn);
        var chartColumns = dataColumn[dataColumn.length - 1];
        var chartOptionsg = {
            height: '',
            width: '',
            bar: { groupWidth: '35%', gap: "40%" },
            series: {
                0: { color: '#b23392' },
                1: { color: '#f0d4e6' }
            },
            legend: {
                position: 'none'
            },
            hAxis: {
                textStyle: { color: '#bfc7d0' }
            },
            vAxis: {
                textStyle: { color: '#bfc7d0' }
            }
        };
        google.charts.load('current', { 'packages': ['bar'] });
        google.charts.setOnLoadCallback(function () {
            var chartData = JSON.parse(JSON.stringify(chartDatas1));
            chartData.unshift(chartColumns);
            console.log(chartData);
            var wrapper = new google.visualization.ChartWrapper({
                container: document.querySelector('#initial_chart_div1_'),
                chartType: 'ColumnChart',
                dataTable: chartData,
                options: chartOptionsg
            });
            console.log(wrapper);
            wrapper.draw();
            google.visualization.events.addListener(wrapper.getChart(), 'select', function () {
                var _a;
                var selection = (_a = wrapper.getChart()) === null || _a === void 0 ? void 0 : _a.getSelection();
                //  this.onSelect(selection);
            });
        });
    };
    AnalyticsComponent.prototype.drawbar1 = function () {
        var dataChart = [];
        dataChart.push(this.ColumnchartData);
        var chartDatas = dataChart[dataChart.length - 1];
        var chartDataColumn = ['Year', 'Viewed', 'Sold'];
        var dataColumn = [];
        dataColumn.push(chartDataColumn);
        var chartColumns = dataColumn[dataColumn.length - 1];
        var chartOption = {
            height: '',
            width: '',
            bar: { groupWidth: '30%', gap: "40%" },
            legend: {
                position: 'none'
            },
            series: {
                0: { color: '#b23392' },
                1: { color: '#f0d4e6' }
            },
            hAxis: {
                textStyle: { color: '#bfc7d0' }
            },
            vAxis: {
                textStyle: { color: '#bfc7d0' }
            }
        };
        google.charts.load('current', { 'packages': ['bar'] });
        google.charts.setOnLoadCallback(function () {
            var chartData = JSON.parse(JSON.stringify(chartDatas));
            chartData.unshift(chartColumns);
            console.log(chartData);
            var wrapper = new google.visualization.ChartWrapper({
                container: document.querySelector('#initial_chart_div2_'),
                chartType: 'ColumnChart',
                dataTable: chartData,
                options: chartOption
            });
            console.log(wrapper);
            wrapper.draw();
            google.visualization.events.addListener(wrapper.getChart(), 'select', function () {
                var _a;
                var selection = (_a = wrapper.getChart()) === null || _a === void 0 ? void 0 : _a.getSelection();
                //  this.onSelect(selection);
            });
        });
    };
    AnalyticsComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.getStyle();
        }, 3000);
    };
    AnalyticsComponent.prototype.getStyle = function () {
        this.barChartRef.chartOptionsg.width = '250px';
        this.barChartRef.chartOptionsg.color = ['#b23392', '#cc9fc1', '#2F847C'];
        this.barChartRef.drawChart();
    };
    AnalyticsComponent.prototype.onTabClick = function (tabId) {
        this.tabId = tabId;
        var activeElements = document.querySelectorAll('.activeSal');
        activeElements.forEach(function (element) {
            element.classList.remove('activeSal');
        });
        var clickedTab = document.querySelector("a[href=\"" + tabId + "\"]");
        if (clickedTab) {
            clickedTab.classList.add('activeSal');
        }
        var tabContent = document.querySelector(tabId);
        if (tabContent) {
            tabContent.classList.add('activeSal');
        }
    };
    AnalyticsComponent.prototype.getAmount = function (amount) {
        return (amount === 0 ? 'FREE' : amount + " €");
    };
    __decorate([
        core_1.ViewChild('barChart')
    ], AnalyticsComponent.prototype, "barChartRef");
    AnalyticsComponent = __decorate([
        core_1.Component({
            selector: 'app-analytics',
            templateUrl: './analytics.component.html',
            styleUrls: ['./analytics.component.scss']
        })
    ], AnalyticsComponent);
    return AnalyticsComponent;
}());
exports.AnalyticsComponent = AnalyticsComponent;
