import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmDialogComponent } from 'src/app/shared-module/confirm-dialog/confirm-dialog.component';
import { SnackbarComponent } from 'src/app/shared-module/snackbar/snackbar.component';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  dataSource = new MatTableDataSource<any>([]);
  columnsToDisplay = ['order_id','gift', 'customer_details', 'order_details','created_At', 'order_status'];
  orderStatus = [
    { label: 'Dispatch', value: 'pending' },
    { label: 'On the way', value: 'dispatch' },
    { label: 'Delivered', value: 'delivered' },
  ];
  noData=false;

  selectedValue: any;
  orderList: any;
  allOrderList: any;
  orderStatusPending: any = 0;
  orderStatusDispatch: any = 0;
  orderStatusdelivery: any = 0;
  monthCount:number;

  constructor(private api: ApiService, public dialog: MatDialog, private router: Router ,private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.getOrderList();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyTypeFilter() {
    console.log(this.selectedValue)
    if (this.selectedValue && this.selectedValue.length) {
      this.dataSource.data = this.orderList.filter((item) => {
        return this.selectedValue.some((option) => {
          return item.orderStatus.indexOf(option) !== -1;
        });
      });
    } else {
      this.dataSource.data = this.orderList;
    }
  }
  viewMarket(id: string): void {
    this.router.navigate(['/marketing/view', id]);
  }
  getOrderList(): void {
    this.api.apiGetCall('order/getAllOrder'+'/'+localStorage.getItem('storeId')).subscribe((data) => {
      this.orderList = data.data
      // this.orderList=result.data.orders
      // console.log("orderList",this.orderList);
      this.dataSource.data=data.data.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
      this.allOrderList = this.orderList;
      this.getCountStatus();
      if(!data.data?.length){
        this.noData=true;
      }
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
  
  updateOrderStatus(req):void{
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      width: req.orderStatus==='pending'?'350px':'300px',
      data: {
        from:'orderStatus',
        data:req
      }
    });
    dialog.afterClosed().subscribe(data => {
      if (data) {
        let params={
          "_id":req._id,
          "orderStatus":req.orderStatus==='pending'? 'dispatch' :'delivered'
        }  
        this.api.apiPutCall(params, 'order/updateOrder').subscribe(data => {
          if (data.message.includes('Update Order Successfully')) {
            this.snackbar.openFromComponent(SnackbarComponent, {
              data: data.message,
            });
            this.getOrderList();
          }
        }, (error) => {
          
        })
      }
    })
  }
}
