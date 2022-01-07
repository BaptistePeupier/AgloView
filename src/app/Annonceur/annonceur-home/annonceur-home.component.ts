import {Component, OnInit, ViewChild} from '@angular/core';
import {MessageService} from '../../message.service';
import {AuthenticationService} from '../../authentication.service';
import {Annonce} from '../../Common/Schemas/classes';
import {AnnoncePopupComponent} from '../annonce-popup/annonce-popup.component';
import {MatDialog} from '@angular/material/dialog';
import {DeletePopupComponent} from '../../Common/delete-popup/delete-popup.component';

@Component({
  selector: 'app-annonceur-home',
  templateUrl: './annonceur-home.component.html',
  styleUrls: ['./annonceur-home.component.scss']
})
export class AnnonceurHomeComponent implements OnInit {

  annonces: Annonce[];

  @ViewChild('errorMessageComponent') errorMessage;

  constructor(private msg: MessageService,
              private auth: AuthenticationService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.msg.Read('annonceur', {_id: this.auth.getId(), email: this.auth.getEmail()}).subscribe(res=> {
      if(res.status === 'error') {
        this.errorMessage.sendError(res.data.reason);
      }
      else {
        this.annonces = res.data.annonces;
      }
    });
  }

  CreateAnnonce() {
    const dialogRef = this.dialog.open(AnnoncePopupComponent, {
      width: '40%',
      data: null
    });

    dialogRef.afterClosed().subscribe(createdAnnonce => {
      if (createdAnnonce != undefined) {
        this.annonces.push(createdAnnonce);
      }
    });
  }

  UpdateAnnonce(annonce_id: number) {
    const dialogRef = this.dialog.open(AnnoncePopupComponent, {
      width: '40%',
      data: this.annonces.filter(annonce => annonce._id === annonce_id)[0]
    });

    dialogRef.afterClosed().subscribe(updatedAnnonce => {
      if (updatedAnnonce != undefined) {

      }
    });
  }

  DeleteAnnonce(annonce_id: number) {
    const dialogRef = this.dialog.open(DeletePopupComponent, {
      width: '40%',
      data: {object: this.annonces.filter(annonce => annonce._id === annonce_id)[0], type: 'annonce'}
    });

    dialogRef.afterClosed().subscribe(DeletedAnnonce => {
      if (DeletedAnnonce != undefined) {
        this.annonces = this.annonces.filter(annonce => annonce._id !== annonce_id);
      }
    });
  }
}

