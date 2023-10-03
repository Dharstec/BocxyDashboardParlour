"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AddProductComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var snackbar_component_1 = require("src/app/shared-module/snackbar/snackbar.component");
var environment_1 = require("src/environments/environment");
var add_product_model_1 = require("./add-product.model");
var API_URL = environment_1.environment.apiUrl;
var AddProductComponent = /** @class */ (function () {
    function AddProductComponent(router, formBuilder, api, snackbar, activeRoute) {
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
        this.video = "";
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
        this.formulation = [
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
            _this.getProductList();
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
    AddProductComponent.prototype.ngOnInit = function () {
        this.initializeForm();
        if (!this.productId) {
            this.mainImageSrc = this.noImage;
            this.generateRandomString();
        }
    };
    AddProductComponent.prototype.getProductList = function () {
        var _this = this;
        this.api.apiGetCall('product/getProduct' + '/' + localStorage.getItem('superAdminId')).subscribe(function (data) {
            _this.productList = data.data;
        });
    };
    AddProductComponent.prototype.generateRandomString = function () {
        var characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        this.result = "";
        for (var i = 0; i < 12; i++) {
            var randomIndex = Math.floor(Math.random() * characters.length);
            this.result += characters.charAt(randomIndex);
        }
        return this.result;
    };
    AddProductComponent.prototype.getProductDetails = function () {
        var _this = this;
        this.api.apiGetDetailsCall(this.productId, 'inventory/getOneInventoryProduct').subscribe(function (data) {
            var _a, _b, _c;
            _this.productDetails = data.data;
            //  this.selectedFood = this.productDetails;
            _this.form.controls['productName'].setValue(data.data.productName);
            _this.form.controls['productName'].disable();
            _this.form.controls['discountPrice'].setValue(data.data.discountPrice);
            _this.form.controls['actualPrice'].setValue(data.data.actualPrice);
            _this.form.controls['description'].setValue(data.data.description);
            _this.form.controls['quantity'].setValue(data.data.quantity);
            _this.form.controls['category'].setValue(data.data.category);
            _this.form.controls['brand'].setValue(data.data.brand);
            _this.form.controls['formulation'].setValue(data.data.formulation);
            _this.form.controls['avgCustomerRating'].setValue(data.data.avgCustomerRating);
            _this.form.controls['for'].setValue(data.data.gender);
            _this.form.controls['gift'].setValue(data.data.gift);
            _this.form.controls['personalised'].setValue(data.data.personalised);
            _this.form.controls['latest'].setValue(data.data.latest);
            _this.form.controls['collections'].setValue(data.data.collections);
            _this.form.controls['viewedBy'].setValue(data.data.viewedBy);
            _this.form.controls['noOfViews'].setValue(data.data.noOfViews);
            _this.form.controls['noOfSales'].setValue(data.data.noOfSales);
            _this.form.controls['productAge'].setValue(data.data.productAge);
            _this.form.controls['referenceId'].setValue(data.data.referenceId);
            _this.mainImageSrc = (_a = _this.productDetails) === null || _a === void 0 ? void 0 : _a.productImages[0];
            _this.images = (_b = _this.productDetails) === null || _b === void 0 ? void 0 : _b.productImages;
            _this.video = (_c = _this.productDetails) === null || _c === void 0 ? void 0 : _c.productVideos[0];
            // this.mainImageSrc = this.productDetails?.productImages[0];
            //     this.images = this.productDetails?.productImages;
            //     this.video = this.productDetails?.productVideos[0];
            if (_this.router.url.includes('view')) {
                _this.form.disable();
            }
        });
    };
    AddProductComponent.prototype.onFileChange = function (event) {
        var files = event.target.files;
        this.allFiles = event.target.files;
        if (files.length > 0) {
            var file = files[0];
            if (file) {
                this.handleImageVideoUpload(file);
            }
        }
    };
    AddProductComponent.prototype.handleImageVideoUpload = function (file) {
        var _this = this;
        var reader = new FileReader();
        // if (!this.uploadEnabled) {
        //   return;
        // }
        // if (this.images.length >= 4 && !this.video) {
        //   console.log("You can only upload four images and one video.");
        //   this.uploadEnabled = false;
        //   return;
        // }
        // if (this.images.length === 4 && this.video) {
        //   this.uploadEnabled = false;
        // }
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
                        // const videoElement = document.createElement('video');
                        // videoElement.preload = 'metadata';
                        // videoElement.onloadedmetadata = () => {
                        //   window.URL.revokeObjectURL(videoElement.src);
                        //   if (videoElement.duration < 5 || videoElement.duration > 30) {
                        //     this.snackbar.openFromComponent(SnackbarComponent, {
                        //       data:"Video duration should be between 10 and 30 seconds.",
                        //     });
                        //     return;
                        //   }
                        _this.video = e.target.result;
                        //   this.videoSelect=true;
                        // };
                        // videoElement.src = URL.createObjectURL(file);
                    }
                };
                reader_1.readAsDataURL(this.allFiles[i]);
            }
        }
    };
    AddProductComponent.prototype.onFoodSelection = function () {
        var _this = this;
        if (this.selectedFood) {
            console.log(this.selectedFood);
            var id = this.selectedFood._id;
            if (id !== undefined) {
                this.api.apiGetDetailsCall(id, 'product/getOneProduct').subscribe(function (data) {
                    var _a, _b, _c;
                    _this.productDetails = data.data;
                    console.log(_this.productDetails);
                    // this.form.controls['productName'].setValue(data.data.productName)
                    _this.form.controls['discountPrice'].setValue(data.data.discountPrice);
                    _this.form.controls['actualPrice'].setValue(data.data.actualPrice);
                    _this.form.controls['description'].setValue(data.data.description);
                    // this.form.controls['quantity'].setValue(this.selectedStock);
                    _this.form.controls['category'].setValue(data.data.category);
                    _this.form.controls['brand'].setValue(data.data.brand);
                    _this.form.controls['formulation'].setValue(data.data.formulation);
                    _this.form.controls['avgCustomerRating'].setValue(data.data.avgCustomerRating);
                    _this.form.controls['for'].setValue(data.data.gender);
                    _this.form.controls['gift'].setValue(data.data.gift);
                    _this.form.controls['personalised'].setValue(data.data.personalised);
                    _this.form.controls['latest'].setValue(data.data.latest);
                    _this.form.controls['collections'].setValue(data.data.collections);
                    _this.form.controls['viewedBy'].setValue(data.data.viewedBy);
                    _this.form.controls['noOfViews'].setValue(data.data.noOfViews);
                    _this.form.controls['noOfSales'].setValue(data.data.noOfSales);
                    _this.form.controls['productAge'].setValue(data.data.productAge);
                    _this.form.controls['referenceId'].setValue(data.data.referenceId);
                    _this.mainImageSrc = (_a = _this.productDetails) === null || _a === void 0 ? void 0 : _a.productImages[0];
                    _this.images = (_b = _this.productDetails) === null || _b === void 0 ? void 0 : _b.productImages;
                    _this.video = (_c = _this.productDetails) === null || _c === void 0 ? void 0 : _c.productVideos[0];
                });
            }
        }
    };
    AddProductComponent.prototype.selectImage = function (image) {
        this.mainImageSrc = image;
        this.videoSelect = false;
    };
    AddProductComponent.prototype.selectVideo = function (video) {
        this.videoSelect = true;
    };
    AddProductComponent.prototype.removeImage = function (index) {
        this.images.splice(index, 1);
        if (!this.images.length) {
            this.mainImageSrc = this.noImage;
        }
    };
    AddProductComponent.prototype.removeVideo = function () {
        this.video = "";
    };
    AddProductComponent.prototype.clearFileInput = function () {
        this.fileInput.nativeElement.value = '';
    };
    AddProductComponent.prototype.initializeForm = function () {
        this.form = this.formBuilder.group({
            productName: ['', forms_1.Validators.required],
            discountPrice: ['', forms_1.Validators.required],
            actualPrice: ['', forms_1.Validators.required],
            description: ['', forms_1.Validators.required],
            quantity: ['', forms_1.Validators.required],
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
        // this.form.disable();
        // Disable individual form controls
        // this.form.controls['productName'].disable();
        this.form.controls['discountPrice'].disable();
        this.form.controls['actualPrice'].disable();
        this.form.controls['description'].disable();
        // this.form.controls['quantity'].disable();
        this.form.controls['category'].disable();
        this.form.controls['brand'].disable();
        this.form.controls['formulation'].disable();
        this.form.controls['avgCustomerRating'].disable();
        this.form.controls['for'].disable();
        this.form.controls['gift'].disable();
        this.form.controls['personalised'].disable();
        this.form.controls['latest'].disable();
        this.form.controls['collections'].disable();
        this.form.controls['viewedBy'].disable();
        this.form.controls['noOfViews'].disable();
        this.form.controls['noOfSales'].disable();
        this.form.controls['productAge'].disable();
        this.form.controls['referenceId'].disable();
    };
    AddProductComponent.prototype.discard = function () {
        if (this.productId) {
            this.form.patchValue(this.productDetails);
        }
        else {
            this.form.reset();
        }
        this.router.navigate(['/inventory/list']);
    };
    AddProductComponent.prototype.save = function () {
        var _this = this;
        var _a;
        this.form.setValidators(null);
        this.form.updateValueAndValidity();
        if (this.form.invalid && ((_a = this.allFiles) === null || _a === void 0 ? void 0 : _a.length) !== 5) {
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
                for (var _i = 0, _b = this.allFiles; _i < _b.length; _i++) {
                    var img = _b[_i];
                    formData.append('files', img);
                }
            }
            this.api.apiPostCall(formData, 'Product/createProductImages').subscribe(function (data) {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
                if (data.message.includes('Image Added Successfully')) {
                    var addProd = new add_product_model_1.AddProduct();
                    if (_this.productId === null) {
                        addProd.productId = _this.productId ? _this.productId : _this.productDetails._id;
                        addProd.superAdminId = localStorage.getItem('superAdminId');
                        addProd.storeId = localStorage.getItem('storeId');
                        addProd.productName = _this.productId === null ? (_a = _this.form.get('productName')) === null || _a === void 0 ? void 0 : _a.value.productName : (_b = _this.form.get('productName')) === null || _b === void 0 ? void 0 : _b.value;
                        addProd.discountPrice = (_c = _this.form.get('discountPrice')) === null || _c === void 0 ? void 0 : _c.value;
                        addProd.actualPrice = (_d = _this.form.get('actualPrice')) === null || _d === void 0 ? void 0 : _d.value;
                        addProd.description = (_e = _this.form.get('description')) === null || _e === void 0 ? void 0 : _e.value;
                        addProd.category = (_f = _this.form.get('category')) === null || _f === void 0 ? void 0 : _f.value;
                        addProd.quantity = Number((_g = _this.form.get('quantity')) === null || _g === void 0 ? void 0 : _g.value);
                        addProd.brand = (_h = _this.form.get('brand')) === null || _h === void 0 ? void 0 : _h.value;
                        addProd.gender = (_j = _this.form.get('for')) === null || _j === void 0 ? void 0 : _j.value;
                        addProd.formulation = (_k = _this.form.get('formulation')) === null || _k === void 0 ? void 0 : _k.value;
                        addProd.avgCustomerRating = (_l = _this.form.get('avgCustomerRating')) === null || _l === void 0 ? void 0 : _l.value;
                        addProd.gift = (_m = _this.form.get('gift')) === null || _m === void 0 ? void 0 : _m.value;
                        addProd.personalised = (_o = _this.form.get('personalised')) === null || _o === void 0 ? void 0 : _o.value;
                        addProd.latest = (_p = _this.form.get('latest')) === null || _p === void 0 ? void 0 : _p.value;
                        addProd.collections = (_q = _this.form.get('collections')) === null || _q === void 0 ? void 0 : _q.value;
                        addProd.viewedBy = (_r = _this.form.get('viewedBy')) === null || _r === void 0 ? void 0 : _r.value;
                        addProd.noOfViews = Number((_s = _this.form.get('noOfViews')) === null || _s === void 0 ? void 0 : _s.value);
                        addProd.noOfSales = Number((_t = _this.form.get('noOfSales')) === null || _t === void 0 ? void 0 : _t.value);
                        addProd.productAge = (_u = _this.form.get('productAge')) === null || _u === void 0 ? void 0 : _u.value;
                        addProd.referenceId = (_v = _this.form.get('referenceId')) === null || _v === void 0 ? void 0 : _v.value;
                        addProd.barcode = _this.productId ? _this.productDetails.barcode : _this.result;
                        addProd.imageArray = _this.images;
                        addProd.videoArray = _this.video !== undefined ? _this.video : [];
                    }
                    else {
                        addProd._id = _this.productId;
                        addProd.quantity = Number((_w = _this.form.get('quantity')) === null || _w === void 0 ? void 0 : _w.value);
                    }
                    console.log(addProd);
                    return;
                    if (_this.productId) {
                        _this.api.apiPutCall(addProd, 'inventory/updateInventoryProduct').subscribe(function (data) {
                            if (data.message.includes('Successfully')) {
                                _this.isSave = false;
                                _this.snackbar.openFromComponent(snackbar_component_1.SnackbarComponent, {
                                    data: data.message
                                });
                                _this.router.navigate(['/inventory/list']);
                            }
                        }, function (error) {
                            if (error) {
                                _this.isSave = false;
                                // this.form.reset();
                            }
                        });
                    }
                    else {
                        _this.api.apiFormDataPostCall(addProd, 'inventory/createInventoryProduct').subscribe(function (data) {
                            if (data.message.includes('Successfully')) {
                                _this.snackbar.openFromComponent(snackbar_component_1.SnackbarComponent, {
                                    data: data.message
                                });
                                _this.router.navigate(['/inventory/list']);
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
    ], AddProductComponent.prototype, "fileInput");
    AddProductComponent = __decorate([
        core_1.Component({
            selector: 'app-add-product',
            templateUrl: './add-product.component.html',
            styleUrls: ['./add-product.component.scss']
        })
    ], AddProductComponent);
    return AddProductComponent;
}());
exports.AddProductComponent = AddProductComponent;
