"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SidenavComponent = void 0;
var core_1 = require("@angular/core");
var navdata_1 = require("../navdata");
var SidenavComponent = /** @class */ (function () {
    function SidenavComponent() {
        this.onToogleSideNav = new core_1.EventEmitter;
        this.screenWidth = 0;
        this.collapsed = false;
        this.navData = navdata_1.navMenuBar;
    }
    SidenavComponent.prototype.onResize = function (event) {
        this.screenWidth = window.innerWidth;
        if (this.screenWidth <= 768) {
            this.collapsed = false;
            this.onToogleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
        }
    };
    SidenavComponent.prototype.ngOnInit = function () {
        this.screenWidth = window.innerWidth;
        var finalMenu = this.navData.filter(function (a) { return a.role_flag.includes(localStorage.getItem('role')); });
        this.navData = finalMenu;
    };
    SidenavComponent.prototype.toggleCollapse = function () {
        this.collapsed = !this.collapsed;
        this.onToogleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
    };
    SidenavComponent.prototype.closeSidenav = function () {
        this.collapsed = false;
        this.onToogleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
    };
    __decorate([
        core_1.Output()
    ], SidenavComponent.prototype, "onToogleSideNav");
    __decorate([
        core_1.HostListener('window:resize', ['$event'])
    ], SidenavComponent.prototype, "onResize");
    SidenavComponent = __decorate([
        core_1.Component({
            selector: 'app-sidenav',
            templateUrl: './sidenav.component.html',
            styleUrls: ['./sidenav.component.scss']
        })
    ], SidenavComponent);
    return SidenavComponent;
}());
exports.SidenavComponent = SidenavComponent;
