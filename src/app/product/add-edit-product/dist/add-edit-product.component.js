"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AddEditProductComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var add_product_model_1 = require("src/app/inventory/add-product/add-product.model");
var snackbar_component_1 = require("src/app/shared-module/snackbar/snackbar.component");
var AddEditProductComponent = /** @class */ (function () {
    function AddEditProductComponent(router, formBuilder, api, snackbar, activeRoute) {
        var _this = this;
        this.router = router;
        this.formBuilder = formBuilder;
        this.api = api;
        this.snackbar = snackbar;
        this.activeRoute = activeRoute;
        this.productview = false;
        this.videoSelect = false;
        this.images = [];
        this.apiMainImages = [];
        this.submitted = false;
        this.noImage = "assets/no_found.jpeg";
        this.types = [
            "Male",
            "Female",
            "Neutral"
        ];
        this.category = [
            "Haircare products",
            "Skincare products",
            "Nailcare products",
            "Cosmetics",
            "Makeup",
            "Fragrance",
            "Serums",
            "Sunscreens"
        ];
        this.brand = [
            'LOréal',
            'Maybelline',
            'MAC',
            'Lakme',
            'Wella',
            'Toni & Guy',
            'TRESemmé',
            'Renee',
            'System Professional'
        ];
        this.color = [
            "Liquid",
            "Stick",
            "Cream",
            "Balm",
            "Gel",
            "Sheet",
            "Powder"
        ];
        this.avgCustomerRating = [
            "4 stars & above",
            "3 stars & above",
            "2 stars & above",
            "1 star & above"
        ];
        this.collections = [
            "Diwali", "New Year", "Mother's Day", "Christmas", "Raksha Bandhan", "Eid", "Holi", "Durga pooja", ""
        ];
        this.edit = false;
        this.view = false;
        this.uploadEnabled = true;
        this.isSave = false;
        this.activeRoute.paramMap.subscribe(function (params) {
            _this.productId = params.get('id');
            console.log(_this.productId);
            if (_this.productId && _this.router.url.includes('edit')) {
                _this.edit = true;
                _this.getProductDetails();
            }
            else if (_this.router.url.includes('view')) {
                _this.view = true;
                _this.getProductDetails();
            }
        });
    }
    AddEditProductComponent.prototype.ngOnInit = function () {
        this.initializeForm();
        if (!this.productId) {
            this.mainImageSrc = this.noImage;
            this.generateRandomString();
        }
    };
    AddEditProductComponent.prototype.generateRandomString = function () {
        var characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        this.result = "";
        for (var i = 0; i < 12; i++) {
            var randomIndex = Math.floor(Math.random() * characters.length);
            this.result += characters.charAt(randomIndex);
        }
        return this.result;
    };
    AddEditProductComponent.prototype.getProductDetails = function () {
        var _this = this;
        this.api.apiGetDetailsCall(this.productId, 'product/getOneProduct').subscribe(function (data) {
            var _a, _b, _c;
            _this.productDetails = data.data;
            _this.form.patchValue(data.data);
            _this.form.controls['for'].setValue(data.data.gender);
            _this.mainImageSrc = (_a = _this.productDetails) === null || _a === void 0 ? void 0 : _a.productImages[0];
            _this.images = (_b = _this.productDetails) === null || _b === void 0 ? void 0 : _b.productImages;
            _this.video = (_c = _this.productDetails) === null || _c === void 0 ? void 0 : _c.productVideos[0];
            if (_this.router.url.includes('view')) {
                _this.form.disable();
            }
        });
    };
    AddEditProductComponent.prototype.onFileChange = function (event) {
        var files = event.target.files;
        this.allFiles = event.target.files;
        if (files.length > 0) {
            var file = files[0];
            if (file) {
                this.handleImageVideoUpload(file);
            }
        }
    };
    // if (selectedFile.size <= 2000000) { // 2MB limit
    AddEditProductComponent.prototype.handleImageVideoUpload = function (file) {
        var _this = this;
        var reader = new FileReader();
        if (this.allFiles && this.allFiles[0]) {
            var numberOfFiles = this.allFiles.length;
            for (var i = 0; i < numberOfFiles; i++) {
                var reader_1 = new FileReader();
                reader_1.onload = function (e) {
                    if (e.target.result.includes('image/')) {
                        _this.images.push(e.target.result);
                        _this.mainImageSrc = _this.images[0];
                    }
                    else {
                        _this.video = e.target.result;
                    }
                };
                reader_1.readAsDataURL(this.allFiles[i]);
            }
        }
    };
    AddEditProductComponent.prototype.selectImage = function (image) {
        this.mainImageSrc = image;
        this.videoSelect = false;
    };
    AddEditProductComponent.prototype.selectVideo = function (video) {
        this.videoSelect = true;
    };
    AddEditProductComponent.prototype.removeImage = function (index) {
        this.images.splice(index, 1);
        if (!this.images.length) {
            this.mainImageSrc = this.noImage;
        }
    };
    AddEditProductComponent.prototype.removeVideo = function () {
        this.video = "";
    };
    AddEditProductComponent.prototype.clearFileInput = function () {
        this.fileInput.nativeElement.value = '';
    };
    AddEditProductComponent.prototype.initializeForm = function () {
        this.form = this.formBuilder.group({
            productName: ['', forms_1.Validators.required],
            discountPrice: ['', forms_1.Validators.required],
            actualPrice: ['', forms_1.Validators.required],
            description: ['', forms_1.Validators.required],
            // stock: ['', Validators.required],
            category: ['', forms_1.Validators.required],
            brand: ['', forms_1.Validators.required],
            formulation: ['', forms_1.Validators.required],
            avgCustomerRating: ['', forms_1.Validators.required],
            "for": ['', forms_1.Validators.required],
            gift: [true],
            personalised: [true],
            latest: [true],
            collections: ['', forms_1.Validators.required],
            viewedBy: [''],
            noOfViews: [''],
            noOfSales: [''],
            productAge: [''],
            referenceId: ['', forms_1.Validators.required]
        });
    };
    AddEditProductComponent.prototype.discard = function () {
        if (this.productId) {
            this.form.patchValue(this.productDetails);
        }
        else {
            this.form.reset();
        }
        this.router.navigate(['/product/list']);
    };
    AddEditProductComponent.prototype.save = function () {
        var _this = this;
        this.form.setValidators(null);
        this.form.updateValueAndValidity();
        // && this.allFiles?.length !== 5
        if (this.form.invalid) {
            console.log(this.form);
            this.submitted = true;
            // if(!this.allFiles.includes('video')){
            // }
            // this.snackbar.openFromComponent(SnackbarComponent, {
            //   data: data.message,
            // });
            return;
        }
        else {
            this.submitted = false;
            this.isSave = true;
            var formData = new FormData();
            if (this.allFiles && this.allFiles.length) {
                for (var _i = 0, _a = this.allFiles; _i < _a.length; _i++) {
                    var img = _a[_i];
                    formData.append('files', img);
                }
            }
            this.api.apiPostCall(formData, 'Product/createProductImages').subscribe(function (data) {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
                if (data.message.includes('Image Added Successfully')) {
                    var addProd = new add_product_model_1.AddProduct();
                    addProd._id = _this.productId ? _this.productId : null;
                    addProd.superAdminId = localStorage.getItem('superAdminId');
                    addProd.productName = (_a = _this.form.get('productName')) === null || _a === void 0 ? void 0 : _a.value;
                    addProd.discountPrice = (_b = _this.form.get('discountPrice')) === null || _b === void 0 ? void 0 : _b.value;
                    addProd.actualPrice = (_c = _this.form.get('actualPrice')) === null || _c === void 0 ? void 0 : _c.value;
                    addProd.description = (_d = _this.form.get('description')) === null || _d === void 0 ? void 0 : _d.value;
                    addProd.category = (_e = _this.form.get('category')) === null || _e === void 0 ? void 0 : _e.value;
                    addProd.gender = (_f = _this.form.get('for')) === null || _f === void 0 ? void 0 : _f.value;
                    addProd.brand = (_g = _this.form.get('brand')) === null || _g === void 0 ? void 0 : _g.value;
                    addProd.formulation = (_h = _this.form.get('formulation')) === null || _h === void 0 ? void 0 : _h.value;
                    addProd.avgCustomerRating = (_j = _this.form.get('avgCustomerRating')) === null || _j === void 0 ? void 0 : _j.value;
                    addProd.gift = (_k = _this.form.get('gift')) === null || _k === void 0 ? void 0 : _k.value;
                    addProd.personalised = (_l = _this.form.get('personalised')) === null || _l === void 0 ? void 0 : _l.value;
                    addProd.latest = (_m = _this.form.get('latest')) === null || _m === void 0 ? void 0 : _m.value;
                    addProd.collections = (_o = _this.form.get('collections')) === null || _o === void 0 ? void 0 : _o.value;
                    addProd.viewedBy = (_p = _this.form.get('viewedBy')) === null || _p === void 0 ? void 0 : _p.value;
                    addProd.noOfViews = (_q = _this.form.get('noOfViews')) === null || _q === void 0 ? void 0 : _q.value;
                    addProd.noOfSales = (_r = _this.form.get('noOfSales')) === null || _r === void 0 ? void 0 : _r.value;
                    addProd.productAge = (_s = _this.form.get('productAge')) === null || _s === void 0 ? void 0 : _s.value;
                    addProd.referenceId = (_t = _this.form.get('referenceId')) === null || _t === void 0 ? void 0 : _t.value;
                    addProd.barcode = _this.productId ? _this.productDetails.barcode : _this.result;
                    if (data.data.imageArray.length > 0) {
                        addProd.imageArray = data.data.imageArray ? data.data.imageArray : [];
                    }
                    else {
                        addProd.imageArray = _this.images;
                    }
                    if (data.data.videoArray > 0) {
                        addProd.videoArray = data.data.videoArray ? data.data.videoArray : [];
                    }
                    else {
                        addProd.videoArray = _this.video !== undefined ? _this.video : [];
                    }
                    if (_this.productId) {
                        _this.api.apiPutCall(addProd, 'Product/updateProduct').subscribe(function (data) {
                            if (data.message.includes('Successfully')) {
                                _this.isSave = false;
                                _this.snackbar.openFromComponent(snackbar_component_1.SnackbarComponent, {
                                    data: data.message
                                });
                                _this.router.navigate(['/product/list']);
                            }
                        }, function (error) {
                            if (error) {
                                _this.isSave = false;
                                // this.form.reset();
                            }
                        });
                    }
                    else {
                        _this.api.apiFormDataPostCall(addProd, 'product/createProduct').subscribe(function (data) {
                            if (data.message.includes('Successfully')) {
                                _this.snackbar.openFromComponent(snackbar_component_1.SnackbarComponent, {
                                    data: data.message
                                });
                                _this.router.navigate(['/product/list']);
                            }
                        }, function (error) {
                            if (error) {
                                // this.form.reset();
                            }
                        });
                    }
                }
            });
        }
    };
    __decorate([
        core_1.ViewChild('fileInput')
    ], AddEditProductComponent.prototype, "fileInput");
    AddEditProductComponent = __decorate([
        core_1.Component({
            selector: 'app-add-edit-product',
            templateUrl: './add-edit-product.component.html',
            styleUrls: ['./add-edit-product.component.scss']
        })
    ], AddEditProductComponent);
    return AddEditProductComponent;
}());
exports.AddEditProductComponent = AddEditProductComponent;
