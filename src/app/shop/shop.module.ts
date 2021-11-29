import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ShopRoutingModule} from "./shop-routing.module";
import {ShopComponent} from "./shop.component";
import {EditModalComponent} from "./edit-modal/edit-modal.component";
import {ListComponent} from "./components/list/list.component";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    ShopComponent,
    EditModalComponent,
    ListComponent],
  imports: [
    CommonModule,
    ShopRoutingModule,
    ReactiveFormsModule
  ]
})
export class ShopModule { }
