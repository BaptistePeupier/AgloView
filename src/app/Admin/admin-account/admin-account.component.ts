import {Component, OnInit, ViewChild} from '@angular/core';
import {Admin} from '../../Common/Schemas/classes';
import {MessageService} from '../../message.service';
import {AuthenticationService} from '../../authentication.service';
import {MatDialog} from '@angular/material/dialog';
import {createAdmin} from '../../Common/Schemas/creation';
import {DeletePopupComponent} from '../../Common/delete-popup/delete-popup.component';

@Component({
  selector: 'app-admin-account',
  templateUrl: './admin-account.component.html',
  styleUrls: ['./admin-account.component.scss']
})
export class AdminAccountComponent implements OnInit {

  currentAdmin: Admin;              // Currently logged User
  modified: boolean = false;        // Signify if there are been modifications on the data
                                    // (to only modify the profile if there are been changes).

  @ViewChild('errorMessageComponent') errorMessage;

  constructor(private msg: MessageService,
              private auth: AuthenticationService,
              public dialog: MatDialog) { }

  // Retrieve the Admin's data.
  ngOnInit(): void {
    this.currentAdmin = createAdmin();
    this.currentAdmin._id = this.auth.getId();
    this.currentAdmin.email = this.auth.getEmail();

    this.msg.Read('admin', this.currentAdmin).subscribe(
      res => {
        if (res.status === 'error') {
          this.errorMessage.sendError(res.data.reason);
        }
        else {
          this.currentAdmin = res.data;
        }
      });
  }

  // Update the admin's data & update it's displayed Admin Name.
  submitAdminModifications() {
    this.currentAdmin.password = null;
    this.msg.Update('admin', this.currentAdmin).subscribe(
      res => {
        if (res.status === 'error') {
          this.errorMessage.sendError(res.data.reason);
        }
        else {
          this.auth.setUserName(this.currentAdmin.pseudo);
        }
      });
  }

  // Launch the DeletePopupComponent to remove the admin's account.
  deleteAccount() {
    const dialogRef = this.dialog.open(DeletePopupComponent, {
      width: '25%',
      data: {object: this.currentAdmin, type: 'admin'}
    });

    dialogRef.afterClosed().subscribe((deletedAdmin: Admin) => {
      if (deletedAdmin !== undefined) {
        this.auth.logout();
      }
    });
  }

}
