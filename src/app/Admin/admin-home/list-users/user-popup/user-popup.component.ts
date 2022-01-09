import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {User} from '../../../../Common/Schemas/classes';
import {MessageService} from '../../../../message.service';
import {cloneUserValues, createUser} from '../../../../Common/Schemas/creation';

@Component({
  selector: 'app-user-popup',
  templateUrl: './user-popup.component.html',
  styleUrls: ['./user-popup.component.scss']
})
export class UserPopupComponent implements OnInit {

  public tmpUser: User;                      // Temporary User, used to keep changes uncommitted until user submit its changes.

  private creation: boolean;                // Define two modes: Edition & Creation modes.
                                            // Mode is determined with the data passed to the popup: if null, we are in Creation mode, Edition otherwise.
                                            // If true: we have opened the popup in creation mode.
                                            // If false: we have opened the popup in edition mode.

  @ViewChild('errorMessageComponent') errorMessage;

  constructor(public dialogRef: MatDialogRef<UserPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public user: User,
              @Inject(MessageService) private msg: MessageService) { }

  // Initialization:
  //  + Creation of the temporary User
  //  + Define mode of the popup: Creation or Edition
  ngOnInit(): void {
    this.tmpUser = createUser();

    // Creation mode
    if (this.user === null) {
      this.creation = true;
    }
    // Edition mode
    else {
      this.creation = false;
      cloneUserValues(this.user, this.tmpUser);  // In Edition mode we initialize the temporary with the value of the user.
    }
  }

  // Called when button "Cancel" is clicked.
  onNoClick(): void {
    this.dialogRef.close();
  }

  // Operation performed when clicking on the "Submit" button.
  // Change according to the mode of the popup (Creation or Edition of a Contact).
  SubmitUser() {
    if (this.creation) {
      this.msg.Create('user', this.tmpUser).subscribe(
        res => {
          if (res.status === 'error') {
            this.errorMessage.sendError(res.data.reason);
          }
          else {
            this.dialogRef.close(this.tmpUser);
          }
        }
      )
    }
    else {
      if(this.tmpUser.password === "") this.tmpUser.password = null;

      this.msg.Update('user', this.tmpUser).subscribe(
        res => {
          if (res.status === 'error') {
            this.errorMessage.sendError(res.data.reason);
          } else {
            cloneUserValues(this.tmpUser, this.user);
            this.dialogRef.close(this.tmpUser);
          }
        }
      )
    }
  }

}

