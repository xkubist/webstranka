import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CheckoutComponent} from "./checkout.component";
import {TotalComponent} from "./components/total/total.component";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {DeliveryComponent} from "./components/delivery/delivery.component";
import {PaymentComponent} from "./components/payment/payment.component";

@NgModule({
  declarations: [
    CheckoutComponent,
    TotalComponent,
    DeliveryComponent,
    PaymentComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class CheckoutModule { }
