import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Annonce} from '../../Common/Schemas/classes';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MessageService} from '../../message.service';
import {cloneAnnonceValues, CreateAnnonce} from '../../Common/Schemas/creation';
import {MatChipInputEvent} from '@angular/material/chips';

@Component({
  selector: 'app-annonce-popup',
  templateUrl: './annonce-popup.component.html',
  styleUrls: ['./annonce-popup.component.scss']
})
export class AnnoncePopupComponent implements OnInit {
  private creation: boolean;
  tmpAnnonce: Annonce;

  @ViewChild('errorMessageComponent') errorMessage;

  constructor(public dialogRef: MatDialogRef<AnnoncePopupComponent>,
              @Inject(MAT_DIALOG_DATA) public annonce: Annonce,
              @Inject(MessageService) private msg: MessageService) { }

  // Initialization:
  //  + Creation of the temporary annonce
  //  + Define mode of the popup: Creation or Edition
  ngOnInit(): void {
    // Creation of the temporary Mission object.
    this.tmpAnnonce = CreateAnnonce();

    // Creation mode
    if (this.annonce === null) {
      this.creation = true;
    }
    // Edition mode
    else {
      this.creation = false;
      cloneAnnonceValues(this.annonce, this.tmpAnnonce);  // In Edition mode we initialize the temporary with the value of the annonce.
    }
  }

  addTag(event: MatChipInputEvent) {
    const value = (event.value || '').trim();

    if (value) {
      this.tmpAnnonce.tags.push(value);
    }

    event.chipInput!.clear();
  }


  removeTag(tag: string) {
    const index = this.tmpAnnonce.tags.indexOf(tag);

    if (index >= 0) {
      this.tmpAnnonce.tags.splice(index, 1);
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }

  submit() {
    // Creation mode: creation of a new annonce with the information entered in the popup
    if (this.creation) {
      this.msg.Create('annonce', this.tmpAnnonce).subscribe(
        res => {
          if (res.status === 'error') {
            this.errorMessage.sendError(res.data.reason);
          }
          else {
            this.tmpAnnonce._id = res.data._id;
            this.dialogRef.close(this.tmpAnnonce);
          }
        }
      );
    }
    // Edition mode: update an annonce with the information entered in the popup
    else {
      this.msg.Update('annonce', this.tmpAnnonce).subscribe(
        res => {
          if (res.status === 'error') {
            this.errorMessage.sendError(res.data.reason);
          }
          else {
            cloneAnnonceValues(this.tmpAnnonce, this.annonce);
            this.dialogRef.close(this.annonce);
          }
        }
      );
    }
  }

  meanTimeWatched(): {heures: number, minutes: number, secondes: number } {
    if (this.tmpAnnonce.total_tmp_vue.length <= 0) return {heures: 0, minutes: 0, secondes: 0};

    const mean_vue = this.tmpAnnonce.total_tmp_vue.reduce((a,b) => a + b, 0) / this.tmpAnnonce.total_tmp_vue.length;

    const heures    = Math.floor((mean_vue / (1000 * 60 * 60)) % 24);
    const minutes   = Math.floor((mean_vue / (1000 * 60)) % 60);
    const secondes  = Math.floor((mean_vue / 1000) % 60);

    return {heures: heures, minutes: minutes, secondes: secondes};
  }
}
