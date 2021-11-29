import { Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ShoppingCartService} from "./shopping-cart.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private shoppingCartService: ShoppingCartService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['',[Validators.required, Validators.pattern("[0-9 ]{9}")]],
      delivery: ['', Validators.required],
      payment: ['',Validators.required]
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.shoppingCartService.order=this.form.value
    console.log(this.shoppingCartService.order);
  }
}
