import {Component, OnDestroy} from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
  Validators
} from "@angular/forms";

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

  registerOnChange(onChange: any): void {
    this.onChangeSub = this.form.valueChanges.subscribe(onChange);
    console.log(this.form.valueChanges.subscribe(onChange));
  }

  writeValue(value: any): void {
    if (value) {
      this.form.setValue(value);
    }
  }

  registerOnTouched(onTouched: any):void {
    this.onTouched = onTouched;
  }

  setDisabledState(isDisabled: boolean):void {
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
