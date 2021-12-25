import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";
import {ShoppingItemModel} from "../../checkout/models/shopping-item.model";
import {shoppingListStorageEnvironment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListStorageService {
  constructor(private http: HttpClient) {
  }

  storeShoppingList(cart: ShoppingItemModel[]) {
    this.http.put(shoppingListStorageEnvironment.apiUrl, cart).subscribe();
  }

  fetchShoppingList(): Promise<ShoppingItemModel[]> {
    return lastValueFrom(this.http.get<ShoppingItemModel[]>(shoppingListStorageEnvironment.apiUrl));
  }
}
