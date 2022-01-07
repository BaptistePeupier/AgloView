import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MessageService} from '../../message.service';

@Component({
  selector: 'app-delete-popup',
  templateUrl: './delete-popup.component.html',
  styleUrls: ['./delete-popup.component.scss']
})
export class DeletePopupComponent implements OnInit {

  @ViewChild('errorMessageComponent') errorMessage;

  constructor(public dialogRef: MatDialogRef<DeletePopupComponent>,
              @Inject(MAT_DIALOG_DATA) public objectToDelete: { object: any, type: string },
              @Inject(MessageService) private msg: MessageService) { }

  ngOnInit(): void {

  }

  onNoClick() {
    this.dialogRef.close();
  }

  Delete() {
    this.msg.Delete(this.objectToDelete.type, this.objectToDelete.object).subscribe(
      res => {
        if (res.status === 'error') {
          this.errorMessage.sendError(res.data.reason);
        }
        else {
          this.dialogRef.close(this.objectToDelete.object);
        }
      }
    );
  }
}
