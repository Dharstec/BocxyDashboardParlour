import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmDialogComponent } from 'src/app/shared-module/confirm-dialog/confirm-dialog.component';
import { SnackbarComponent } from 'src/app/shared-module/snackbar/snackbar.component';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent implements OnInit {
  dataSource = new MatTableDataSource<any>([]);
  columnsToDisplay = ['id', 'category', 'Formulation', 'name', 'in_stock', 'action'];

  catagoryList = [
    "Haircare products",
    "Skincare products",
    "Nailcare products",
    "Cosmetics",
    "Makeup",
    "Fragrance",
    "Serums",
    "Sunscreens"];
  colorList = [
    "Liquid",
    "Stick",
    "Cream",
    "Balm",
    "Gel"  
  ]
  inStock = [
    "Less than 10",
    "Less than 50",
    "More than 100",
  ]
  selectedValue: any;
  selectedColourValue: any;
  selectedStockValue: any
  filteredData: any[];
  inventoryList: any;
  originalData: any[];
  noData=false;

  constructor(private api: ApiService,public dialog: MatDialog, private snackbar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.getInventoryList();
  }

  edit(type,id) {
    this.router.navigate(['/inventory/'+type, id]);
  }

  getInventoryList(): void {
    this.api.apiGetCall('inventory/getInventoryProduct'+'/'+localStorage.getItem('storeId')).subscribe((data) => {
      this.inventoryList = data.data;
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

        this.api.apiDeleteCall(id, 'inventory/deleteInventoryProduct').subscribe(response => {
          if (response.message.includes('Successfully')) {
            this.snackbar.openFromComponent(SnackbarComponent, {
              data: response.message,
            });
            this.getInventoryList();
          }
        })
      }
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyTypeFilter() {
  if(this.selectedColourValue?.length || this.selectedValue?.length){
    this.filteredData = this.dataSource.data.filter(item => {
      // Check if the item's category is included in the selectedValue array
      if (this.selectedValue?.length && !this.selectedValue?.includes(item.category[0])) {
        return false;
      }
      // Check if the item's colour is included in the selectedColourValue array
      if (this.selectedColourValue?.length && !this.selectedColourValue?.includes(item.colour[0])) {
        return false;
      }
      // If the item passed both filters, return true
      return true;
    });
  }else{
    this.filteredData=[];
    this.dataSource.data=this.inventoryList;
  }
}
}
