import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AuthenticationService} from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AgloView';

  constructor(private titleService: Title,
              public auth: AuthenticationService) {
    this.titleService.setTitle(this.title);
  }

}
