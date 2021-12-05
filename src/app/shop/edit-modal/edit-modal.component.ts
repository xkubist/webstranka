import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Bottle} from "../../shared/models/bottle.model";
import {BottlesService} from "../bottles.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent {

  bottle: Bottle;
  bottleId: number;
  editMode: boolean;

  form: FormGroup;

  constructor(private fb: FormBuilder, private bottleService: BottlesService, private route: ActivatedRoute) {
    this.form = this.fb.group({
      bottleName: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      imagePath: ['', Validators.required]
    })
  }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe((p) => {
      this.bottleId = +p['id'];
      this.editMode = p['id'] != null;
    });
    try {
      await this.bottleService.loadBottles();
      if (this.editMode) {
        this.bottle = this.bottleService.bottles.find(s => s.id === this.bottleId) ?? new Bottle();
        this.form = this.fb.group({
          bottleName: [this.bottle.bottleName, Validators.required],
          description: [this.bottle.description, Validators.required],
          price: [this.bottle.price, Validators.required],
          imagePath: [this.bottle.imagePath, Validators.required]
        })
      }
    } catch (e) {
      console.log(e);
    }
  }

  onSubmit(): void {
    this.bottle = this.form.value;
    if(this.editMode) {
      this.bottle.id = this.bottleId;
      this.bottleService.updateBottle(this.bottle);
    } else {
      this.bottleService.pushBottle(this.bottle);
    }
    this.bottleService.storeBottles();
  }
}
