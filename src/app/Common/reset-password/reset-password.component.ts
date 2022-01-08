import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {MessageService} from '../../message.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  private token: string;                              // Value of the reset token.
  private email: string;                              // Email which is linked to the token.
                                                      // Those 2 information are retrieved in the link of the page.

  validToken: boolean = false;                        // Boolean that save the information given by the backend about the validity of the token
  passwordChanged: boolean = false;                   // Boolean that indicate if we succeed in changing the password
                                                      // (control the display of the validation message).

  hide: boolean = true;
  hideConfirm: boolean = true;                        // Booleans that control the temporary display of the password and its confirmation
                                                      // (to check their values).

  public frmPassword: FormGroup;                      // FormGroup for entering the password and its confirmation with check rules.

  @ViewChild('errorMessageComponent') errorMessage;

  constructor(private msg: MessageService,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder) { }

  // First verification if the token.
  // If token is invalid, the form for changing password isn't created (nor displayed).
  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
    this.email = this.route.snapshot.paramMap.get('email');

    const data = {
      token: this.token,
      email: this.email
    }

    // this.msg.Create('verifyResetPassword', data).subscribe(
    //   res => {
    //     if (res.status === 'error')  {
    //       this.errorMessage.sendError(res.data.reason);
    //     }
    //     else {
    //       this.validToken = true;
    //
    //       // Initialization of the FormGroup for entering the password and its confirmation.
    //       this.frmPassword = ResetPasswordComponent.createChangePasswordForm(this.fb);
    //     }
    //   }
    // )
  }

  // Test the value of the control against the regexp supplied.
  // If control is empty or test is true, return no error (null)
  // Else, return error passed in the second parameter
  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      let code;

      if ((!control.value) || regex.test(control.value)) {
        code = null;
      }
      else {
        code = error;
      }

      return code;
    };
  }

  // Return a ValidationErrors used in 'options' in 'fb.group'.
  // Return null if nothing to do (no errors).
  static passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password: string = control.get('password').value;                 // get password from our password form control
    const confirmPassword: string = control.get('confirmPassword').value;   // get password from our confirmPassword form control
    let code = null;

    // If passwords don't match, set an error in our confirmPassword form control
    if (password !== confirmPassword) {
      control.get('confirmPassword').setErrors({ noPasswordMatch: true });
      code = control;
    }

    return code;
  }

  // Creation of a FormGroup for entering the password and its confirmation.
  // Contains 2 configs witch defines rules for entering data:
  //    password
  //    confirmPassword
  static createChangePasswordForm(fb: FormBuilder): FormGroup {
    return fb.group(
      {
        password: [
          null,
          Validators.compose([
            Validators.required,
            Validators.minLength(8),
            // Check whether the entered password has a number
            ResetPasswordComponent.patternValidator(/\d/, {hasNumber: true}),
            // Check whether the entered password has upper case letter
            ResetPasswordComponent.patternValidator(/[A-Z]/, {hasCapitalCase: true}),
            // Check whether the entered password has a lower case letter
            ResetPasswordComponent.patternValidator(/[a-z]/, {hasSmallCase: true}),
            // Check whether the entered password has a special character
            ResetPasswordComponent.patternValidator(/[ ?!.*\s]/,{hasSpecialCharacters: true})
          ])
        ],
        confirmPassword: [
          null,
          Validators.compose([
            Validators.required
          ])
        ]
      },
      {
        validators: [
          // Check whether our password and confirm password match
          ResetPasswordComponent.passwordMatchValidator
        ]
      }
    );
  }

  // Gather the data needed for the reset of the password and call the corresponding route of backend.
  changePassword() {
    // const data = {
    //   token: this.token,
    //   email: this.email,
    //   password1: this.frmPassword.value.password,
    //   password2: this.frmPassword.value.confirmPassword
    // }
    //
    // this.msg.Update(, data).subscribe(
    //   res => {
    //     if (res.status === 'error')  {
    //       this.validToken = false;
    //
    //       this.errorMessage.sendError(res.data.reason);
    //     }
    //     else {
    //       this.passwordChanged = true;
    //
    //       setTimeout(
    //         () => {
    //           this.router.navigateByUrl('/login').then();
    //         },
    //         5000
    //       );
    //     }
    //   }
    // )
  }

}
