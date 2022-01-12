import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Playlist, Video} from '../../../Common/Schemas/classes';
import {MessageService} from '../../../message.service';
import {createVideo} from '../../../Common/Schemas/creation';

@Component({
  selector: 'app-video-popup',
  templateUrl: './video-popup.component.html',
  styleUrls: ['./video-popup.component.css']
})
export class VideoPopupComponent implements OnInit {

  newVideo: Video;

  @ViewChild('errorMessageComponent') errorMessage;

  constructor(public dialogRef: MatDialogRef<VideoPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public playlist: Playlist,
              @Inject(MessageService) private msg: MessageService) { }

  ngOnInit(): void {
    this.newVideo = createVideo();
  }

  // Called when button "Cancel" is clicked.
  onNoClick(): void {
    this.dialogRef.close();
  }

  submit() {
    this.newVideo.link = this.youtube_parser(this.newVideo.link);

    this.msg.Create('video', {youtube_video_id: this.newVideo.link, id_playlist: this.playlist._id}).subscribe(
      res => {
        if (res.status === 'error') {
          this.errorMessage.sendError(res.data.reason);
        }
        else {
          this.newVideo._id = res.data.video_id;
          this.newVideo.title = res.data.title;
          this.dialogRef.close(this.newVideo);
        }
      }
    )
  }

  youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
  }
}
