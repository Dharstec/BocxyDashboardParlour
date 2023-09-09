import { Component, ElementRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import * as XLSX from 'xlsx';
import { DialogOrderstatusComponent } from './dialog-orderstatus/dialog-orderstatus.component';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orderList: any;
  allOrderList: any;
  orderSearchValue: '';
  fileName = 'orderDetailsExcel.xlsx';
  orderStatusPending: any = 0;
  orderStatusDispatch: any = 0;
  orderStatusdelivery: any = 0;
  // temp1:any
  // _id:'';
  // orderStatus:string;
  // showButton: boolean = false;

  orderStatusList: string[] = [
    "pending",
    "dispatch",
    "delivered"
  ]
  dataSource = new MatTableDataSource<any>([]); 
  // 'GIFT WRAP', 'CUSTOMER DETAILS', 'ORDER DETAILS',
  columnsToDisplay = ['ID', 'giftWrap', 'CUSTOMER DETAILS','ORDER DETAILS' ,'ORDER STATUS',];
  tempordersrespone: [];
  ordersrespone: any;
  constructor(private api: ApiService, private matDialog: MatDialog,) { }

  ngOnInit(): void {

    this.api.getOrderData().subscribe(async (result: any) => {
      console.log("orderresult",result.data);
      this.orderList = result.data
      // this.orderList=result.data.orders
      // console.log("orderList",this.orderList);
      this.allOrderList = this.orderList;
      this.dataSource.data = result.data
      this.getCountStatus();
    })
  }
  getCountStatus() {
    let temp1 = []
    let temp2 = []
    let temp3 = []
    this.allOrderList.forEach(element => {
      if (element.orderStatus == 'pending') {
        temp1.push(element)
      }
      else if (element.orderStatus == 'dispatch') {
        temp2.push(element)
      }
      else {
        temp3.push(element)
      }
    })
    this.orderStatusPending = temp1.length
    this.orderStatusDispatch = temp2.length
    this.orderStatusdelivery = temp3.length

  }
  exportexcel() {
    this.orderList = document.getElementById("excel-table-id");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.orderList);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    console.log("wb", wb);

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);


  }

  openDialogOrderStatus(row): Observable<any> {
    console.log("row", row);
    let dialog = this.matDialog.open(DialogOrderstatusComponent, {
      width: '400px',
      // data:row,
      data: {
        _id: row._id,
        orderStatus: row.orderStatus,
      },
    })

    // this.showButton=true
    // console.log("dialog box", dialog.afterClosed());
    // console.log("data",dialog.data);
    dialog.afterClosed().subscribe(result => {
      console.log("aftercloser", result);

      this.orderList = result
      // this.showButton=true
      this.api.getOrderData().subscribe(async (result: any) => {
        console.log("orderresult", result);
        this.orderList = result.data
        // this.orderList=result.data.orders
        console.log("orderList", this.orderList);

        this.allOrderList = this.orderList;
        console.log("allOrderList", this.allOrderList);

      })
    })
    return dialog.afterClosed()

  }


  updateOrderStatus(rowdata, type) {
    console.log(rowdata);
    let body = {
      "_id": rowdata._id,
      "orderStatus": type,

    }
    this.api.updateOrderData(body).subscribe((res: any) => {
      console.log(res);
      this.orderList = res.data
      console.log(this.orderList);
    })
  }

  orderStatusFilter(event) {
    let orderStatusCheck = event.value
    console.log(orderStatusCheck);
    if (orderStatusCheck) {
      let temp = []
      // debugger
      this.allOrderList.forEach(element => {
        if (element.orderStatus == orderStatusCheck) { // orderstatus ---> pending == orderstatuscheck ----> pending

          temp.push(element) // pending --> push into temp

        }
        console.log(temp);

        // this.allOrderList= temp;    
      })
      this.orderList = temp // temp ---> bind to table name is orderlist
    }

  }

}



