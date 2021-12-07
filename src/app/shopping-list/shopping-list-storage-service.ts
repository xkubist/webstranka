import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";
import {ShoppingItem} from "../ckeckout/models/shopping-item.model";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListStorageService {
  private readonly SHOPPING_LIST_WEB_ADDRESS = 'https://webstranka-45787-default-rtdb.europe-west1.firebasedatabase.app/shoppingList.json';
  constructor(private http: HttpClient) {
  }

  storeShoppingList(cart: ShoppingItem[]) {
    this.http.put(this.SHOPPING_LIST_WEB_ADDRESS, cart).subscribe();
  }

  fetchShoppingList(): Promise<ShoppingItem[]> {
    return lastValueFrom(this.http.get<ShoppingItem[]>(this.SHOPPING_LIST_WEB_ADDRESS));
  }
}
