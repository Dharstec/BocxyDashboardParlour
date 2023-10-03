import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment.prod';
import { AppResponse } from './appResponse.modal';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http: HttpClient) { }
  apiPutCall(postParam: any, endPoint: string): Observable<AppResponse> {
    let finalURL = API_URL + endPoint;
    return this.http.put<AppResponse>(finalURL, postParam).pipe(catchError(this.handleError));
  }
  apiPostCall(postParam: any, endPoint: string): Observable<AppResponse> {
    let finalURL = API_URL + endPoint;
    return this.http.post<AppResponse>(finalURL, postParam).pipe(catchError(this.handleError));
  }

  apiFormDataPostCall(postParam: any, endPoint: string): Observable<AppResponse> {
    let finalURL = API_URL + endPoint;
    return this.http.post<AppResponse>(finalURL, postParam).pipe(catchError(this.handleError));
  }

  apiDeleteCall(id: any, endPoint: string): Observable<AppResponse> {
    let finalURL = API_URL + endPoint;
    return this.http.delete<AppResponse>(finalURL + '/' + id).pipe(catchError(this.handleError));
  }

  apiGetCall(endPoint: string): Observable<AppResponse> {
    let finalURL = API_URL + endPoint;
    return this.http.get<AppResponse>(finalURL).pipe(catchError(this.handleError));
  }

  apiGetDetailsCall(id: any, endPoint: string): Observable<AppResponse> {
    let finalURL = API_URL + endPoint;
    return this.http.get<AppResponse>(finalURL + '/' + id).pipe(catchError(this.handleError));
  }

  getProductData() {
    let url = 'https://ecommerce-kxhu.onrender.com/Product/getProduct';
    // let url ='http://localhost:8000/Product/getProduct'
    return this.http.get(url);
  }
  createProductData(body) {
    let url = 'https://ecommerce-kxhu.onrender.com/Product/createProduct';
    // let url="http://localhost:8000/Product/createProduct"
    return this.http.post(url, body)
  }
  updateProduct(_id) {
    let url = 'https://ecommerce-kxhu.onrender.com/Product/updateProduct';
    // let url ="http://localhost:8000/Product/updateProduct"
    return this.http.put(url, _id)
  }

  deleteProduct(_id) {
    let url = `https://ecommerce-kxhu.onrender.com/Product/deleteProduct/${_id}`;
    // let url = `http://localhost:8000/Product/deleteProduct/${_id}`
    return this.http.delete(url, _id)
  }

  getOrderData() {
    let url = "https://ecommerce-kxhu.onrender.com/Order/getAllOrder";
    // let url='http://localhost:8000/Order/getAllOrder'
    return this.http.get(url)
  }
  updateOrderData(body) {
    let url = "https://ecommerce-kxhu.onrender.com/Order/updateOrder";
    // let url = "http://localhost:8000/Order/updateOrder";
    return this.http.put(url, body)
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Something bad happened; please try again later.';

    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      //console.error('An error occurred:', error.error.message);
      errorMessage = error.error.message;

    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      //console.error('Else occurred:', error);
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
      errorMessage = error.error;
    }
    // Return an observable with a user-facing error message.
    return throwError(errorMessage);
  }

}

