import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {ShopModule} from "./shop/shop.module";
import {ShoppingCartModule} from "./shopping-cart/shopping-cart.module";
import {HttpClientModule} from "@angular/common/http";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // AppRoutingModule, //not needed because we are importing it lazy waz using routing
    ShopModule,
    ShoppingCartModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
