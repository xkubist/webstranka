import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {CheckoutComponent} from "./ckeckout/checkout.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";

const routes: Routes = [
  {path: '', redirectTo: 'browse', pathMatch: 'full' },
  {path: 'shopping-list', component: ShoppingListComponent},
  {path: 'checkout', component: CheckoutComponent}
  // {path: 'browse',
  //   loadChildren:  () => import('./shop/shop-routing.module')
  //     .then(m => m.ShopRoutingModule)},
  // {path: 'shopping-list',
  //   loadChildren:  () => import('./shopping-cart/shopping-cart-routing.module') //lazy loading
  //     .then(m => m.ShoppingCartRoutingModule)},
  //{path: '**', redirectTo: 'browse', pathMatch: 'full' }, fox this
];

@NgModule({
  imports:[RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports:[RouterModule],
})

export class AppRoutingModule { }
