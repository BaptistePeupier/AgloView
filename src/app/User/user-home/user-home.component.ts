import {Component, OnInit, ViewChild} from '@angular/core';
import {Annonce, Playlist, Video} from '../../Common/Schemas/classes';
import {MatDialog} from '@angular/material/dialog';
import {AuthenticationService} from '../../authentication.service';
import {MessageService} from '../../message.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {

  playlists : Playlist[] = [];
  videoCurrentlyDisplayed: Video = null;

  annonce: Annonce;
  displayAnnonce: boolean = true;
  startAnnonceDisplay = new Date();

  @ViewChild('errorMessageComponent') errorMessage;

  constructor(private msg: MessageService,
              public auth: AuthenticationService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.msg.Read('user', {_id: this.auth.getId(), email: this.auth.getEmail()}).subscribe(res=> {
      if(res.status === 'error') {
        this.errorMessage.sendError(res.data.reason);
      }
      else {
        for (let i = 0; i < res.data.playlists.length; i++) {
          this.playlists.push({name: null, videos: [undefined], _id: res.data.playlists[i]});
        }

        for (let i = 0; i < this.playlists.length; i++) {
          this.msg.Read('playlist', {playlist_id: this.playlists[i]._id}).subscribe(res=> {
            if(res.status === 'error') {
              this.errorMessage.sendError(res.data.reason);
            }
            else {
              this.playlists[i] = res.data;
            }
          });
        }
      }
    });

    this.msg.Read('getAnnonceForUser', null).subscribe(res=> {
      if(res.status === 'error') {
        this.errorMessage.sendError(res.data.reason);
      }
      else {
        this.annonce = res.data;
      }
    });
  }

  getVideoLink(video: Video = null) : string {
    if (video === null) {
      if ((this.videoCurrentlyDisplayed === null) && (this.playlists.length !== 0) && (typeof this.playlists[0].videos[0] !== 'undefined')) {
        this.videoCurrentlyDisplayed = this.playlists[0].videos[0];
      }
    }
    else {
      this.videoCurrentlyDisplayed = video;
    }

    if (this.videoCurrentlyDisplayed !== null) {
      return ("https://www.youtube.com/embed/" + this.videoCurrentlyDisplayed.link);
    }
    else return '';
  }

  closeAnnonce() {
    const endAnnonceDisplay = new Date()

    this.displayAnnonce = false;

    this.annonce.tmp_vue = endAnnonceDisplay.getTime() - this.startAnnonceDisplay.getTime();

    this.msg.Update('annonce', this.annonce).subscribe(res=> {
      if(res.status === 'error') {
        this.errorMessage.sendError(res.data.reason);
      }
      else {
        this.annonce = res.data;
      }
    });
  }

  getVideoTitle(video: Video): string {
    if (typeof video !== 'undefined') return video.title;
    return null;
  }

  getAnnonceText(annonce: Annonce): string {
    if (typeof annonce !== 'undefined') return annonce.text;
    return null;
  }
}

