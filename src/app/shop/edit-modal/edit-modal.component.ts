import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Bottle} from "../../shared/models/bottle.model";
import {BottlesService} from "../../services/shop/bottles.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {ShoppingListService} from "../../services/shopping-list/shopping-list.service";

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements OnInit, OnDestroy {

  bottle: Bottle;
  bottleId: number;
  editMode: boolean;

  form: FormGroup;
  unsub: Subject<void>;

  constructor(private fb: FormBuilder, private bottleService: BottlesService, private shoppingListService: ShoppingListService, private route: ActivatedRoute, private router: Router) {
    this.form = this.fb.group({
      bottleName: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, Validators.required],
      imagePath: ['', Validators.required]
    })
    this.unsub = new Subject();
  }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.unsub)).subscribe((p) => {
      this.editMode = p['id'] != null;
      if(this.editMode) {
        this.bottleId = +p['id'];
      }
    });
    this.bottleService.bottlesReady.pipe(takeUntil(this.unsub)).subscribe(() => {
      if (this.editMode) {
        this.bottle = this.bottleService.bottles.find(s => s.id === this.bottleId) ?? new Bottle();
        this.loadForm(this.bottle);
      }
    })

  }

  onSubmit(): void {
    this.bottle = this.form.value;
    if (this.editMode) {
      this.bottle.id = this.bottleId;
      this.bottleService.updateBottle(this.bottle);
      this.shoppingListService.updateBottle(this.bottle);
    } else {
      this.bottleService.pushBottle(this.bottle);
    }
    this.bottleService.saveBottles();
    this.router.navigate(['browse']);
  }

  ngOnDestroy() {
    this.unsub.next();
  }

  private loadForm(bottle: Bottle) {
    this.form = this.fb.group({
      bottleName: [this.bottle.bottleName, Validators.required],
      description: [this.bottle.description, Validators.required],
      price: [this.bottle.price, Validators.required],
      imagePath: [this.bottle.imagePath, Validators.required]
    })
  }
}
