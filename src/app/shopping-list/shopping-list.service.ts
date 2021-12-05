import {Injectable} from "@angular/core";
import {Bottle} from "../shared/models/bottle.model";
import {ShoppingListStorageService} from "./shopping-list-storage-service";
import {CartItem} from "../ckeckout/models/cart-item.model";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private _shoppingCart: CartItem[];

  set shoppingCart(shoppingCart: CartItem[]) {
    this._shoppingCart = shoppingCart;
  }

  get shoppingCart(): CartItem[] {
    return this._shoppingCart.slice();
  }

  constructor(private shoppingCartStorageService: ShoppingListStorageService) {
  }

  async loadShoppingList(): Promise<void> {
    try {
      this._shoppingCart = await this.shoppingCartStorageService.fetchShoppingList() ?? [];
    } catch (err) {
      console.log(err);
    }
  }

  getTotalSum(): number {
    let totalSum: number = 0;
    for (let entry of this.shoppingCart) {
      totalSum += entry.amount * entry.bottle.price;
    }
    return totalSum;
  }

  storeItemToList(bottle: Bottle, amount: number) {
    if (!bottle || !amount) {
      return; // zries error
    }

    this.pushItemToList(bottle, amount);

    this.shoppingCartStorageService.storeShoppingList(this.shoppingCart);
  }

  private pushItemToList(bottle: Bottle, amount: number) {
    let tmpCartItem: CartItem = this.shoppingCart.find(value => value.bottle.id === bottle.id) ?? new CartItem();
    let index: number = this.shoppingCart.indexOf(tmpCartItem);

    if (index === -1) {
      this._shoppingCart.push({amount, bottle});
    } else {
      this._shoppingCart[index].amount += amount;
    }
  }
}
