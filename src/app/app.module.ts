import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {ShopModule} from "./shop/shop.module";
import {CheckoutModule} from "./checkout/checkout.module";
import {HttpClientModule} from "@angular/common/http";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {ShoppingListModule} from "./shopping-list/shopping-list.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ShopModule,
    CheckoutModule,
    ShoppingListModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
