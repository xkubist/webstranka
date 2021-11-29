import {RouterModule, Routes} from "@angular/router";
import {ShopComponent} from "./shop.component";
import {EditModalComponent} from "./edit-modal/edit-modal.component";
import {EditGuard} from "../shared/guards/edit.guard";
import {NgModule} from "@angular/core";


const routes: Routes = [
  {
    path: 'browse', component: ShopComponent, children: [
      {path: ':id/edit',component: EditModalComponent}, //canActivate: [EditGuard]
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ShopRoutingModule{}
