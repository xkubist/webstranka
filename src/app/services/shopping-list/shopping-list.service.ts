import {Injectable} from "@angular/core";
import {Bottle} from "../../shared/models/bottle.model";
import {ShoppingListStorageService} from "./shopping-list-storage-service";
import {ShoppingItemModel} from "../../checkout/models/shopping-item.model";
import {ReplaySubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  public shoppingList: ShoppingItemModel[];
  public shoppingListReady: ReplaySubject<void>;

  constructor(private shoppingCartStorageService: ShoppingListStorageService) {
    this.shoppingListReady = new ReplaySubject();
  }

  async loadShoppingList(): Promise<void> {
    this.shoppingList = await this.shoppingCartStorageService.fetchShoppingList() ?? [];
    this.shoppingListReady.next();
  }

  getTotalSum(): number {
    let totalSum: number = 0;
    for (let entry of this.shoppingList) {
      totalSum += entry.amount * entry.bottle.price;
    }
    return totalSum;
  }

  storeItemToList(shoppingItem: ShoppingItemModel): void {
    if (!shoppingItem) {
      alert('Shopping item argument should not be empty');
      return;
    }

    let index = this.getBottleId(shoppingItem.bottle);

    if (index === -1) {
      this.shoppingList.push(shoppingItem);
    } else {
      this.shoppingList[index].amount += shoppingItem.amount;
    }

    this.shoppingCartStorageService.storeShoppingList(this.shoppingList);
  }

  removeItemFromList(index: number): void {
    this.shoppingList.splice(index, 1);

    this.shoppingCartStorageService.storeShoppingList(this.shoppingList);
  }

  updateAmount(index: number, amount: number): void {
    this.shoppingList[index].amount=amount;
  }

  updateBottle(bottle: Bottle): void {
    let item = this.shoppingList.find((item:ShoppingItemModel) => item.bottle.id === bottle.id);
    if (!item){
      alert('Bottle is not in shopping cart');
      return;
    }
    item.bottle=bottle;
  }

  private getBottleId(bottle: Bottle) {
    let tmpCartItem: ShoppingItemModel = this.shoppingList.find(value => value.bottle.id === bottle.id) ?? new ShoppingItemModel();
    let index: number = this.shoppingList.indexOf(tmpCartItem);
    return index;
  }
}
