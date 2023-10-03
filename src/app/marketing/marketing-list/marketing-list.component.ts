import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmDialogComponent } from 'src/app/shared-module/confirm-dialog/confirm-dialog.component';
import { SnackbarComponent } from 'src/app/shared-module/snackbar/snackbar.component';

@Component({
  selector: 'app-marketing-list',
  templateUrl: './marketing-list.component.html',
  styleUrls: ['./marketing-list.component.scss']
})
export class MarketingListComponent implements OnInit {
  dataSource = new MatTableDataSource<any>([]);
  columnsToDisplay = ['name', 'customer', 'sentVia', 'ending', 'action'];
  sentVia = [
    { label: 'Email', value: 'email' },
    { label: 'SMS', value: 'sms' },
    { label: 'Whatsapp', value: 'whatsApp' },
  ];
  selectedValue: any;
  marketingData: any;
  noData=false;

  constructor(private api: ApiService, public dialog: MatDialog, private router: Router,private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.getMarketList();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyTypeFilter() {
    if (this.selectedValue && this.selectedValue.length) {
      this.dataSource.data = this.marketingData.filter((item) => {
        return this.selectedValue.some((option) => {
          return item.sendVia.indexOf(option) !== -1;
        });
      });
    } else {
      this.dataSource.data = this.marketingData;
    }
  }
  viewMarket(id: string): void {
    this.router.navigate(['/marketing/view', id]);
  }
  getMarketList(): void {
    this.api.apiGetCall('marketing/getAllMarketing').subscribe((data) => {
      this.marketingData = data.data;
      this.dataSource.data = data.data.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
      if(!data.data?.length){
        this.noData=true;
      }
    })
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
       
        this.api.apiDeleteCall(id, 'marketing/deleteMarketing').subscribe(response => {
          if (response.message === 'Delete Marketing Successfully') {
            this.snackbar.openFromComponent(SnackbarComponent, {
              data: response.message,
            });
           this.getMarketList();
          }
        })
      }
    })
  }

}
