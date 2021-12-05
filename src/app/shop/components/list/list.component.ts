import {Component, OnInit} from '@angular/core';
import {Bottle} from "../../../shared/models/bottle.model";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BottlesService} from "../../bottles.service";
import {ShoppingListService} from "../../../shopping-list/shopping-list.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{

  bottles: Bottle[];

  bottlesForm: FormGroup = new FormGroup({
    bottleFormArray: this.formBuilder.array([])
  });
  loading: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private bottleService: BottlesService,
              private shoppingListService: ShoppingListService,
              private router: Router,
              private route: ActivatedRoute) {
  }



  get bottleFormArray() {
    return this.bottlesForm.get('bottleFormArray') as FormArray;
  }

  async ngOnInit(): Promise<void> {
    this.loading = true;
    try{
      await this.bottleService.loadBottles();
      await this.shoppingListService.loadShoppingList();
      this.bottles=this.bottleService.bottles
      this.buildForm();
    } catch (e) {
      console.log(e);
    } finally {
      this.loading=false;
    }
  }

  addToCart(index: number): void {
    this.shoppingListService.storeItemToList(this.bottles[index], this.bottleFormArray.controls[index].get('amount')?.value);
  }

  editItem(index: number): void  {
    this.router.navigate([index,'edit'], {relativeTo: this.route});
  }

  private buildForm(): void {
    Object.keys(this.bottles).forEach((i) => {
      this.bottleFormArray.push(
        this.formBuilder.group({
          amount: [1, Validators.required]
        })
      )
    })
  }
}
