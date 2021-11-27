import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  providers: [ AuthService ]
})
export class HomepageComponent implements OnInit {

  // list: ListItem[];
  displayToken: string

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.displayToken = this.authService.getToken()
    // this.listService
    //   .getList()
    //   .then((listitems: ListItem[]) => {
    //     this.list = listitems;
    //   });
  }

}
