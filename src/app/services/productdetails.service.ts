import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductdetailsService {
  showData: any;
  typeData:any;
  constructor(private http: HttpClient) { }
  setdata(data,type?:any) {
    // this.showData = {}
    this.showData = data
    this.typeData = type
  console.log(data,type);

     //row data saved
    // let url='https://ecommerce-kxhu.onrender.com/Product/updateProduct';
    // return this.http.get(url);
  }
  
  getdata() {
    return {data:this.showData,type:this.typeData}
  }
}
