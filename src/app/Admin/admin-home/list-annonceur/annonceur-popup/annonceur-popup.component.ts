import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Annonceur} from '../../../../Common/Schemas/classes';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MessageService} from '../../../../message.service';
import {cloneAnnonceurValues, createAnnonceur} from '../../../../Common/Schemas/creation';

@Component({
  selector: 'app-annonceur-popup',
  templateUrl: './annonceur-popup.component.html',
  styleUrls: ['./annonceur-popup.component.scss']
})
export class AnnonceurPopupComponent implements OnInit {

  public tmpAnnonceur: Annonceur;                      // Temporary Annonceur, used to keep changes uncommitted until annonceur submit its changes.

  private creation: boolean;                // Define two modes: Edition & Creation modes.
                                            // Mode is determined with the data passed to the popup: if null, we are in Creation mode, Edition otherwise.
                                            // If true: we have opened the popup in creation mode.
                                            // If false: we have opened the popup in edition mode.

  @ViewChild('errorMessageComponent') errorMessage;

  constructor(public dialogRef: MatDialogRef<AnnonceurPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public annonceur: Annonceur,
              @Inject(MessageService) private msg: MessageService) { }

  // Initialization:
  //  + Creation of the temporary Annonceur
  //  + Define mode of the popup: Creation or Edition
  ngOnInit(): void {
    this.tmpAnnonceur = createAnnonceur();

    // Creation mode
    if (this.annonceur === null) {
      this.creation = true;
    }
    // Edition mode
    else {
      this.creation = false;
      cloneAnnonceurValues(this.annonceur, this.tmpAnnonceur);  // In Edition mode we initialize the temporary with the value of the annonceur.
    }
  }

  // Called when button "Cancel" is clicked.
  onNoClick(): void {
    this.dialogRef.close();
  }

  // Operation performed when clicking on the "Submit" button.
  // Change according to the mode of the popup (Creation or Edition of a Contact).
  SubmitAnnonceur() {
    if (this.creation) {
      this.msg.Create('annonceur', this.tmpAnnonceur).subscribe(
        res => {
          if (res.status === 'error') {
            this.errorMessage.sendError(res.data.reason);
          }
          else {
            this.dialogRef.close(this.tmpAnnonceur);
          }
        }
      )
    }
    else {
      if(this.tmpAnnonceur.password === "") this.tmpAnnonceur.password = null;

      this.msg.Update('annonceur', this.tmpAnnonceur).subscribe(
        res => {
          if (res.status === 'error') {
            this.errorMessage.sendError(res.data.reason);
          } else {
            cloneAnnonceurValues(this.tmpAnnonceur, this.annonceur);
            this.dialogRef.close(this.tmpAnnonceur);
          }
        }
      )
    }
  }

}
