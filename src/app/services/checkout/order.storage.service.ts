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
    lastValueFrom(this.http.put(orderStorageEnvironment.apiUrl, order));
  }

  fetchOrder(): Promise<Order> {
    return lastValueFrom(this.http.get<Order>(orderStorageEnvironment.apiUrl));
  }
}
