import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BottlesService} from "../../bottles.service";
import {ShoppingListService} from "../../../shopping-list/shopping-list.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, Subscription, takeUntil} from "rxjs";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

  bottlesForm: FormGroup = new FormGroup({
    bottleFormArray: this.formBuilder.array([])
  });
  loading: boolean = false;
  private unsub: Subscription;

  constructor(private formBuilder: FormBuilder,
              public bottleService: BottlesService,
              private shoppingListService: ShoppingListService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  get bottleFormArray() {
    return this.bottlesForm.get('bottleFormArray') as FormArray;
  }

  ngOnInit(): void {

    this.unsub = this.bottleService.bottlesReady$.subscribe(() => {
      this.loading = true;
      this.loadForm();
      this.loading = false;
    })
  }

  addToCart(index: number): void {
    this.shoppingListService.storeItemToList(this.bottleService.bottles[index], this.bottleFormArray.controls[index].get('amount')?.value);
  }

  editItem(index: number): void {
    this.router.navigate([index, 'edit'], {relativeTo: this.route});
  }


  createBottle() {
    this.router.navigate(['create'], {relativeTo: this.route});
    this.bottleFormArray.push(
      this.formBuilder.group({
        amount: [1, Validators.required]
      })
    );
  }

  deleteItem(index: number) {
    this.bottleService.removeBottle(index);

  }

  ngOnDestroy(): void {
    this.unsub.unsubscribe();
  }

  private loadForm(): void {
    this.bottleService.bottles.forEach((i) => {
      this.bottleFormArray.push(
        this.formBuilder.group({
          amount: [1, Validators.required]
        })
      )
    })
  }
}
