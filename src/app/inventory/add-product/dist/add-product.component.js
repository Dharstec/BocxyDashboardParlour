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
                    _this.isSave = false;
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
            discountPrice: [''],
            actualPrice: [''],
            description: [''],
            quantity: ['', forms_1.Validators.required],
            category: [''],
            brand: [''],
            formulation: [''],
            avgCustomerRating: [''],
            "for": [''],
            gift: [true],
            personalised: [true],
            latest: [true],
            collections: [''],
            viewedBy: [''],
            noOfViews: [''],
            noOfSales: [''],
            productAge: [''],
            referenceId: ['']
        });
        if (localStorage.getItem('role') === 'STORE_ADMIN') {
            this.disable = true;
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
        }
        else {
            this.disable = false;
        }
        if (this.disable === true) {
        }
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
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14;
                if (data.message.includes('Image Added Successfully')) {
                    var addProd_1 = new add_product_model_1.AddProduct();
                    if (localStorage.getItem('role') === 'STORE_ADMIN') {
                        if (_this.productId === null) {
                            addProd_1.productId = _this.productId ? _this.productId : _this.productDetails._id;
                            addProd_1.superAdminId = localStorage.getItem('superAdminId');
                            addProd_1.storeId = localStorage.getItem('storeId');
                            addProd_1.productName = _this.productId === null ? (_a = _this.form.get('productName')) === null || _a === void 0 ? void 0 : _a.value.productName : (_b = _this.form.get('productName')) === null || _b === void 0 ? void 0 : _b.value;
                            addProd_1.discountPrice = Number((_c = _this.form.get('discountPrice')) === null || _c === void 0 ? void 0 : _c.value);
                            addProd_1.actualPrice = Number((_d = _this.form.get('actualPrice')) === null || _d === void 0 ? void 0 : _d.value);
                            addProd_1.description = (_e = _this.form.get('description')) === null || _e === void 0 ? void 0 : _e.value;
                            addProd_1.category = (_f = _this.form.get('category')) === null || _f === void 0 ? void 0 : _f.value;
                            addProd_1.quantity = Number((_g = _this.form.get('quantity')) === null || _g === void 0 ? void 0 : _g.value);
                            addProd_1.brand = (_h = _this.form.get('brand')) === null || _h === void 0 ? void 0 : _h.value;
                            addProd_1.gender = (_j = _this.form.get('for')) === null || _j === void 0 ? void 0 : _j.value;
                            addProd_1.formulation = (_k = _this.form.get('formulation')) === null || _k === void 0 ? void 0 : _k.value;
                            addProd_1.avgCustomerRating = (_l = _this.form.get('avgCustomerRating')) === null || _l === void 0 ? void 0 : _l.value;
                            addProd_1.gift = (_m = _this.form.get('gift')) === null || _m === void 0 ? void 0 : _m.value;
                            addProd_1.personalised = (_o = _this.form.get('personalised')) === null || _o === void 0 ? void 0 : _o.value;
                            addProd_1.latest = (_p = _this.form.get('latest')) === null || _p === void 0 ? void 0 : _p.value;
                            addProd_1.collections = (_q = _this.form.get('collections')) === null || _q === void 0 ? void 0 : _q.value;
                            addProd_1.viewedBy = (_r = _this.form.get('viewedBy')) === null || _r === void 0 ? void 0 : _r.value;
                            addProd_1.noOfViews = Number((_s = _this.form.get('noOfViews')) === null || _s === void 0 ? void 0 : _s.value);
                            addProd_1.noOfSales = Number((_t = _this.form.get('noOfSales')) === null || _t === void 0 ? void 0 : _t.value);
                            addProd_1.productAge = (_u = _this.form.get('productAge')) === null || _u === void 0 ? void 0 : _u.value;
                            addProd_1.referenceId = (_v = _this.form.get('referenceId')) === null || _v === void 0 ? void 0 : _v.value;
                            addProd_1.barcode = _this.productId ? _this.productDetails.barcode : _this.result;
                            addProd_1.imageArray = _this.images;
                            addProd_1.videoArray = _this.video !== undefined ? _this.video : [];
                        }
                        else {
                            addProd_1._id = _this.productId;
                            addProd_1.quantity = Number((_w = _this.form.get('quantity')) === null || _w === void 0 ? void 0 : _w.value);
                        }
                        if (_this.productId) {
                            _this.api.apiPutCall(addProd_1, 'inventory/updateInventoryProduct').subscribe(function (data) {
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
                                    _this.snackbar.openFromComponent(snackbar_component_1.SnackbarComponent, {
                                        data: error.message
                                    });
                                    // this.form.reset();
                                }
                            });
                        }
                        else {
                            _this.api.apiFormDataPostCall(addProd_1, 'inventory/createInventoryProduct').subscribe(function (data) {
                                if (data.message.includes('Successfully')) {
                                    _this.snackbar.openFromComponent(snackbar_component_1.SnackbarComponent, {
                                        data: data.message
                                    });
                                    _this.router.navigate(['/inventory/list']);
                                }
                                else {
                                    _this.snackbar.openFromComponent(snackbar_component_1.SnackbarComponent, {
                                        data: data.message
                                    });
                                }
                            }, function (error) {
                                if (error) {
                                    _this.snackbar.openFromComponent(snackbar_component_1.SnackbarComponent, {
                                        data: error.message
                                    });
                                    // this.form.reset();
                                }
                            });
                        }
                    }
                    else {
                        addProd_1._id = _this.productId ? _this.productId : null;
                        addProd_1.superAdminId = localStorage.getItem('superAdminId');
                        addProd_1.productName = (_x = _this.form.get('productName')) === null || _x === void 0 ? void 0 : _x.value;
                        addProd_1.discountPrice = (_y = _this.form.get('discountPrice')) === null || _y === void 0 ? void 0 : _y.value;
                        addProd_1.actualPrice = (_z = _this.form.get('actualPrice')) === null || _z === void 0 ? void 0 : _z.value;
                        addProd_1.description = (_0 = _this.form.get('description')) === null || _0 === void 0 ? void 0 : _0.value;
                        addProd_1.category = (_1 = _this.form.get('category')) === null || _1 === void 0 ? void 0 : _1.value;
                        addProd_1.gender = (_2 = _this.form.get('for')) === null || _2 === void 0 ? void 0 : _2.value;
                        addProd_1.brand = (_3 = _this.form.get('brand')) === null || _3 === void 0 ? void 0 : _3.value;
                        addProd_1.formulation = (_4 = _this.form.get('formulation')) === null || _4 === void 0 ? void 0 : _4.value;
                        addProd_1.avgCustomerRating = (_5 = _this.form.get('avgCustomerRating')) === null || _5 === void 0 ? void 0 : _5.value;
                        addProd_1.gift = (_6 = _this.form.get('gift')) === null || _6 === void 0 ? void 0 : _6.value;
                        addProd_1.personalised = (_7 = _this.form.get('personalised')) === null || _7 === void 0 ? void 0 : _7.value;
                        addProd_1.latest = (_8 = _this.form.get('latest')) === null || _8 === void 0 ? void 0 : _8.value;
                        addProd_1.collections = (_9 = _this.form.get('collections')) === null || _9 === void 0 ? void 0 : _9.value;
                        addProd_1.viewedBy = (_10 = _this.form.get('viewedBy')) === null || _10 === void 0 ? void 0 : _10.value;
                        addProd_1.noOfViews = Number((_11 = _this.form.get('noOfViews')) === null || _11 === void 0 ? void 0 : _11.value);
                        addProd_1.noOfSales = Number((_12 = _this.form.get('noOfSales')) === null || _12 === void 0 ? void 0 : _12.value);
                        addProd_1.productAge = (_13 = _this.form.get('productAge')) === null || _13 === void 0 ? void 0 : _13.value;
                        addProd_1.referenceId = (_14 = _this.form.get('referenceId')) === null || _14 === void 0 ? void 0 : _14.value;
                        addProd_1.barcode = _this.productId ? _this.productDetails.barcode : _this.result;
                        if (data.data.imageArray.length > 0) {
                            addProd_1.imageArray = data.data.imageArray ? data.data.imageArray : [];
                        }
                        else {
                            addProd_1.imageArray = _this.images;
                        }
                        if (data.data.videoArray > 0) {
                            addProd_1.videoArray = data.data.videoArray ? data.data.videoArray : [];
                        }
                        else {
                            addProd_1.videoArray = (_this.video !== undefined) ? _this.video : [];
                        }
                        if (_this.productId) {
                            _this.api.apiPutCall(addProd_1, 'Product/updateProduct').subscribe(function (data) {
                                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
                                if (data.message.includes('Successfully')) {
                                    _this.isSave = false;
                                    if (_this.productId === null) {
                                        addProd_1.productId = _this.productId ? _this.productId : data.data._id;
                                        addProd_1.superAdminId = localStorage.getItem('superAdminId');
                                        addProd_1.storeId = localStorage.getItem('superAdminId');
                                        ;
                                        addProd_1.productName = (_a = _this.form.get('productName')) === null || _a === void 0 ? void 0 : _a.value;
                                        addProd_1.discountPrice = Number((_b = _this.form.get('discountPrice')) === null || _b === void 0 ? void 0 : _b.value);
                                        addProd_1.actualPrice = Number((_c = _this.form.get('actualPrice')) === null || _c === void 0 ? void 0 : _c.value);
                                        addProd_1.description = (_d = _this.form.get('description')) === null || _d === void 0 ? void 0 : _d.value;
                                        addProd_1.category = (_e = _this.form.get('category')) === null || _e === void 0 ? void 0 : _e.value;
                                        addProd_1.quantity = Number((_f = _this.form.get('quantity')) === null || _f === void 0 ? void 0 : _f.value);
                                        addProd_1.brand = (_g = _this.form.get('brand')) === null || _g === void 0 ? void 0 : _g.value;
                                        addProd_1.gender = (_h = _this.form.get('for')) === null || _h === void 0 ? void 0 : _h.value;
                                        addProd_1.formulation = (_j = _this.form.get('formulation')) === null || _j === void 0 ? void 0 : _j.value;
                                        addProd_1.avgCustomerRating = (_k = _this.form.get('avgCustomerRating')) === null || _k === void 0 ? void 0 : _k.value;
                                        addProd_1.gift = (_l = _this.form.get('gift')) === null || _l === void 0 ? void 0 : _l.value;
                                        addProd_1.personalised = (_m = _this.form.get('personalised')) === null || _m === void 0 ? void 0 : _m.value;
                                        addProd_1.latest = (_o = _this.form.get('latest')) === null || _o === void 0 ? void 0 : _o.value;
                                        addProd_1.collections = (_p = _this.form.get('collections')) === null || _p === void 0 ? void 0 : _p.value;
                                        addProd_1.viewedBy = (_q = _this.form.get('viewedBy')) === null || _q === void 0 ? void 0 : _q.value;
                                        addProd_1.noOfViews = Number((_r = _this.form.get('noOfViews')) === null || _r === void 0 ? void 0 : _r.value);
                                        addProd_1.noOfSales = Number((_s = _this.form.get('noOfSales')) === null || _s === void 0 ? void 0 : _s.value);
                                        addProd_1.productAge = (_t = _this.form.get('productAge')) === null || _t === void 0 ? void 0 : _t.value;
                                        addProd_1.referenceId = (_u = _this.form.get('referenceId')) === null || _u === void 0 ? void 0 : _u.value;
                                        addProd_1.barcode = _this.productId ? _this.productDetails.barcode : _this.result;
                                        addProd_1.imageArray = _this.images;
                                        addProd_1.videoArray = _this.video !== undefined ? _this.video : [];
                                    }
                                    else {
                                        addProd_1._id = _this.productId;
                                        addProd_1.quantity = Number((_v = _this.form.get('quantity')) === null || _v === void 0 ? void 0 : _v.value);
                                    }
                                    if (_this.productId) {
                                        _this.api.apiPutCall(addProd_1, 'inventory/updateInventoryProduct').subscribe(function (data) {
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
                                                _this.snackbar.openFromComponent(snackbar_component_1.SnackbarComponent, {
                                                    data: error.message
                                                });
                                                // this.form.reset();
                                            }
                                        });
                                    }
                                    else {
                                        _this.api.apiFormDataPostCall(addProd_1, 'inventory/createInventoryProduct').subscribe(function (data) {
                                            if (data.message.includes('Successfully')) {
                                                _this.snackbar.openFromComponent(snackbar_component_1.SnackbarComponent, {
                                                    data: data.message
                                                });
                                                _this.router.navigate(['/inventory/list']);
                                            }
                                            else {
                                                _this.snackbar.openFromComponent(snackbar_component_1.SnackbarComponent, {
                                                    data: data.message
                                                });
                                            }
                                        }, function (error) {
                                            if (error) {
                                                _this.snackbar.openFromComponent(snackbar_component_1.SnackbarComponent, {
                                                    data: error.message
                                                });
                                                // this.form.reset();
                                            }
                                        });
                                    }
                                }
                                else {
                                    _this.snackbar.openFromComponent(snackbar_component_1.SnackbarComponent, {
                                        data: 'Failed to update Product'
                                    });
                                    _this.isSave = false;
                                }
                            }, function (error) {
                                if (error) {
                                    _this.isSave = false;
                                    // this.form.reset();
                                }
                            });
                        }
                        else {
                            _this.api.apiFormDataPostCall(addProd_1, 'product/createProduct').subscribe(function (data) {
                                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
                                if (data.message.includes('Successfully')) {
                                    if (_this.productId === null) {
                                        addProd_1.productId = _this.productId ? _this.productId : data.data._id;
                                        addProd_1.superAdminId = localStorage.getItem('superAdminId');
                                        addProd_1.storeId = localStorage.getItem('superAdminId');
                                        addProd_1.productName = (_a = _this.form.get('productName')) === null || _a === void 0 ? void 0 : _a.value;
                                        addProd_1.discountPrice = Number((_b = _this.form.get('discountPrice')) === null || _b === void 0 ? void 0 : _b.value);
                                        addProd_1.actualPrice = Number((_c = _this.form.get('actualPrice')) === null || _c === void 0 ? void 0 : _c.value);
                                        addProd_1.description = (_d = _this.form.get('description')) === null || _d === void 0 ? void 0 : _d.value;
                                        addProd_1.category = (_e = _this.form.get('category')) === null || _e === void 0 ? void 0 : _e.value;
                                        addProd_1.quantity = Number((_f = _this.form.get('quantity')) === null || _f === void 0 ? void 0 : _f.value);
                                        addProd_1.brand = (_g = _this.form.get('brand')) === null || _g === void 0 ? void 0 : _g.value;
                                        addProd_1.gender = (_h = _this.form.get('for')) === null || _h === void 0 ? void 0 : _h.value;
                                        addProd_1.formulation = (_j = _this.form.get('formulation')) === null || _j === void 0 ? void 0 : _j.value;
                                        addProd_1.avgCustomerRating = (_k = _this.form.get('avgCustomerRating')) === null || _k === void 0 ? void 0 : _k.value;
                                        addProd_1.gift = (_l = _this.form.get('gift')) === null || _l === void 0 ? void 0 : _l.value;
                                        addProd_1.personalised = (_m = _this.form.get('personalised')) === null || _m === void 0 ? void 0 : _m.value;
                                        addProd_1.latest = (_o = _this.form.get('latest')) === null || _o === void 0 ? void 0 : _o.value;
                                        addProd_1.collections = (_p = _this.form.get('collections')) === null || _p === void 0 ? void 0 : _p.value;
                                        addProd_1.viewedBy = (_q = _this.form.get('viewedBy')) === null || _q === void 0 ? void 0 : _q.value;
                                        addProd_1.noOfViews = Number((_r = _this.form.get('noOfViews')) === null || _r === void 0 ? void 0 : _r.value);
                                        addProd_1.noOfSales = Number((_s = _this.form.get('noOfSales')) === null || _s === void 0 ? void 0 : _s.value);
                                        addProd_1.productAge = (_t = _this.form.get('productAge')) === null || _t === void 0 ? void 0 : _t.value;
                                        addProd_1.referenceId = (_u = _this.form.get('referenceId')) === null || _u === void 0 ? void 0 : _u.value;
                                        addProd_1.barcode = _this.productId ? _this.productDetails.barcode : _this.result;
                                        addProd_1.imageArray = _this.images;
                                        addProd_1.videoArray = _this.video !== undefined ? _this.video : [];
                                    }
                                    else {
                                        addProd_1._id = _this.productId;
                                        addProd_1.quantity = Number((_v = _this.form.get('quantity')) === null || _v === void 0 ? void 0 : _v.value);
                                    }
                                    if (_this.productId) {
                                        _this.api.apiPutCall(addProd_1, 'inventory/updateInventoryProduct').subscribe(function (data) {
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
                                                _this.snackbar.openFromComponent(snackbar_component_1.SnackbarComponent, {
                                                    data: error.message
                                                });
                                                // this.form.reset();
                                            }
                                        });
                                    }
                                    else {
                                        _this.api.apiFormDataPostCall(addProd_1, 'inventory/createInventoryProduct').subscribe(function (data) {
                                            if (data.message.includes('Successfully')) {
                                                _this.snackbar.openFromComponent(snackbar_component_1.SnackbarComponent, {
                                                    data: data.message
                                                });
                                                _this.router.navigate(['/inventory/list']);
                                            }
                                            else {
                                                _this.snackbar.openFromComponent(snackbar_component_1.SnackbarComponent, {
                                                    data: data.message
                                                });
                                            }
                                        }, function (error) {
                                            if (error) {
                                                _this.snackbar.openFromComponent(snackbar_component_1.SnackbarComponent, {
                                                    data: error.message
                                                });
                                                // this.form.reset();
                                            }
                                        });
                                    }
                                }
                                else {
                                    _this.snackbar.openFromComponent(snackbar_component_1.SnackbarComponent, {
                                        data: 'Failed to save Product'
                                    });
                                    _this.isSave = false;
                                }
                            }, function (error) {
                                if (error) {
                                    // this.form.reset();
                                }
                            });
                        }
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
