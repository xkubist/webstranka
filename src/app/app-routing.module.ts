import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {CheckoutComponent} from "./checkout/checkout.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {CheckoutGuard} from "./shared/guards/checkout.guard";

const routes: Routes = [
  {path: '', redirectTo: 'browse', pathMatch: 'full' },
  {path: 'shopping-list', component: ShoppingListComponent},
  {path: 'checkout', component: CheckoutComponent, canActivate: [CheckoutGuard]},
  {path: '**', redirectTo: 'browse', pathMatch: 'full' }
];

@NgModule({
  imports:[RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports:[RouterModule],
})

export class AppRoutingModule { }
