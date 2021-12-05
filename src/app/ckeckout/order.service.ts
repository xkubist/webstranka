import {Injectable} from "@angular/core";
import {Order} from "./models/order.model";
import {OrderStorageService} from "./order.storage.service";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private orderStorageService: OrderStorageService) {
  }
  private _order: Order
  get order(): Order {
    return this._order;
  }

  set order(order: Order) {
    if(order) {
      this._order=order;
    }
  }

  storeOrder(): void {
    this.orderStorageService.storeOrder(this.order);
  }
}
