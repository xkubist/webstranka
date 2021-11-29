import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent {

  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      bottleName: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      imagePath: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.form);
    console.log(this.form.get('imagePath')?.value);
  }
}
