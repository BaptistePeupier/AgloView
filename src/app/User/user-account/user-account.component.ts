import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../../Common/Schemas/classes';
import {MessageService} from '../../message.service';
import {AuthenticationService} from '../../authentication.service';
import {MatDialog} from '@angular/material/dialog';
import {createUser} from '../../Common/Schemas/creation';
import {DeletePopupComponent} from '../../Common/delete-popup/delete-popup.component';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {

  currentUser: User;              // Currently logged User
  modified: boolean = false;        // Signify if there are been modifications on the data
                                    // (to only modify the profile if there are been changes).

  @ViewChild('errorMessageComponent') errorMessage;

  constructor(private msg: MessageService,
              private auth: AuthenticationService,
              public dialog: MatDialog) { }

  // Retrieve the User's data.
  ngOnInit(): void {
    this.currentUser = createUser();
    this.currentUser._id = this.auth.getId();
    this.currentUser.email = this.auth.getEmail();

    this.msg.Read('user', this.currentUser).subscribe(
      res => {
        if (res.status === 'error') {
          this.errorMessage.sendError(res.data.reason);
        }
        else {
          this.currentUser = res.data;
        }
      });
  }

  // Update the user's data & update it's displayed User Name.
  submitUserModifications() {
    this.currentUser.password = null;
    this.msg.Update('user', this.currentUser).subscribe(
      res => {
        if (res.status === 'error') {
          this.errorMessage.sendError(res.data.reason);
        }
        else {
          this.auth.setUserName(this.currentUser.pseudo);
        }
      });
  }

  // Launch the DeletePopupComponent to remove the user's account.
  deleteAccount() {
    const dialogRef = this.dialog.open(DeletePopupComponent, {
      width: '25%',
      data: {object: this.currentUser, type: 'user'}
    });

    dialogRef.afterClosed().subscribe((deletedUser: User) => {
      if (deletedUser !== undefined) {
        this.auth.logout();
      }
    });
  }

}
