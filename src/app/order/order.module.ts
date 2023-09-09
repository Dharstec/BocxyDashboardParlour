import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderComponent } from './order.component';
import { OrderListComponent } from './order-list/order-list.component';
import { SharedModule } from '../shared-module/shared.module';

const routes:Routes=[
  {path:'',
  component:OrderComponent,
  children:[
    {path:'list',component:OrderListComponent},
  ]
  }
]

@NgModule({
  declarations: [OrderComponent,OrderListComponent],
  imports: [
    CommonModule,MaterialModule,RouterModule.forChild(routes),ReactiveFormsModule,SharedModule
  ]
})
export class OrderModule { }
