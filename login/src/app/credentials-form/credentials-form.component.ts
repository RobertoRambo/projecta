import { Component, OnInit, OnChanges } from '@angular/core';
import * as zxcvbn from 'zxcvbn';
import { FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-credentials-form',
  templateUrl: './credentials-form.component.html',
  styleUrls: ['./credentials-form.component.css']
})
export class CredentialsFormComponent implements OnInit {

  private passwordStrengthScore: number;
  private passwordStrength: string;
  credentialsForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      email: '',
      password: ''
    });
    this.onChanges();
  }

  onChanges(): void {
    this.credentialsForm.get('password').valueChanges.subscribe(val => {
      if (val) {
        this.updateStrength(val);
      } else {
        this.passwordStrengthScore = 0;
      }
    });
  }

  onSubmit(credentialsForm) {
    console.log(credentialsForm.value);
    this.credentialsForm.reset();
    this.passwordStrength = '';
  }

  updateStrength(val) {
    this.passwordStrengthScore = zxcvbn(val).score;
    switch (this.passwordStrengthScore) {
      case 2:
        this.passwordStrength = 'weak';
        break;
      case 3:
        this.passwordStrength = 'middle';
        break;
      case 4:
        this.passwordStrength = 'strong';
        break;
      default:
        this.passwordStrength = 'invalid';
    }
  }

}
