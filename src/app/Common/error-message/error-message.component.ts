import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent implements OnInit {

  errorMessage = 'Undefined Error';
  errorMessageBool = true;

  constructor() {
  }

  ngOnInit(): void {
  }

  // Method used to display an error message using this generic component.
  public sendError = (message) => {
    if (message){
      this.errorMessage = message;
    }
    this.errorMessageBool = false;
  }

}
