import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OrderService} from "../services/checkout/order.service";
import {ShoppingListService} from "../services/shopping-list/shopping-list.service";
import {Subject, takeUntil} from "rxjs";
import {ShoppingItemModel} from "./models/shopping-item.model";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  form: FormGroup;
  shoppingList: ShoppingItemModel[];
  total: number;
  private unsub: Subject<void>;

  constructor(private fb: FormBuilder, private orderService: OrderService, private shoppingListService: ShoppingListService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['',[Validators.required, Validators.pattern("[0-9 ]{9}")]],
      delivery: ['', Validators.required],
      payment: ['',Validators.required]
    })
    this.unsub = new Subject();
  }

  ngOnInit(): void {
    this.shoppingListService.shoppingListReady.pipe(takeUntil(this.unsub)).subscribe(() =>
      this.shoppingList = this.shoppingListService.shoppingList
    )
    this.total = this.shoppingListService.getTotalSum()
  }

  onSubmit(): void {
    console.log(this.form);
    this.orderService.order=this.form.value
    this.orderService.order.shoppingCart=this.shoppingList;
    this.orderService.storeOrder();
    alert('Order Has Ben Sent');
  }

  onNgDestroy(): void{
    this.unsub.next();
  }
}
