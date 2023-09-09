import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CouponsComponent } from './coupons.component';
import { CouponsListComponent } from './coupons-list/coupons-list.component';
import { CouponsAddEditComponent } from './coupons-add-edit/coupons-add-edit.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
const routes:Routes=[
  {path:'',
  component:CouponsComponent,
  children:[
    {path:'list',component:CouponsListComponent},
    {path:'add',component:CouponsAddEditComponent},
    {path:'edit/:id',component:CouponsAddEditComponent},
    {path:'view/:id',component:CouponsAddEditComponent}
  ]
  }
]
@NgModule({
  declarations: [CouponsComponent,CouponsListComponent,CouponsAddEditComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),ReactiveFormsModule
  ]
})
export class CouponsModule { }
