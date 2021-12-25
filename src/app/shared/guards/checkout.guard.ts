import {Injectable, OnDestroy} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import {first, map, Observable, Subject} from "rxjs";
import {ShoppingListService} from "../../services/shopping-list/shopping-list.service";

@Injectable({
  providedIn: 'root'
})
export class CheckoutGuard implements CanActivate, OnDestroy {
  unsub: Subject<void>;

  constructor(private router: Router, private shoppingListService: ShoppingListService) {
    this.unsub = new Subject();
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.shoppingListService.shoppingListReady.asObservable().pipe(map(() => {
      if (this.shoppingListService.getTotalSum() === 0) {
        alert('Cannot open checkout page for empty shopping-cart');
        this.router.navigate(['shopping-list']);
        return false;
      }
      return true;
    })
    )
  }

  ngOnDestroy() {
    this.unsub.next()
  }
}
