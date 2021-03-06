import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ShoppingListService} from "../services/shopping-list/shopping-list.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-my-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy{
  total: number;
  loading: boolean;
  unsub: Subject<void>;
  bottlesForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              public shoppingListService: ShoppingListService) {
    this.total = 0;
    this.loading = false;
    this.unsub = new Subject();
    this.bottlesForm = new FormGroup({
      bottleFormArray: this.formBuilder.array([])
    });
  }

  get bottleFormArray() {
    return this.bottlesForm.get('bottleFormArray') as FormArray;
  }


  ngOnInit(): void {
    this.shoppingListService.shoppingListReady.pipe(takeUntil(this.unsub)).subscribe(() => {
      this.loading = true;
      this.loadForm();
      this.total = this.getTotal();
      this.loading = false;
    })
    this.bottleFormArray.valueChanges.pipe(takeUntil(this.unsub)).subscribe(
      (value: { amount: number }[]) => this.updateForm(value)
    );
  }

  removeShoppingItem(index: number): void {
    this.shoppingListService.removeItemFromList(index);
    this.bottleFormArray.removeAt(index);
  }

  private getTotal(): number {
    return this.shoppingListService.getTotalSum();
  }

  private updateForm(amounts: { amount: number }[]): void {
    for (let index = 0; index < amounts.length; index++) {
      if (amounts[index].amount === 0) {
        this.removeShoppingItem(index)
      } else {
        this.shoppingListService.updateAmount(index, amounts[index].amount);
      }
    }
    this.total = this.getTotal();
  }


  private loadForm(): void {
    Object.keys(this.shoppingListService.shoppingList).forEach((i) => {
      this.bottleFormArray.push(
        this.formBuilder.group({
          amount: [this.shoppingListService.shoppingList[+i].amount, Validators.required]
        })
      )
    })
  }

  toCheckout(): void {
    this.router.navigate(["../checkout"]);
  }

  ngOnDestroy(): void {
    this.unsub.next();
  }
}
