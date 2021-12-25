import {Injectable} from "@angular/core";
import {Order} from "../../checkout/models/order";
import {OrderStorageService} from "./order.storage.service";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private orderStorageService: OrderStorageService) {
  }
  public order: Order

  storeOrder(): void {
    this.orderStorageService.storeOrder(this.order);
  }
}
