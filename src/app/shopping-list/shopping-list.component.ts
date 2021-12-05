import {Component} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CartItem} from "../ckeckout/models/cart-item.model";
import {Router} from "@angular/router";
import {ShoppingListService} from "./shopping-list.service";

@Component({
  selector: 'app-my-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {
  total: number = 0;
  loading: boolean = false;
  shoppingCart: CartItem[];
  bottlesForm: FormGroup = new FormGroup({
    bottleFormArray: this.formBuilder.array([])
  });


  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private shoppingListService:ShoppingListService) {
  }

  get bottleFormArray() {
    return this.bottlesForm.get('bottleFormArray') as FormArray;
  }


  async ngOnInit():Promise<void> {
    this.loading=true;
    try {
      await this.shoppingListService.loadShoppingList();
      this.shoppingCart = this.shoppingListService.shoppingCart;
      this.buildForm();
      this.total = this.getTotal();
      this.bottleFormArray.valueChanges.subscribe(
        (value: { amount: number }[]) => this.updateForm(value)
      );
    }catch (e) {
      console.log(e);
    }finally {
      this.loading=false;
    }
  }

  removeBottle(index: number): void {
    this.shoppingCart.splice(index, 1);
    this.bottleFormArray.removeAt(index);
  }

  private getTotal(): number {
    if (!this.shoppingCart) {
      return 0;
    }
    let total: number = 0;
    for (let i = 0; i < this.shoppingCart.length; i++) {
      total += this.shoppingCart[i].bottle.price * this.shoppingCart[i].amount;
    }
    return total;
  }

  private updateForm(amounts: { amount: number }[]): void {
    for (let index = 0; index < amounts.length; index++) {
      if (amounts[index].amount === 0 || !amounts[index].amount) {
        this.removeBottle(index)
      } else {
        this.shoppingCart[index].amount = amounts[index].amount;
      }
    }
    this.total = this.getTotal();
  }


  private buildForm(): void {
    Object.keys(this.shoppingCart).forEach((i) => {
      this.bottleFormArray.push(
        this.formBuilder.group({
          amount: [this.shoppingCart[+i].amount, Validators.required]
        })
      )
    })
  }

  toCheckout() {
    this.router.navigate(["../checkout"]);
  }
}
