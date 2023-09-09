import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-dialog-orderstatus',
  templateUrl: './dialog-orderstatus.component.html',
  styleUrls: ['./dialog-orderstatus.component.scss']
})
export class DialogOrderstatusComponent implements OnInit {
  orderStatus: any;
row:any;
  dialog: any;
  constructor( @Inject(MAT_DIALOG_DATA) public data:any,private api: ApiService,) { 

  }

  ngOnInit(): void {
    console.log("order status",this.data);
    this.orderStatus = this.data.orderStatus
console.log("order status dialog popup");
    
  }
  // updateStatus(){

  // }
  updateStatus(){
    let body={
      "_id":this.data._id,
      "orderStatus":"dispatch"
    }  
    this.api.updateOrderData(body).subscribe((result:any)=>{
      console.log(result);
      this.dialog.close();
      // alert(" order status updated succesfully");
      // window.location.reload()
      
    })
  }
}


