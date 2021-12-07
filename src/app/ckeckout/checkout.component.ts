import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OrderService} from "./order.service";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {Subscription} from "rxjs";
import {ShoppingItem} from "./models/cart-item.model";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  form: FormGroup;
  subscription: Subscription;
  shoppingList: ShoppingItem[];

  constructor(private fb: FormBuilder, private orderService: OrderService, private shoppingListService: ShoppingListService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['',[Validators.required, Validators.pattern("[0-9 ]{9}")]],
      delivery: ['', Validators.required],
      payment: ['',Validators.required]
    })
  }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.shoppingListReady$.subscribe(() =>
      this.shoppingList = this.shoppingListService.shoppingList
    )
  }

  onSubmit(): void {
    this.orderService.order=this.form.value
    this.orderService.order.shoppingCart=this.shoppingList;
    this.orderService.storeOrder();
  }

  onNgDestroy(): void{
    this.subscription.unsubscribe();
  }
}
