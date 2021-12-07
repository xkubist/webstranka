import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import {Observable} from "rxjs";
import {ShoppingListService} from "../../shopping-list/shopping-list.service";

@Injectable({
  providedIn: 'root'
})
export class CheckoutGuard implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.shoppingListService.getTotalSum() === 0) {
      console.log('false');
      this.router.navigate(['browse']);
      return false;
    }
    console.log('true')
    return true;
  }
  constructor(private router: Router, private shoppingListService: ShoppingListService) { }
}
