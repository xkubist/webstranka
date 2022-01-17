import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";
import {ShoppingItemModel} from "../../checkout/models/shopping-item.model";
import {shoppingListStorageEnvironment} from "src/environments/environment";



@Injectable({
  providedIn: 'root'
})
export class ShoppingListStorageService {
  constructor(private http: HttpClient) {
  }

  storeShoppingList(cart: ShoppingItemModel[]) {
    lastValueFrom(this.http.put(shoppingListStorageEnvironment.apiUrl, cart));
  }

  fetchShoppingList(): Promise<ShoppingItemModel[]> {
    return lastValueFrom(this.http.get<ShoppingItemModel[]>(shoppingListStorageEnvironment.apiUrl));
  }
}
