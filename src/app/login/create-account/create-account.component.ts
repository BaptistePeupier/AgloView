import {Component, OnInit, ViewChild} from '@angular/core';
import {MessageService} from '../../message.service';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../authentication.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  pseudo: string;
  age: number;
  email: string;
  password1: string;
  password2: string;
  type: string;

  @ViewChild('errorMessageComponent') errorMessage;

  constructor(private msg: MessageService,
              private auth : AuthenticationService,
              private router: Router) { }

  ngOnInit(): void {
  }

  CreateAcount() {
    if (this.password1 === this.password2) {
      const data = {
        pseudo: this.pseudo,
        age: this.age,
        email: this.email,
        password: this.password1
      }

      this.msg.Create(this.type, data).subscribe(
        res => {
          if (res.status === 'error') {
            this.errorMessage.sendError(res.data.reason);
          }
          else {
            this.auth.sendAuthentication(this.email, this.password1, this.type).subscribe(
              res=> {
                // Once we have received response from the backend, we launch the finalization of the authentication process in
                // order to store the status of the user.
                this.auth.finalizeAuthentication(res);

                if (res.status === 'error') {
                  this.errorMessage.sendError(res.data.reason);
                }
                else {
                  this.router.navigateByUrl('/' + this.type.charAt(0).toUpperCase() + this.type.slice(1) + 'Home').then();
                }
              }
            )
          }
        }
      );
    }
    else {
      this.errorMessage.sendError("Veuilles saisir le même mot de passe dans les 2 champs");
    }
  }
}

