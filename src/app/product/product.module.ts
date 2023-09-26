import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product.component';
const routes:Routes=[
  {path:'',
  component:ProductComponent,
  children:[
    {path:'list',component:ProductListComponent},
    {path:'add',component:AddEditProductComponent},
    {path:'edit/:id',component:AddEditProductComponent},
    {path:'view/:id',component:AddEditProductComponent}
  ]
  }
]
@NgModule({
  declarations: [ProductComponent,ProductListComponent,AddEditProductComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),ReactiveFormsModule
  ]
})
export class ProductModule { }
