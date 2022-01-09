import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MessageService} from '../../../message.service';
import {AuthenticationService} from '../../../authentication.service';
import {ResetPasswordComponent} from '../../../Common/reset-password/reset-password.component';
import {createAdmin} from '../../../Common/Schemas/creation';

@Component({
  selector: 'app-admin-password',
  templateUrl: './admin-password.component.html',
  styleUrls: ['./admin-password.component.scss']
})
export class AdminPasswordComponent implements OnInit {

  passwordChanged: boolean = false;                   // Boolean that indicate if we succeed in changing the password
  // (control the display of the validation message).

  hide: boolean = true;
  hideConfirm: boolean = true;                        // Booleans that control the temporary display of the password and its confirmation
                                                      // (to check their values).

  public frmPassword: FormGroup;                      // FormGroup for entering the password and its confirmation with check rules.

  @ViewChild('errorMessageComponent') errorMessage;

  constructor(private msg: MessageService,
              private auth: AuthenticationService,
              private fb: FormBuilder) { }

  // Initialization of the FormGroup for entering the password and its confirmation.
  ngOnInit(): void {
    this.frmPassword = ResetPasswordComponent.createChangePasswordForm(this.fb);
  }

  // Gather the data needed for the reset of the password and call the corresponding route of backend.
  updatePassword() {
    const admin = createAdmin();
    admin._id = this.auth.getId();
    admin.password = this.frmPassword.value.password

    this.msg.Update('admin', admin).subscribe(
      res => {
        if (res.status === 'error')  {
          this.errorMessage.sendError(res.data.reason);
        }
        else {
          this.passwordChanged = true;
        }
      }
    )
  }

}
