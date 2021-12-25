import {Bottle} from "../../shared/models/bottle.model";

export class ShoppingItemModel {
  bottle: Bottle;
  amount: number;
  constructor() {
    this.bottle = new Bottle();
    this.amount = 0;
  }
}

