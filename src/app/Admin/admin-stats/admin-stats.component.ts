import {Component, OnInit, ViewChild} from '@angular/core';
import {Annonce, Annonceur, User} from '../../Common/Schemas/classes';
import {MessageService} from '../../message.service';
import {AuthenticationService} from '../../authentication.service';

@Component({
  selector: 'app-admin-stats',
  templateUrl: './admin-stats.component.html',
  styleUrls: ['./admin-stats.component.scss']
})
export class AdminStatsComponent implements OnInit {

  users: User[];
  tags: {tag: string, occurrence: number}[] = []

  annonceurs: Annonceur[];
  annonces: Annonce[] = [];

  @ViewChild('errorMessageComponent') errorMessage;

  constructor(private msg: MessageService,
              private auth: AuthenticationService) { }

  ngOnInit(): void {
    this.msg.Read('users', null).subscribe(res=> {
      if(res.status === 'error') {
        this.errorMessage.sendError(res.data.reason);
      }
      else {
        this.users = res.data;

        for (let i = 0; i < this.users.length; i++) {
          for (let j = 0; j < this.users[i].tags.length; j++) {
            this.tags.push(this.users[i].tags[j]);
          }
        }
      }
    });

    this.msg.Read('annonceurs', null).subscribe(res=> {
      if(res.status === 'error') {
        this.errorMessage.sendError(res.data.reason);
      }
      else {
        this.annonceurs = res.data;

        for (let i = 0; i < this.annonceurs.length; i++) {
          this.msg.Read('annonceur', this.annonceurs[i]).subscribe(
            res => {
              if (res.status === 'error') {
                this.errorMessage.sendError(res.data.reason);
              }
              else {
                for (let j = 0; j < res.data.annonces.length; j++) {
                  this.annonces.push(res.data.annonces[j]);
                }
              }
            }
          );
        }
      }
    });
  }

  numberUser() {
    if (typeof this.users === 'undefined') return 0
    else return this.users.length;
  }

  numberAnnonceur() {
    if (typeof this.annonceurs === 'undefined') return 0
    else return this.annonceurs.length;
  }

  numberAnnonce() {
    if (typeof this.annonces === 'undefined') return 0
    else return this.annonces.length;
  }

  topTag(): {occurrence: number, tag: string}[] {
    return this.tags.sort(function(tag1: {occurrence: number, tag: string}, tag2: {occurrence: number, tag: string}) {
      return tag2.occurrence - tag1.occurrence;
    }).slice(0, 10);  }

  topAnnonce(): Annonce[] {
    return this.annonces.sort(function(annonce1: Annonce, annonce2: Annonce) {
      return annonce2.nb_vues - annonce1.nb_vues;
    }).slice(0, 10);
  }
}
