import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormBuilder, FormGroup } from '@angular/forms';
import { AddproductComponent } from './addproduct/addproduct.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ProductdetailsService } from 'src/app/services/productdetails.service';
import { DialogAddproductComponent } from './addproduct/dialog-addproduct/dialog-addproduct.component';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

export interface tableData {
  Id: number,
  category, colour, name, instock, refernceid
}
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})

export class InventoryComponent implements OnInit {
  showProductPage: Boolean = false;
  searchText: '';
  setData: any;
  editProductDetails = true;
  productList: any;
  productFormGroup: any
  productAllList: any
  fileName = 'productDetailsExcel.xlsx';
  Catagory = new UntypedFormControl('');
  CatagoryList: string[] = [
    "Anklets",
    "Bracelets",
    "Bangles",
    "Earrings",
    "Necklace",
    "Nose Pins",
    "Pendant",
    "Rings",
    "Jewellery Set",
    "Toe Rings"];
  Color = new UntypedFormControl('');
  ColorList: string[] = [
    "Gold",
    "Oxidised Silver",
    "Rose Gold",
    "Silver"
  ]
  disabled = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 0;
  dialogValue: any;
  allProductList: any;
  checked: any;
  dataSource = new MatTableDataSource<any>([]);
  columnsToDisplay = ['ID', 'CATEGORY', 'COLOUR', 'NAME', 'INSTOCK', 'REFERENCEID', 'action',];

  constructor(private matDialog: MatDialog, private api: ApiService, private route: Router, private productDetails: ProductdetailsService, private formBuilder: UntypedFormBuilder) {
  }

  openDialog(row): Observable<any> {
    let dialog = this.matDialog.open(DialogAddproductComponent, {
      width: '400px',
      data: {
        productName: row.productName,
        productId: row._id,
      },
    })
    return dialog.afterClosed()
  }

  ngOnInit(): void {
   
    this.showProductPage = false
    this.productFormGroup = this.formBuilder.group({
      Catagory: [null,],
      Color: [null],
      Stocks: [null]
    })
    this.getProducts();
  }

  getProducts(){
    this.api.getProductData().subscribe(async (res: any) => {
      console.log("data", res); // get product data result
      this.productList = res.data
      this.allProductList = this.productList
      this.dataSource.data = res.data
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  productCategory(event, type) {
    let checked = event.value
    console.log("checked", checked);

    if (checked) {
      let temp = []
      console.log("productList", this.productList);

      this.allProductList.forEach(element => {
        element.category.map(items => {
          checked.forEach(x => {
            if (x == items) {

              temp.push(element)
            }
            this.productList = temp;
            // else{
            //     this.productList=this.allProductList;
            // }
          })

        })
        this.productList = this.allProductList;
      }

      )
      console.log("this.productList1", this.productList);

      this.allProductList.forEach(element => {
        element.colour.map(items => {
          checked.forEach(x => {
            if (x == items) {
              temp.push(element)
            }
            this.productList = temp
          })
        })
      })
      //  this.productList=this.allProductList;
      console.log("temp", temp);
      console.log("productListdata", this.productList.data);


    }
    // else {
    //   this.allProductList.forEach(element=> element.checked = false)
    // }
  }

  addproduct() {
    this.productDetails.setdata(false)
    console.log(this.productDetails);
    // this.showProductPage=true
    return this.route.navigate(['productDetails'], { queryParams: { type: 'addProduct' } })

  }
  editProduct(rowData, viewData?: any) {
    // let view= viewData == 'view' ? 'view' : rowData
    this.productDetails.setdata(rowData, viewData)
    console.log(rowData);
    this.route.navigate(['productDetails'], { queryParams: { type: !viewData ? 'editProduct' : 'viewProduct' } })
    // return this.route.navigate(['dashboard/productDetails'],{queryParams:{type:'editProduct',viewData:'viewProduct'}})
  }


  exportexcel() {
    this.productList = document.getElementById("excel-table-id");
   


  }
  stockfilter(event) {
    let temp = []
    let stockCount = event.target.value
    stockCount = Number(stockCount)
    console.log(event.target.value);
    if (stockCount != '') {
      this.allProductList.forEach(element => {
        if (element.stock <= stockCount) {
          temp.push(element)

        }
        this.productList = temp;
      }
      )
    }
    else {
      this.productList = this.allProductList;
    }
  }
  // getTableData() {
  //   let tableData = []
  //   this.productList.data.forEach(element => {
  //     tableData.push({
  //       ID: element._id,
  //       CATEGORY: element.category,
  //       COLOR: element.colour,
  //       NAME: element.productName,
  //       INSTOCK: element.stock
  //     })

  //   });
  // }


}
