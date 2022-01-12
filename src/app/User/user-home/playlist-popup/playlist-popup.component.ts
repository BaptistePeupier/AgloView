import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Playlist} from '../../../Common/Schemas/classes';
import {MessageService} from '../../../message.service';
import {clonePlaylistValues, createPlaylist} from '../../../Common/Schemas/creation';

@Component({
  selector: 'app-playlist-popup',
  templateUrl: './playlist-popup.component.html',
  styleUrls: ['./playlist-popup.component.css']
})
export class PlaylistPopupComponent implements OnInit {

  private creation: boolean;
  tmpPlaylist: Playlist;

  @ViewChild('errorMessageComponent') errorMessage;

  constructor(public dialogRef: MatDialogRef<PlaylistPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public playlist: Playlist,
              @Inject(MessageService) private msg: MessageService) { }

  // Initialization:
  //  + Creation of the temporary Playlist
  //  + Define mode of the popup: Creation or Edition
  ngOnInit(): void {
    this.tmpPlaylist = createPlaylist();

    // Creation mode
    if (this.playlist === null) {
      this.creation = true;
    }
    // Edition mode
    else {
      this.creation = false;
      clonePlaylistValues(this.playlist, this.tmpPlaylist);  // In Edition mode we initialize the temporary with the value of the playlist.
    }
  }

  // Called when button "Cancel" is clicked.
  onNoClick(): void {
    this.dialogRef.close();
  }

  // Operation performed when clicking on the "Submit" button.
  // Change according to the mode of the popup (Creation or Edition of a Contact).
  submit() {
    if (this.creation) {
      this.msg.Create('playlist', this.tmpPlaylist).subscribe(
        res => {
          if (res.status === 'error') {
            this.errorMessage.sendError(res.data.reason);
          }
          else {
            this.tmpPlaylist._id = res.data._id;
            this.dialogRef.close(this.tmpPlaylist);
          }
        }
      )
    }
    else {
      this.msg.Update('playlist', this.tmpPlaylist).subscribe(
        res => {
          if (res.status === 'error') {
            this.errorMessage.sendError(res.data.reason);
          } else {
            clonePlaylistValues(this.tmpPlaylist, this.playlist);
            this.dialogRef.close(this.tmpPlaylist);
          }
        }
      )
    }
  }
}
