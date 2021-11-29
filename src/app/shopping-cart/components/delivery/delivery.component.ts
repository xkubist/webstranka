import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
  Validators
} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: DeliveryComponent
    }
    ]
})
export class DeliveryComponent implements ControlValueAccessor, OnDestroy{
  form: FormGroup;

  onTouched = () => {};
  // @ts-ignore
  onChangeSub: Disposable;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      delivery: ['', Validators.required]
    })
  }

  registerOnChange(onChange: any) {
    this.onChangeSub = this.form.valueChanges.subscribe(onChange);
    console.log(this.form.valueChanges.subscribe(onChange));
  }

  writeValue(value: any) {
    if (value) {
      this.form.setValue(value);
    }
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  setDisabledState(isDisabled: boolean) {
    if (isDisabled) {
      this.form.disable();
    }
    else {
      this.form.enable();
    }
  }

  ngOnDestroy() {
    // this.onChangeSub.unsubscribe();
  }

  ngOnInit(): void {

  }
}
