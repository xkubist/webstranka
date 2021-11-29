import {Component, OnInit} from '@angular/core';
import {Bottle} from "../../../shared/models/bottle.model";
import {ShoppingCartService} from "../../../shopping-cart/shopping-cart.service";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BottlesService} from "../../bottles.service";
import {last} from "rxjs";
import {ShoppingCartStorageService} from "../../../shopping-cart/shopping-cart-storage-service";

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

  constructor(private formBuilder: FormBuilder,
              private bottleService: BottlesService,
              private shoppingCartService: ShoppingCartService) {
  }

  buildForm() {
    Object.keys(this.bottles).forEach((i) => {
      this.bottleFormArray.push(
        this.formBuilder.group({
          amount: [1, Validators.required]
        })
      )
    })
  }

  get bottleFormArray() {
    return this.bottlesForm.get('bottleFormArray') as FormArray;
  }

  async ngOnInit(): Promise<void> {
    try{
      await this.shoppingCartService.loadShoppingCart();
      await this.bottleService.loadBottles();
      this.bottles=this.bottleService.bottles
      console.log('bottles' + this.bottleService.bottles);
      this.buildForm();
    } catch (e) {
      console.log(e);
    }
  }

  addToCart(index: number) {
    this.shoppingCartService.pushItemToCart(this.bottles[index], this.bottleFormArray.controls[index].get('amount')?.value);
  }
}
