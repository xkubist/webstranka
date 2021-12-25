import {Component} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: PaymentComponent
  }]
})
export class PaymentComponent implements ControlValueAccessor{
  form: FormGroup;

  onTouched = () => {};
  onChange = (value: any) => {};

  constructor(private fb: FormBuilder){
    this.form = this.fb.group({
      payment: ['', Validators.required]
    });
  }

  registerOnTouched(onTouched: any):void {
    this.onTouched = onTouched;
  }

  registerOnChange(onChange: any):void {
    this.onChange = onChange;
  }

  writeValue(value: any):void {
    this.form.controls['payment'].setValue(value);
  }

  setDisabledState(isDisabled: boolean):void {
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  select(value: any) {
    this.form.controls['payment'].setValue(value);
    this.onChange(value);
  }
}
