import {Component, OnDestroy} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators} from "@angular/forms";

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
export class PaymentComponent implements ControlValueAccessor, OnDestroy{
  form: FormGroup;

  onTouched = () => {};
  // @ts-ignore
  onChangeSub: Subscription;

  constructor(private fb: FormBuilder){
    this.form = this.fb.group({
      payment: ['', Validators.required]
    });
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  registerOnChange(onChange: any) {
    this.onChangeSub = this.form.valueChanges.subscribe(onChange);
  }

  writeValue(value: any) {
    if (value) {
      this.form.setValue(value);
    }
  }

  setDisabledState(isDisabled: boolean) {
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  ngOnDestroy(): void{
    // this.onChangeSub.unsubscrbe();
  }
}
