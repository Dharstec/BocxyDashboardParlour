import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { MaterialModule } from "../material.module";
import { SharedModule } from "../shared-module/shared.module";
import { AddProductComponent } from "./add-product/add-product.component";
import { InventoryListComponent } from "./inventory-list/inventory-list.component";
import { InventoryComponent } from "./inventory.component";

const routes: Routes = [
    {
        path: '',
        component: InventoryComponent,
        children: [
            { path: 'list', component: InventoryListComponent },
            { path: 'add', component: AddProductComponent },
            { path: 'edit/:id', component: AddProductComponent },
            { path: 'view/:id', component: AddProductComponent }

        ]
    }
]

@NgModule({
    declarations: [InventoryComponent, InventoryListComponent, AddProductComponent],
    imports: [CommonModule,MaterialModule, ReactiveFormsModule, RouterModule.forChild(routes)],
    exports: []
})

export class InventoryModule { }