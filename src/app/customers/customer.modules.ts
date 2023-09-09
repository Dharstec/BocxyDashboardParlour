import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared-module/shared.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomersComponent } from './customers.component';

const routes:Routes=[
  {path:'',
  component:CustomersComponent,
  children:[
    {path:'list',component:CustomerListComponent},
  ]
  }
]

@NgModule({
  declarations: [CustomersComponent,CustomerListComponent],
  imports: [
    CommonModule,MaterialModule,RouterModule.forChild(routes),ReactiveFormsModule,SharedModule
  ]
})
export class CustomersModule { }
