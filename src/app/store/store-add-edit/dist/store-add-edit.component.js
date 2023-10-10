"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.StoreAddEditComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var snackbar_component_1 = require("src/app/shared-module/snackbar/snackbar.component");
var store_model_1 = require("../store.model");
var StoreAddEditComponent = /** @class */ (function () {
    function StoreAddEditComponent(api, fb, router, snackbar, activeRoute) {
        var _this = this;
        this.api = api;
        this.fb = fb;
        this.router = router;
        this.snackbar = snackbar;
        this.activeRoute = activeRoute;
        this.types = [
            "Affiliate",
            "In Store",
        ];
        this.submitted = false;
        this.edit = false;
        this.view = false;
        this.lat = '';
        this.long = '';
        this.activeRoute.paramMap.subscribe(function (params) {
            _this.storeId = params.get('id');
            if (_this.storeId && _this.router.url.includes('edit')) {
                _this.edit = true;
                _this.getStoreDetails();
            }
            else if (_this.router.url.includes('view')) {
                _this.view = true;
                _this.getStoreDetails();
            }
        });
    }
    StoreAddEditComponent.prototype.reverseGeocode = function (lat, long) {
        // const geocoder = new google.maps.Geocoder();
        // const latLng = new google.maps.LatLng(parseFloat(lat), parseFloat(long));
        // geocoder.geocode({ 'location': latLng }, (results, status) => {
        //   if (status === 'OK') {
        //     if (results[0]) {
        //       // Access the place information from the first result
        //       const place = results[0];
        //       this.form.controls['co_ordinates'].setValue(place.formatted_address);
        //       this.lat = lat;
        //       this.long = long;
        //       // Access place details like address components, formatted address, etc.
        //       console.log("Formatted Address:", place.formatted_address);
        //       console.log("Address Components:", place.address_components);
        //       // You can use the place information as needed
        //     } else {
        //       console.log('No results found');
        //     }
        //   } else {
        //     console.error('Geocoder failed due to: ' + status);
        //   }
        // });
    };
    StoreAddEditComponent.prototype.getStoreDetails = function () {
        var _this = this;
        this.api.apiGetDetailsCall(this.storeId, 'admin/getOneStore').subscribe(function (data) {
            _this.storeDetails = data.data;
            _this.form.controls['store_name'].setValue(data.data.store_name);
            _this.form.controls['email'].setValue(data.data.email);
            _this.form.controls['phone_no'].setValue(data.data.phone_no);
            _this.form.controls['address'].setValue(data.data.address);
            _this.form.controls['password'].setValue(data.data.password);
            _this.reverseGeocode(data.data.co_ordinates[0], data.data.co_ordinates[1]);
            if (_this.router.url.includes('view')) {
                _this.form.disable();
            }
            else {
                _this.form.controls['password'].disable();
            }
        });
    };
    StoreAddEditComponent.prototype.ngOnInit = function () {
        this.loadGoogleMapsAPI();
        this.form = this.fb.group({
            store_name: ['', forms_1.Validators.required],
            email: ['', forms_1.Validators.required],
            co_ordinates: ['', forms_1.Validators.required],
            phone_no: ['', forms_1.Validators.required],
            address: ['', forms_1.Validators.required],
            password: ['', forms_1.Validators.required],
            lat: [''],
            long: ['']
        });
    };
    StoreAddEditComponent.prototype.loadGoogleMapsAPI = function () {
        // if (typeof google === 'undefined') {
        //   // The Google Maps API hasn't loaded yet, delay and check again
        //   setTimeout(() => this.loadGoogleMapsAPI(), 200);
        // } else {
        //   // The Google Maps API is loaded, initialize your map and geocoder here
        //   this.initialize();
        // }
    };
    StoreAddEditComponent.prototype.initialize = function () {
        // var input = document.getElementById('autocomplete_search') as HTMLInputElement;
        // var autocomplete = new google.maps.places.Autocomplete(input);
        // autocomplete.addListener('place_changed', () => {
        //   var place = autocomplete.getPlace();
        //   document.getElementById('lat').setAttribute('value', place.geometry.location.lat().toString());
        //   document.getElementById('long').setAttribute('value', place.geometry.location.lng().toString());
        //   this.lat = place.geometry.location.lat().toString();
        //   this.long = place.geometry.location.lng().toString();
        // });
    };
    StoreAddEditComponent.prototype.discard = function () {
        if (this.storeId) {
            this.form.patchValue(this.storeDetails);
        }
        else {
            this.form.reset();
        }
        this.router.navigate(['/store/list']);
    };
    StoreAddEditComponent.prototype.saveCoupons = function () {
        var _this = this;
        if (this.form.invalid) {
            this.submitted = true;
            return;
        }
        else {
            this.submitted = false;
            var store = new store_model_1.Store();
            store.store_name = this.form.get('store_name').value;
            store.address = this.form.get('address').value;
            store.phone_no = this.form.get('phone_no').value;
            var ordinates = this.form.controls['co_ordinates'].value.split(',').map(parseFloat);
            store.co_ordinates = ordinates;
            store.email = this.form.get('email').value;
            store.role_flag = 'STORE_ADMIN';
            store._id = this.storeId ? this.storeId : null;
            store.super_admin_id = localStorage.getItem('superAdminId');
            store.password = this.form.get('password').value;
            if (this.storeId) {
                this.api.apiPutCall(store, 'admin/updateStoreAdmin').subscribe(function (data) {
                    if (data.message.includes('Successfully')) {
                        _this.snackbar.openFromComponent(snackbar_component_1.SnackbarComponent, {
                            data: data.message
                        });
                        _this.router.navigate(['/store/list']);
                    }
                }, function (error) {
                    if (error) {
                        _this.form.reset();
                    }
                });
            }
            else {
                this.api.apiPostCall(store, 'admin/createStoreAdmin').subscribe(function (data) {
                    if (data.message.includes('Created Successfully')) {
                        _this.snackbar.openFromComponent(snackbar_component_1.SnackbarComponent, {
                            data: data.message
                        });
                        _this.router.navigate(['/store/list']);
                    }
                }, function (error) {
                    if (error) {
                        _this.form.reset();
                    }
                });
            }
        }
    };
    StoreAddEditComponent = __decorate([
        core_1.Component({
            selector: 'app-store-add-edit',
            templateUrl: './store-add-edit.component.html',
            styleUrls: ['./store-add-edit.component.scss']
        })
    ], StoreAddEditComponent);
    return StoreAddEditComponent;
}());
exports.StoreAddEditComponent = StoreAddEditComponent;
