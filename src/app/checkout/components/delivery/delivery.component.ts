import {Component} from '@angular/core';
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
export class DeliveryComponent implements ControlValueAccessor{
  form: FormGroup;

  onTouched = () => {};
  onChange = (value: any) => {};

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      delivery: ['', Validators.required]
    })
  }

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  writeValue(value: any): void {
    this.form.controls['delivery'].setValue(value);
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

  select(value: any) {
    this.form.controls['delivery'].setValue(value);
    this.onChange(value);
  }
}
