import {ShoppingItemModel} from "./shopping-item.model";

export interface Order {
  name: string;
  email: string;
  number: string;
  payment: Payment;
  delivery: Delivery;
  shoppingCart: ShoppingItemModel[]
}

export enum Payment {
  CASH = 'cash',
  CARD = 'card'
}

export enum Delivery {
  PPL= 'ppl',
  PERSONAL = 'personal'
}
