import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import {Observable} from "rxjs";
import {ShoppingCartService} from "../../shopping-cart/shopping-cart.service";

@Injectable({
  providedIn: 'root'
})
export class PaymentAndDeliveryGuard implements CanActivate {
  private readonly EXPECTED_URL = '/shopping-list/payment-and-delivery';

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.scService.getTotalSum() === 0) {
      console.log('false');
      this.router.navigate(['browse']);
      return false;
    }
    console.log('true')
    return true;
  }
  constructor(private router: Router, private scService: ShoppingCartService) { }
}
