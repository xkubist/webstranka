import {RouterModule, Routes} from "@angular/router";
import {ShopComponent} from "./shop.component";
import {EditModalComponent} from "./edit-modal/edit-modal.component";
import {NgModule} from "@angular/core";
import {ListComponent} from "./components/list/list.component";


const routes: Routes = [
  {
    path: 'browse', component: ShopComponent, children: [
      {path: '', component: ListComponent},
      {path: 'create',component: EditModalComponent},
      {path: ':id/edit',component: EditModalComponent}, //canActivate: [EditGuard]
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ShopRoutingModule{}
