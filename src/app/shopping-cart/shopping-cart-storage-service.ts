import {Injectable} from "@angular/core";
import {CartItem} from "./models/cart-item.model";
import {HttpClient} from "@angular/common/http";
import {Order} from "./models/order.model";
import {lastValueFrom, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartStorageService {
  constructor(private http: HttpClient) {
  }
 // //prerob
  storeOrder(cart: CartItem[]) {
    this.http.put('https://webstranka-45787-default-rtdb.europe-west1.firebasedatabase.app/order.json', cart).subscribe(
      res => console.log('HTTP response', res),
      err => console.log('HTTP Error', err),
      () => console.log('HTTP request completed.')
    )
  }

  fetchOrder(): Promise<CartItem[]> {
    return lastValueFrom(this.http.get<CartItem[]>('https://webstranka-45787-default-rtdb.europe-west1.firebasedatabase.app/order.json'));
  }
}
