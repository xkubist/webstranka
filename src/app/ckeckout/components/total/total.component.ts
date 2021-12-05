import { Component, OnInit } from '@angular/core';
import {ShoppingListService} from "../../../shopping-list/shopping-list.service";


@Component({
  selector: 'app-total',
  templateUrl: './total.component.html',
  styleUrls: ['./total.component.css']
})
export class TotalComponent {
  total: number;

  constructor(private shoppingListService: ShoppingListService) {
  }

  async ngOnInit(): Promise<void> {
    try{
      await this.shoppingListService.loadShoppingList();
      this.total= this.shoppingListService.getTotalSum();
    }catch (e) {
      console.log(e);
    }
  }

}
