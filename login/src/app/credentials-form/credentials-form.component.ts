import { Component, OnInit, OnSubmit, OnChanges } from '@angular/core';
import * as zxcvbn from 'zxcvbn';

@Component({
  selector: 'app-credentials-form',
  templateUrl: './credentials-form.component.html',
  styleUrls: ['./credentials-form.component.css']
})
export class CredentialsFormComponent implements OnInit {

  constructor() {
  	this.credentials = new Credentials();
  }

  ngOnInit() {
  }

  ngOnChanges(changes) {
  	console.log(changes);
  }

  onSubmit(credentialsForm) { 
  	console.log(credentialsForm.value); 
  }

}
