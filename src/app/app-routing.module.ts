import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";

const routes: Routes = [
  {path: '', redirectTo: 'browse', pathMatch: 'full' },
  {path: 'shopping-cart', component: ShoppingCartComponent}
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
