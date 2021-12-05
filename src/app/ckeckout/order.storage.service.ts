import {Injectable} from "@angular/core";
import {lastValueFrom} from "rxjs";
import {Order} from "./models/order.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OrderStorageService {
  private readonly ORDER_WEB_ADDRESS: string = 'https://webstranka-45787-default-rtdb.europe-west1.firebasedatabase.app/order.json';

  constructor(private http: HttpClient) {
  }
  storeOrder(order: Order) {
    this.http.put(this.ORDER_WEB_ADDRESS, order).subscribe(
      res => console.log('HTTP response', res),
      err => console.log('HTTP Error', err),
      () => console.log('HTTP request completed.')
    )
  }

  fetchOrder(): Promise<Order> {
    return lastValueFrom(this.http.get<Order>(this.ORDER_WEB_ADDRESS));
  }
}
