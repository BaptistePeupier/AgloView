import {Component, OnInit, ViewChild} from '@angular/core';
import {DeletePopupComponent} from '../../Common/delete-popup/delete-popup.component';
import {MatDialog} from '@angular/material/dialog';
import {MessageService} from '../../message.service';
import {AuthenticationService} from '../../authentication.service';
import {Annonceur} from '../../Common/Schemas/classes';
import {createAnnonceur} from '../../Common/Schemas/creation';

@Component({
  selector: 'app-annonceur-account',
  templateUrl: './annonceur-account.component.html',
  styleUrls: ['./annonceur-account.component.scss']
})
export class AnnonceurAccountComponent implements OnInit {

  currentAnnonceur: Annonceur;              // Currently logged User
  modified: boolean = false;      // Signify if there are been modifications on the data
                                  // (to only modify the profile if there are been changes).

  @ViewChild('errorMessageComponent') errorMessage;

  constructor(private msg: MessageService,
              private auth: AuthenticationService,
              public dialog: MatDialog) { }

  // Retrieve the User's data.
  ngOnInit(): void {
    this.currentAnnonceur = createAnnonceur();
    this.currentAnnonceur._id = this.auth.getId();
    this.currentAnnonceur.email = this.auth.getEmail();

    this.msg.Read('annonceur', this.currentAnnonceur).subscribe(
      res => {
        if (res.status === 'error') {
          this.errorMessage.sendError(res.data.reason);
        }
        else {
          this.currentAnnonceur = res.data;
        }
      });
  }

  // Update the Annonceur's data & update it's displayed Annonceur Name.
  submitUserModifications() {
    this.msg.Update('annonceur', this.currentAnnonceur).subscribe(
      res => {
        if (res.status === 'error') {
          this.errorMessage.sendError(res.data.reason);
        }
        else {
          this.auth.setUserName(res.data.pseudo);
        }
      });
  }

  // Launch the DeletePopupComponent to remove the annonceur's account.
  deleteAccount() {
    const dialogRef = this.dialog.open(DeletePopupComponent, {
      width: '25%',
      data: {object: this.currentAnnonceur, type: 'annonceur'}
    });

    dialogRef.afterClosed().subscribe((deletedAnnonceur: Annonceur) => {
      if (deletedAnnonceur !== undefined) {
        this.auth.logout();
      }
    });
  }
}
