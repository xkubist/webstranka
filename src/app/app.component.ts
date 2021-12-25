import {Component, OnInit} from '@angular/core';
import {BottlesService} from "./services/shop/bottles.service";
import {ShoppingListService} from "./services/shopping-list/shopping-list.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'webstranka';

  constructor(private bottleService: BottlesService,
              private shoppingListService: ShoppingListService,) {
  }
  async ngOnInit(): Promise<void> {
    try {
      await this.bottleService.loadBottles();
      await this.shoppingListService.loadShoppingList();
    } catch (e) {
      alert(e);
    } finally {
    }
  }
}
