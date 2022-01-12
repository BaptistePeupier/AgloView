import {Component, OnInit, ViewChild} from '@angular/core';
import {Annonce, Playlist, Video} from '../../Common/Schemas/classes';
import {MatDialog} from '@angular/material/dialog';
import {AuthenticationService} from '../../authentication.service';
import {MessageService} from '../../message.service';
import {AnnoncePopupComponent} from '../../Annonceur/annonce-popup/annonce-popup.component';
import {DeletePopupComponent} from '../../Common/delete-popup/delete-popup.component';
import {PlaylistPopupComponent} from './playlist-popup/playlist-popup.component';
import {VideoPopupComponent} from './video-popup/video-popup.component';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {
  /* Some required variables which will be used by YT API*/
  public YT: any;
  public player: any;
  public reframed: Boolean = false;

  playlists : Playlist[] = [];
  videoCurrentlyDisplayed: Video = null;
  currentPlaylist: Playlist = null;
  random: boolean = false;
  loop: boolean = false;

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

              if (this.videoCurrentlyDisplayed == null) {
                this.launchVideo();
                this.init();
              }
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

  /* Initialize method for YT IFrame API */
  init() {
    // Return if Player is already created
    if (window['YT']) {
      this.startVideo();
      return;
    }

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    /* startVideo() will create an <iframe> (and YouTube player) after the API code downloads. */
    window['onYouTubeIframeAPIReady'] = () => this.startVideo();
  }

  startVideo() {
    this.reframed = false;
    this.player = new window['YT'].Player('player', {
      videoId: this.videoCurrentlyDisplayed.link,
      width: '100%',
      height: '70%',
      playerVars: {
        autoplay: 1,
        modestbranding: 1,
        controls: 1,
        rel: 0,
        showinfo: 0,
        playsinline: 1
      },
      events: {
        'onStateChange': this.onPlayerStateChange.bind(this),
        'onReady': this.onPlayerReady.bind(this),
      }
    });
  }

  /* It will be called when the Video Player is ready */
  onPlayerReady(event) {
    event.target.playVideo();
  }

  /* API will call this function when Player State changes like PLAYING, PAUSED, ENDED */
  onPlayerStateChange(event) {
    switch (event.data) {
      case window['YT'].PlayerState.PLAYING:
        break;
      case window['YT'].PlayerState.PAUSED:
        break;
      case window['YT'].PlayerState.ENDED:
        this.getNextVideo();
        break;
    }
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

  launchVideo(playlist: Playlist = null, video: Video = null) {
    if (video === null) {
      if ((this.videoCurrentlyDisplayed === null) && (this.playlists.length !== 0) && (typeof this.playlists[0].videos[0] !== 'undefined')) {
        this.videoCurrentlyDisplayed = this.playlists[0].videos[0];
        this.currentPlaylist = this.playlists[0];
      }
    }
    else {
      this.videoCurrentlyDisplayed = video;
      this.currentPlaylist = playlist;
      this.player.loadVideoById(this.videoCurrentlyDisplayed.link);
    }
  }

  getNextVideo() {
    if (this.loop) {
    }
    else if (this.random) {
      this.videoCurrentlyDisplayed = this.currentPlaylist.videos[Math.floor(Math.random()*this.currentPlaylist.videos.length)];
    }
    else if (this.currentPlaylist.videos.indexOf(this.videoCurrentlyDisplayed) === this.currentPlaylist.videos.length-1) {
      this.videoCurrentlyDisplayed = this.currentPlaylist.videos[0];
    }
    else {
      this.videoCurrentlyDisplayed = this.currentPlaylist.videos[this.currentPlaylist.videos.indexOf(this.videoCurrentlyDisplayed)+1]
    }

    this.player.loadVideoById(this.videoCurrentlyDisplayed.link);
  }

  getPreviousVideo() {
    if (this.loop) {
    }
    else if (this.random) {
      this.videoCurrentlyDisplayed = this.currentPlaylist.videos[Math.floor(Math.random()*this.currentPlaylist.videos.length)];
    }
    else if (this.currentPlaylist.videos.indexOf(this.videoCurrentlyDisplayed) === 0) {
      this.videoCurrentlyDisplayed = this.currentPlaylist.videos[this.currentPlaylist.videos.length-1];
    }
    else {
      this.videoCurrentlyDisplayed = this.currentPlaylist.videos[this.currentPlaylist.videos.indexOf(this.videoCurrentlyDisplayed)-1]
    }

    this.player.loadVideoById(this.videoCurrentlyDisplayed.link);
  }

  CreatePlaylist() {
    const dialogRef = this.dialog.open(PlaylistPopupComponent, {
      width: '20%',
      data: null
    });

    dialogRef.afterClosed().subscribe(createdPlaylist => {
      if (createdPlaylist != undefined) {
        this.playlists.push(createdPlaylist);
      }
    });
  }

  UpdatePlaylist(playlist: Playlist) {
    this.dialog.open(PlaylistPopupComponent, {
      width: '20%',
      data: playlist
    });
  }

  DeletePlaylist(playlistToDelete: Playlist) {
    const dialogRef = this.dialog.open(DeletePopupComponent, {
      width: '20%',
      data: {object: {playlist_id: playlistToDelete._id}, type: 'playlist'}
    });

    dialogRef.afterClosed().subscribe(DeletedPlaylist => {
      if (DeletedPlaylist != undefined) {
        this.playlists = this.playlists.filter(playlist => playlist._id !== playlistToDelete._id);
        this.launchVideo();
      }
    });
  }

  CreateVideo(playlist: Playlist) {
    const dialogRef = this.dialog.open(VideoPopupComponent, {
      width: '20%',
      data: playlist
    });

    dialogRef.afterClosed().subscribe(createdVideo => {
      if (createdVideo != undefined) {
        playlist.videos.push(createdVideo);
      }
    });
  }

  DeleteVideo(playlist: Playlist, videoToDelete: Video) {
    const dialogRef = this.dialog.open(DeletePopupComponent, {
      width: '20%',
      data: {object: {video_id: videoToDelete._id}, type: 'video'}
    });

    dialogRef.afterClosed().subscribe(DeletedVideo => {
      if (DeletedVideo != undefined) {
        let tmpVideos: [Video] = [undefined];

        tmpVideos.pop();
        for (let i = 0; i < playlist.videos.length; i++) {
          if (playlist.videos[i]._id !== videoToDelete._id) {
            tmpVideos.push(playlist.videos[i])
          }
        }

        playlist.videos = tmpVideos;
        this.launchVideo();
      }
    });
  }
}
