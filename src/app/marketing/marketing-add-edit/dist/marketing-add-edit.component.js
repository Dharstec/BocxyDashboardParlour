"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MarketingAddEditComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var snackbar_component_1 = require("src/app/shared-module/snackbar/snackbar.component");
var environment_1 = require("src/environments/environment");
var markets_modal_1 = require("../markets.modal");
var API_URL = environment_1.environment.apiUrl;
var MarketingAddEditComponent = /** @class */ (function () {
    function MarketingAddEditComponent(api, fb, router, snackbar, activeRoute) {
        var _this = this;
        this.api = api;
        this.fb = fb;
        this.router = router;
        this.snackbar = snackbar;
        this.activeRoute = activeRoute;
        this.sendVia = [
            { label: 'Email', value: 'email' },
            { label: 'SMS', value: 'sms' },
            { label: 'Whatsapp', value: 'whatsApp' },
        ];
        this.targetCustomer = [
            { label: 'All Customers', value: 'allcustomer' },
            { label: 'Male Only', value: 'maleOnly' },
            { label: 'Female Only', value: 'femaleOnly' }
        ];
        this.selectedFile = null;
        this.selectedFileName = '';
        this.submitted = false;
        this.edit = false;
        this.activeRoute.paramMap.subscribe(function (params) {
            _this.marketId = params.get('id');
            if (_this.marketId) {
                _this.edit = true;
                var marketsEdit = {
                    _id: _this.marketId
                };
                _this.api.apiPostCall(marketsEdit, 'marketing/getOneMarketing').subscribe(function (data) {
                    _this.form.patchValue(data.data);
                    _this.marketsDetails = data.data;
                    _this.form.get('addMedia').patchValue(data.data.addMedia.split('/').slice(-1)[0]);
                });
            }
        });
    }
    MarketingAddEditComponent.prototype.ngOnInit = function () {
        this.form = this.fb.group({
            campanignTitle: ['', forms_1.Validators.required],
            yourContent: ['', forms_1.Validators.required],
            addMedia: [''],
            targetCustomer: ['', forms_1.Validators.required],
            sendVia: ['', forms_1.Validators.required]
        });
    };
    MarketingAddEditComponent.prototype.onSelectFileClick = function () {
        var fileInput = document.querySelector('.file-input');
        fileInput.click();
    };
    MarketingAddEditComponent.prototype.onChange = function (event) {
        this.selectedFileName = event.target.files[0].name;
        this.file = 'files/' + event.target.files[0].name;
    };
    MarketingAddEditComponent.prototype.discard = function () {
        if (this.marketId) {
            this.form.patchValue(this.marketsDetails);
            this.form.get('addMedia').patchValue(this.marketsDetails.addMedia.split('/').slice(-1)[0]);
        }
        else {
            this.form.reset();
        }
        this.router.navigate(['/marketing/list']);
    };
    MarketingAddEditComponent.prototype.saveCampaign = function () {
        var _this = this;
        if (this.form.invalid) {
            this.submitted = true;
            return;
        }
        else {
            this.submitted = false;
            var marketsAdd = new markets_modal_1.marketsList();
            marketsAdd._id = this.marketId ? this.marketId : null;
            marketsAdd.campanignTitle = this.form.get('campanignTitle').value;
            marketsAdd.yourContent = this.form.get('yourContent').value;
            marketsAdd.addMedia = API_URL + (this.file ? this.file : 'files/' + this.form.get('addMedia').value);
            marketsAdd.targetCustomer = this.form.get('targetCustomer').value;
            marketsAdd.sendVia = this.form.get('sendVia').value;
            if (this.marketId) {
                this.api.apiPutCall(marketsAdd, 'marketing/updateMarketing').subscribe(function (data) {
                    if (data.message.includes('Updated Marketing Successfully')) {
                        _this.snackbar.openFromComponent(snackbar_component_1.SnackbarComponent, {
                            data: data.message
                        });
                        _this.router.navigate(['/marketing/list']);
                    }
                }, function (error) {
                    if (error) {
                        _this.form.reset();
                    }
                });
            }
            else {
                this.api.apiPostCall(marketsAdd, 'marketing/createMarketing').subscribe(function (data) {
                    if (data.message.includes('Created Successfully')) {
                        _this.snackbar.openFromComponent(snackbar_component_1.SnackbarComponent, {
                            data: data.message
                        });
                        _this.router.navigate(['/marketing/list']);
                    }
                }, function (error) {
                    if (error) {
                        _this.form.reset();
                    }
                });
            }
        }
    };
    MarketingAddEditComponent = __decorate([
        core_1.Component({
            selector: 'app-marketing-add-edit',
            templateUrl: './marketing-add-edit.component.html',
            styleUrls: ['./marketing-add-edit.component.scss']
        })
    ], MarketingAddEditComponent);
    return MarketingAddEditComponent;
}());
exports.MarketingAddEditComponent = MarketingAddEditComponent;
