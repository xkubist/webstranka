import {Injectable} from "@angular/core";
import {lastValueFrom} from "rxjs";
import {Order} from "../../checkout/models/order";
import {HttpClient} from "@angular/common/http";
import {orderStorageEnvironment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class OrderStorageService {
  constructor(private http: HttpClient) {
  }
  storeOrder(order: Order) {
    this.http.put(orderStorageEnvironment.apiUrl, order).subscribe(
      res => console.log('HTTP response', res),
      err => console.log('HTTP Error', err),
      () => console.log('HTTP request completed.')
    )
  }

  fetchOrder(): Promise<Order> {
    return lastValueFrom(this.http.get<Order>(orderStorageEnvironment.apiUrl));
  }
}
