import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreAddEditComponent } from './store-add-edit/store-add-edit.component';
import { StoreListComponent } from './store-list/store-list.component';
import { StoreComponent } from './store.component';
const routes:Routes=[
  {path:'',
  component:StoreComponent,
  children:[
    {path:'list',component:StoreListComponent},
    {path:'add',component:StoreAddEditComponent},
    {path:'edit/:id',component:StoreAddEditComponent},
    {path:'view/:id',component:StoreAddEditComponent}
  ]
  }
]
@NgModule({
  declarations: [StoreComponent,StoreListComponent,StoreAddEditComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),ReactiveFormsModule
  ]
})
export class StoreModule { }
