import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Admin} from '../../../../Common/Schemas/classes';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MessageService} from '../../../../message.service';
import {cloneAdminValues, createAdmin} from '../../../../Common/Schemas/creation';

@Component({
  selector: 'app-admin-popup',
  templateUrl: './admin-popup.component.html',
  styleUrls: ['./admin-popup.component.scss']
})
export class AdminPopupComponent implements OnInit {

  public tmpAdmin: Admin;                      // Temporary Admin, used to keep changes uncommitted until admin submit its changes.

  private creation: boolean;                // Define two modes: Edition & Creation modes.
                                            // Mode is determined with the data passed to the popup: if null, we are in Creation mode, Edition otherwise.
                                            // If true: we have opened the popup in creation mode.
                                            // If false: we have opened the popup in edition mode.

  @ViewChild('errorMessageComponent') errorMessage;

  constructor(public dialogRef: MatDialogRef<AdminPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public admin: Admin,
              @Inject(MessageService) private msg: MessageService) { }

  // Initialization:
  //  + Creation of the temporary Admin
  //  + Define mode of the popup: Creation or Edition
  ngOnInit(): void {
    this.tmpAdmin = createAdmin();

    // Creation mode
    if (this.admin === null) {
      this.creation = true;
    }
    // Edition mode
    else {
      this.creation = false;
      cloneAdminValues(this.admin, this.tmpAdmin);  // In Edition mode we initialize the temporary with the value of the admin.
    }
  }

  // Called when button "Cancel" is clicked.
  onNoClick(): void {
    this.dialogRef.close();
  }

  // Operation performed when clicking on the "Submit" button.
  // Change according to the mode of the popup (Creation or Edition of a Contact).
  SubmitAdmin() {
    if (this.creation) {
      this.msg.Create('admin', this.tmpAdmin).subscribe(
        res => {
          if (res.status === 'error') {
            this.errorMessage.sendError(res.data.reason);
          }
          else {
            this.dialogRef.close(this.tmpAdmin);
          }
        }
      )
    }
    else {
      if(this.tmpAdmin.password === "") this.tmpAdmin.password = null;

      this.msg.Update('admin', this.tmpAdmin).subscribe(
        res => {
          if (res.status === 'error') {
            this.errorMessage.sendError(res.data.reason);
          } else {
            cloneAdminValues(this.tmpAdmin, this.admin);
            this.dialogRef.close(this.tmpAdmin);
          }
        }
      )
    }
  }

}
