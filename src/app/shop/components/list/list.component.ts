import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BottlesService} from "../../../services/shop/bottles.service";
import {ShoppingListService} from "../../../services/shopping-list/shopping-list.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, Subject, Subscription, takeUntil} from "rxjs";
import {Bottle} from "../../../shared/models/bottle.model";
import {ShoppingItemModel} from "../../../checkout/models/shopping-item.model";

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
  private unsub: Subject<void> = new Subject<void>();

  constructor(private formBuilder: FormBuilder,
              public bottleService: BottlesService,
              private shoppingListService: ShoppingListService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  get bottleFormArray() {
    return this.bottlesForm.get('bottleFormArray') as FormArray;
  }

  get bottleFormArrayValues() {
    return this.bottleFormArray.getRawValue() as ShoppingItemModel[];
  }

  ngOnInit(): void {
    this.bottleService.bottlesReady.pipe(takeUntil(this.unsub)).subscribe(() => {
      this.loading = true;
      this.loadForm();
      this.loading = false;
    })
  }

  addToCart(shoppingItem: ShoppingItemModel): void {
    this.shoppingListService.storeItemToList(shoppingItem);
  }

  editBottle(bottleId: number): void {
    this.router.navigate([bottleId, 'edit'], {relativeTo: this.route});
  }


  createBottle() {
    this.router.navigate(['create'], {relativeTo: this.route});
    this.bottleFormArray.push(
      this.formBuilder.group({
        amount: [1, Validators.required]
      })
    );
  }

  deleteBottle(bottle: Bottle) {
    this.bottleService.removeBottle(bottle);
  }

  ngOnDestroy(): void {
    this.unsub.next();
  }

  private loadForm(): void {
    this.bottleService.bottles.forEach((bottle) => {
      this.bottleFormArray.push(
        this.formBuilder.group({
          bottle: bottle,
          amount: [1, Validators.required]
        })
      )
    })
  }
}
