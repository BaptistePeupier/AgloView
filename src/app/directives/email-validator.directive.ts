import { Directive } from '@angular/core'
import { NG_VALIDATORS, FormControl } from '@angular/forms'

@Directive({
  selector: '[emailValidator][ngModel]',
  providers: [{
    provide: NG_VALIDATORS,
    useValue: emailValidation,
    multi: true
  }]
})
export class EmailValidatorDirective {
  constructor() { }
}

export function emailValidation(control: FormControl) {
    let email = control.value
    let regex = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
    if (email && regex.test(email)) {
      return null
    }
    return { error: true }
}
