import {Injectable} from "@angular/core";
import {Bottle} from "../shared/models/bottle.model";
import {CartItem} from "./models/cart-item.model";
import {Order} from "./models/order.model";
import {ShoppingCartStorageService} from "./shopping-cart-storage-service";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private _order:Order;
  private _shoppingCart: CartItem[];

  set shoppingCart(shoppingCart: CartItem[]) {
    this._shoppingCart = shoppingCart;
  }

  get shoppingCart(): CartItem[] {
    return this._shoppingCart.slice();
  }

  constructor(private shoppingCartStorageService: ShoppingCartStorageService) {
  }

  async loadShoppingCart(): Promise<void> {
    try{
      this._shoppingCart = await this.shoppingCartStorageService.fetchOrder();
    } catch(err) {
      console.log(err);
    }
  }
  getTotalSum(): number {
    let totalSum: number = 0;
    for (let entry of this._shoppingCart) {
        totalSum+=entry.amount*entry.bottle.price;
      }
      return totalSum;
  }

  pushItemToCart( bottle: Bottle, amount: number) {
    if (!bottle || !amount) {
      return; // zries error
    }

    for (let entry of this._shoppingCart) {
      if (entry.bottle.id === bottle.id) {
        entry.amount+=amount;
        return
      }
    }
    this._shoppingCart.push({amount,bottle});
  }

  get order(): Order {
    return this._order;
  }

  set order(order: Order) {
    if(order) {
      this._order=order;
    }
  }
}
