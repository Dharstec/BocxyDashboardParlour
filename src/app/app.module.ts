import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { InventoryComponent } from './dashboard/inventory/inventory.component';
import { AddproductComponent } from './dashboard/inventory/addproduct/addproduct.component';
import { OrderComponent } from './dashboard/inventory/order/order.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogAddproductComponent } from './dashboard/inventory/addproduct/dialog-addproduct/dialog-addproduct.component';
import { SearchPipe, orderSearchPipe } from './search.pipe';
import { DialogOrderstatusComponent } from './dashboard/inventory/order/dialog-orderstatus/dialog-orderstatus.component';
import { MaterialModule } from './material.module';
import { SidenavComponent } from './navbar/sidenav/sidenav.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { BodyComponent } from './body/body.component';
import { HeadersComponent } from './headers/headers.component';
import { SharedModule } from './shared-module/shared.module';
import { SplashScreenModule } from './splash-screen/splash-screen.module';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    InventoryComponent,
    AddproductComponent,
    OrderComponent,
    DialogAddproductComponent,
    SearchPipe,
    orderSearchPipe,
    DialogOrderstatusComponent,
    SidenavComponent,
    AnalyticsComponent,
    BodyComponent,
    HeadersComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,SplashScreenModule
  ],

  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
