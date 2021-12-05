import {CartItem} from "./cart-item.model";

export class Order{
  name: string;
  email: string;
  number: string;
  payment: Payment;
  delivery: Delivery;
  shoppingCart: CartItem[]
}

export enum Payment {
  CASH = 'cash',
  TRANSACTION = 'transaction',
  CARD = 'card'
}

export enum Delivery {
  PPL= 'ppl',
  PERSONAL = 'personal'
}
