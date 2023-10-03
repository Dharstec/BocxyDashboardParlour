import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmDialogComponent } from 'src/app/shared-module/confirm-dialog/confirm-dialog.component';
import { SnackbarComponent } from 'src/app/shared-module/snackbar/snackbar.component';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  dataSource = new MatTableDataSource<any>([]);
  columnsToDisplay = ['index', 'id', 'name', 'email', 'phoneNumber', 'total_value', 'visit', 'action'];
  types: string[] = [
    "Male",
    "Female",
    "Neutral"
  ];
  totalCustomer: any = 0;
  activeCustomer: any = 0;
  newCustomer: any = 0;
  customerList: any;
  selectedValue: any;
  noData = false;
  activeCustomerList: any;

  constructor(private api: ApiService, public dialog: MatDialog, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.getCustomerList();
    // this.dataSource.data = this.customerData;
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getCustomerList(): void {
    this.api.apiGetCall('customer/getAllCustomer').subscribe((data) => {
      this.customerList = data.data;
      this.activeCustomerList = data.data.filter(a => a.isOtpVerified === '1');
      this.dataSource.data = data.data.filter(a => a.isOtpVerified === '1').sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
      this.totalCustomer = data.data?.length;
      this.getCountStatus();
      if (!data.data?.length) {
        this.noData = true;
      }
    },error=>{
      if(error){
        this.noData = true;

      }
    })
  }

  applyTypeFilter() {
    if (this.selectedValue && this.selectedValue.length) {
      this.dataSource.data = this.activeCustomerList.filter((item) => {
        return this.selectedValue.some((option) => {
          return item.gender.indexOf(option) !== -1;
        });
      });
      if (this.dataSource.data.length === 0) {
        this.noData = true;
      }
    } else {
      this.dataSource.data = this.activeCustomerList;
    }
  }

  delete(id: string): void {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {
        from: "delete",
      }
    });
    dialog.afterClosed().subscribe(data => {
      if (data) {
        this.api.apiDeleteCall(id, 'customer/deleteCustomer').subscribe(response => {
          if (response.message.includes('Successfully')) {
            this.snackbar.openFromComponent(SnackbarComponent, {
              data: response.message,
            });
            this.getCustomerList();
          }
        })
      }
    })
  }

  getCountStatus() {
    let temp1 = []
    let temp2 = []
    let temp3 = []
    this.customerList.forEach(element => {
      if (element.isOtpVerified == '1') {
        temp1.push(element)
      }
      else if (element.isOtpVerified == '0') {
        temp2.push(element)
      }

    })
    this.activeCustomer = temp1.length
    this.newCustomer = temp2.length
  }
}
