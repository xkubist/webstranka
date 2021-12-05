import { Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OrderService} from "./order.service";
import {ShoppingListService} from "../shopping-list/shopping-list.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private orderService: OrderService, private shoppingListService: ShoppingListService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['',[Validators.required, Validators.pattern("[0-9 ]{9}")]],
      delivery: ['', Validators.required],
      payment: ['',Validators.required]
    })
  }

  async ngOnInit(): Promise<void> {
    try {
      await this.shoppingListService.loadShoppingList();
    }catch(e){
      console.log(e);
    }
  }

  onSubmit(): void {
    this.orderService.order=this.form.value
    this.orderService.order.shoppingCart=this.shoppingListService.shoppingCart;
    this.orderService.storeOrder();
  }
}
