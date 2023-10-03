"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ApiService = void 0;
var core_1 = require("@angular/core");
var environment_prod_1 = require("src/environments/environment.prod");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var API_URL = environment_prod_1.environment.apiUrl;
var ApiService = /** @class */ (function () {
    function ApiService(http) {
        this.http = http;
    }
    ApiService.prototype.apiPutCall = function (postParam, endPoint) {
        var finalURL = API_URL + endPoint;
        return this.http.put(finalURL, postParam).pipe(operators_1.catchError(this.handleError));
    };
    ApiService.prototype.apiPostCall = function (postParam, endPoint) {
        var finalURL = API_URL + endPoint;
        return this.http.post(finalURL, postParam).pipe(operators_1.catchError(this.handleError));
    };
    ApiService.prototype.apiFormDataPostCall = function (postParam, endPoint) {
        var finalURL = API_URL + endPoint;
        return this.http.post(finalURL, postParam).pipe(operators_1.catchError(this.handleError));
    };
    ApiService.prototype.apiDeleteCall = function (id, endPoint) {
        var finalURL = API_URL + endPoint;
        return this.http["delete"](finalURL + '/' + id).pipe(operators_1.catchError(this.handleError));
    };
    ApiService.prototype.apiGetCall = function (endPoint) {
        var finalURL = API_URL + endPoint;
        return this.http.get(finalURL).pipe(operators_1.catchError(this.handleError));
    };
    ApiService.prototype.apiGetDetailsCall = function (id, endPoint) {
        var finalURL = API_URL + endPoint;
        return this.http.get(finalURL + '/' + id).pipe(operators_1.catchError(this.handleError));
    };
    ApiService.prototype.getProductData = function () {
        var url = 'https://ecommerce-kxhu.onrender.com/Product/getProduct';
        // let url ='http://localhost:8000/Product/getProduct'
        return this.http.get(url);
    };
    ApiService.prototype.createProductData = function (body) {
        var url = 'https://ecommerce-kxhu.onrender.com/Product/createProduct';
        // let url="http://localhost:8000/Product/createProduct"
        return this.http.post(url, body);
    };
    ApiService.prototype.updateProduct = function (_id) {
        var url = 'https://ecommerce-kxhu.onrender.com/Product/updateProduct';
        // let url ="http://localhost:8000/Product/updateProduct"
        return this.http.put(url, _id);
    };
    ApiService.prototype.deleteProduct = function (_id) {
        var url = "https://ecommerce-kxhu.onrender.com/Product/deleteProduct/" + _id;
        // let url = `http://localhost:8000/Product/deleteProduct/${_id}`
        return this.http["delete"](url, _id);
    };
    ApiService.prototype.getOrderData = function () {
        var url = "https://ecommerce-kxhu.onrender.com/Order/getAllOrder";
        // let url='http://localhost:8000/Order/getAllOrder'
        return this.http.get(url);
    };
    ApiService.prototype.updateOrderData = function (body) {
        var url = "https://ecommerce-kxhu.onrender.com/Order/updateOrder";
        // let url = "http://localhost:8000/Order/updateOrder";
        return this.http.put(url, body);
    };
    ApiService.prototype.handleError = function (error) {
        var errorMessage = 'Something bad happened; please try again later.';
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            //console.error('An error occurred:', error.error.message);
            errorMessage = error.error.message;
        }
        else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            //console.error('Else occurred:', error);
            console.error("Backend returned code " + error.status + ", " + ("body was: " + error.error));
            errorMessage = error.error;
        }
        // Return an observable with a user-facing error message.
        return rxjs_1.throwError(errorMessage);
    };
    ApiService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ApiService);
    return ApiService;
}());
exports.ApiService = ApiService;
