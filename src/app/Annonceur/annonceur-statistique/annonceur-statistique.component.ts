import {Component, OnInit, ViewChild} from '@angular/core';
import {Annonce} from '../../Common/Schemas/classes';
import {MessageService} from '../../message.service';
import {AuthenticationService} from '../../authentication.service';

@Component({
  selector: 'app-annonceur-statistique',
  templateUrl: './annonceur-statistique.component.html',
  styleUrls: ['./annonceur-statistique.component.scss']
})
export class AnnonceurStatistiqueComponent implements OnInit {

  annonces: Annonce[];

  @ViewChild('errorMessageComponent') errorMessage;

  constructor(private msg: MessageService,
              private auth: AuthenticationService) { }

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

  TotalVues(): number {
    let vues = 0;

    if (typeof this.annonces !== 'undefined') {
      for (let i = 0; i < this.annonces.length; i++) {
        vues += this.annonces[i].nb_vues;
      }
    }

    return vues;
  }

  TotalTemps(): {heures: number, minutes: number, secondes: number } {
    let temps = 0;

    if (typeof this.annonces !== 'undefined') {
      for (let i = 0; i < this.annonces.length; i++) {
        if (this.annonces.length > 0) {
          for (let j = 0; j < this.annonces[i].total_tmp_vue.length; j++) {
            temps += this.annonces[i].total_tmp_vue[j];
          }
        }
      }
    }

    const heures    = Math.floor((temps / (1000 * 60 * 60)) % 24);
    const minutes   = Math.floor((temps / (1000 * 60)) % 60);
    const secondes  = Math.floor((temps / 1000) % 60);

    return {heures: heures, minutes: minutes, secondes: secondes};
  }

  BestAnnonce(): Annonce {
    return this.annonces.sort(function (annonce1: Annonce, annonce2: Annonce) {
      return annonce2.nb_vues - annonce1.nb_vues;
    })[0];
  }
}

