import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmDialogComponent } from 'src/app/shared-module/confirm-dialog/confirm-dialog.component';
import { SnackbarComponent } from 'src/app/shared-module/snackbar/snackbar.component';
import { coupons } from '../coupons.model';
import * as XLSX from 'xlsx';
import { ExcelMapComponent } from 'src/app/shared-module/excel-map/excel-map.component';

@Component({
  selector: 'app-coupons-list',
  templateUrl: './coupons-list.component.html',
  styleUrls: ['./coupons-list.component.scss']
})
export class CouponsListComponent implements OnInit {
  dataSource = new MatTableDataSource<any>([]);
  columnsToDisplay = ['name', 'coupon', 'percentage', 'remaining', 'orders', 'sales', 'commission', 'ending', 'status', 'action'];
  types: string[] = [
    "Affiliate",
    "In Store",
  ];
  status = [
    { 'status': "Active", 'value': true },
    { 'status': "Inactive", 'value': false }
  ]
  selectedValue: string;
  selectedStatus: string;
  noData = false;
  couponsListData: any;
  filteredData: any[];

  constructor(private api: ApiService, public dialog: MatDialog, private snackbar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.getCouponsList();
  }

  getCouponsList(): void {
    const id = (localStorage.getItem('role') === 'SUPER_ADMIN' || localStorage.getItem('role') === 'MULTI_ADMIN') ? localStorage.getItem('superAdminId') : localStorage.getItem('storeId');
    console.log(id)
    this.api.apiGetCall('coupon/getCoupon/' + id).subscribe((data) => {
      this.couponsListData = data.data;
      this.dataSource.data = data.data.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
      if (!data.data?.length) {
        this.noData = true;
      }
    })
  }
  openExportDialog(): void {
    const dialogRef = this.dialog.open(ExcelMapComponent, {
      width: '500px',
      data: { headers: Object.keys(this.dataSource.data[0]), dataSource: this.dataSource.data }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.generateExcel(result);
      }
    });
  }
  generateExcel(headers: string[]) {
    const data = this.dataSource.data.map((row: any) => {
      const newRow = {};
      headers.forEach((header, i) => {
        newRow[header] = row[Object.keys(row)[i]];
      });
      return newRow;
    });
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.xlsx';
    a.click();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

        this.api.apiDeleteCall(id, 'coupon/deleteCoupon').subscribe(response => {
          if (response.message.includes('Successfully')) {
            this.snackbar.openFromComponent(SnackbarComponent, {
              data: response.message,
            });
            this.getCouponsList();
          }
        })
      }
    })
  }

  edit(type, id) {
    this.router.navigate(['/coupon/' + type, id]);
  }

  applyTypeFilter() {
    if (this.selectedStatus?.length || this.selectedValue?.length) {
      this.filteredData = this.dataSource.data.filter(item => {
        // Check if the item's category is included in the selectedValue array
        if (this.selectedValue?.length && !this.selectedValue?.includes(item.type[0])) {
          return false;
        }

        // Check if the item's colour is included in the selectedColourValue array
        if (this.selectedStatus?.length && !this.selectedStatus?.includes(item.couponStatus[0])) {
          return false;
        }
        // If the item passed both filters, return true
        return true;
      });
    } else {
      this.filteredData = [];
      this.dataSource.data = this.couponsListData;
    }

  }
}
