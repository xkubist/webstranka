import {ShoppingItem} from "./cart-item.model";

export class Order{
  name: string;
  email: string;
  number: string;
  payment: Payment;
  delivery: Delivery;
  shoppingCart: ShoppingItem[]
}

export enum Payment {
  CASH = 'cash',
  CARD = 'card'
}

export enum Delivery {
  PPL= 'ppl',
  PERSONAL = 'personal'
}
