import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Bottle} from "../../shared/models/bottle.model";
import {BottlesService} from "../bottles.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subject, takeUntil} from "rxjs";

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

  constructor(private fb: FormBuilder, private bottleService: BottlesService, private route: ActivatedRoute, private router: Router) {
    this.form = this.fb.group({
      bottleName: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      imagePath: ['', Validators.required]
    })
    this.unsub = new Subject();
  }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.unsub)).subscribe((p) => {
      this.bottleId = +p['id'];
      this.editMode = p['id'] != null;
    });
    this.bottleService.bottlesReady$.pipe(takeUntil(this.unsub)).subscribe(() => {
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
    } else {
      this.bottleService.pushBottle(this.bottle);
    }
    this.bottleService.saveBottles();
    this.router.navigate(['create'], {relativeTo: this.route});
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
