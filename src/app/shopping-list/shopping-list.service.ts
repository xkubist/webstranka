import {Injectable} from "@angular/core";
import {Bottle} from "../shared/models/bottle.model";
import {ShoppingListStorageService} from "./shopping-list-storage-service";
import {ShoppingItem} from "../ckeckout/models/shopping-item.model";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private _shoppingList: ShoppingItem[];
  public shoppingListReady: BehaviorSubject<null>;
  public shoppingListReady$: Observable<null>;

  set shoppingList(shoppingCart: ShoppingItem[]) {
    this._shoppingList = shoppingCart;
  }

  get shoppingList(): ShoppingItem[] {
    return JSON.parse(JSON.stringify(this._shoppingList)) as ShoppingItem[];
  }

  constructor(private shoppingCartStorageService: ShoppingListStorageService) {
    this.shoppingListReady = new BehaviorSubject(null);
    this.shoppingListReady$ = this.shoppingListReady.asObservable();
  }

  async loadShoppingList(): Promise<void> {
    this._shoppingList = await this.shoppingCartStorageService.fetchShoppingList() ?? [];
    this.shoppingListReady.next(null);
  }

  getTotalSum(): number {
    let totalSum: number = 0;
    for (let entry of this._shoppingList) {
      totalSum += entry.amount * entry.bottle.price;
    }
    return totalSum;
  }

  storeItemToList(bottle: Bottle, amount: number): void {
    if (!bottle || !amount) {
      return; // zries error
    }

    let index = this.getBottleId(bottle);

    if (index === -1) {
      this._shoppingList.push({amount, bottle});
    } else {
      this._shoppingList[index].amount += amount;
    }

    this.shoppingCartStorageService.storeShoppingList(this._shoppingList);
  }

  removeItemFromList(index: number): void {
    this._shoppingList.splice(index, 1);

    this.shoppingCartStorageService.storeShoppingList(this._shoppingList);
  }

  updateAmount(index: number, amount: number): void {
    this._shoppingList[index].amount=amount;
  }

  private getBottleId(bottle: Bottle) {
    let tmpCartItem: ShoppingItem = this._shoppingList.find(value => value.bottle.id === bottle.id) ?? new ShoppingItem();
    let index: number = this._shoppingList.indexOf(tmpCartItem);
    return index;
  }
}
