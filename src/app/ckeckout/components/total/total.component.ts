import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShoppingListService} from "../../../shopping-list/shopping-list.service";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-total',
  templateUrl: './total.component.html',
  styleUrls: ['./total.component.css']
})
export class TotalComponent implements OnInit, OnDestroy {
  total: number;
  subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.shoppingListReady$.subscribe(() =>
      this.total = this.shoppingListService.getTotalSum()
    )
  }

  ngOnDestroy():void {
    this.subscription.unsubscribe();
  }

}
