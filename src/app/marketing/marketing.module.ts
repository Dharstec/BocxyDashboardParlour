import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketingAddEditComponent } from './marketing-add-edit/marketing-add-edit.component';
import { MarketingListComponent } from './marketing-list/marketing-list.component';
import { MaterialModule } from '../material.module';
import { MarketingComponent } from './marketing.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared-module/shared.module';

const routes:Routes=[
  {path:'',
  component:MarketingComponent,
  children:[
    {path:'list',component:MarketingListComponent},
    {path:'add',component:MarketingAddEditComponent},
    {path:'view/:id',component:MarketingAddEditComponent}
  ]
  }
]

@NgModule({
  declarations: [MarketingComponent,MarketingListComponent,MarketingAddEditComponent],
  imports: [
    CommonModule,MaterialModule,RouterModule.forChild(routes),ReactiveFormsModule,SharedModule
  ]
})
export class MarketingModule { }
