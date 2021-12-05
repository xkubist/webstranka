import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";
import {CartItem} from "../ckeckout/models/cart-item.model";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListStorageService {
  private readonly SHOPPING_LIST_WEB_ADDRESS = 'https://webstranka-45787-default-rtdb.europe-west1.firebasedatabase.app/shoppingList.json';
  constructor(private http: HttpClient) {
  }

  storeShoppingList(cart: CartItem[]) {
    this.http.put(this.SHOPPING_LIST_WEB_ADDRESS, cart).subscribe();
  }

  fetchShoppingList(): Promise<CartItem[]> {
    return lastValueFrom(this.http.get<CartItem[]>(this.SHOPPING_LIST_WEB_ADDRESS));
  }
}
