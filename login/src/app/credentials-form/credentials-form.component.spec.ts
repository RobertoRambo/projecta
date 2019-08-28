import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CredentialsFormComponent } from './credentials-form.component';

describe('CredentialsFormComponent', () => {
  let component: CredentialsFormComponent;
  let fixture: ComponentFixture<CredentialsFormComponent>;
  const initialCredentials = {email: '', password: '', passwordStrengthScore: 0};
  const blankEmailCredentials = {email: '', password: '12345', passwordStrengthScore: 4};
  const blankPasswordCredentials = {email: 'test', password: '', passwordStrengthScore: 4};
  const invalidPasswordCredentials = {email: 'test', password: '23232', passwordStrengthScore: 1};
  const weakdPasswordCredentials = {email: 'test', password: '1234DAsfa', passwordStrengthScore: 2};
  const middlePasswordCredentials = {email: 'test', password: '232ÄBmD@da', passwordStrengthScore: 3};
  const strongPasswordCredentials = {email: 'test', password: '232ÄBmD@dasadafa32', passwordStrengthScore: 4};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CredentialsFormComponent
      ],
      imports: [
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredentialsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function updateCredentials(credentials) {
    component.credentialsForm.controls.email.setValue(credentials.email);
    component.credentialsForm.controls.password.setValue(credentials.password);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('init email should be blank', () => {
    expect(component.credentialsForm.controls.email.value).toEqual(initialCredentials.email);
  });

  it('init password should be blank', () => {
    expect(component.credentialsForm.controls.password.value).toEqual(initialCredentials.password);
  });

  it('init password strength score should be blank', () => {
    expect(component.credentialsForm.controls.passwordStrengthScore.value).toEqual(initialCredentials.passwordStrengthScore);
  });

  it('form should be invalid for blank email', () => {
    updateCredentials(blankEmailCredentials);
    expect(component.credentialsForm.valid).toBeFalsy();
  });

  it('form should be invalid for blank password', () => {
    updateCredentials(blankPasswordCredentials);
    expect(component.credentialsForm.valid).toBeFalsy();
  });

  it('form should be invalid for password strength score lower 2', () => {
    updateCredentials(invalidPasswordCredentials);
    expect(component.credentialsForm.valid).toBeFalsy();
  });

  it('form should be valid for password strength score = 2 and email and weak password set', () => {
    updateCredentials(weakdPasswordCredentials);
    expect(component.credentialsForm.valid).toBeTruthy();
    expect(component.passwordStrength).toEqual('weak');
  });

  it('form should be valid for password strength score = 3 and email and middle password set', () => {
    updateCredentials(middlePasswordCredentials);
    expect(component.credentialsForm.valid).toBeTruthy();
    expect(component.passwordStrength).toEqual('middle');
  });

  it('form should be valid for password strength score = 4 and email and strong password set', () => {
    updateCredentials(strongPasswordCredentials);
    expect(component.credentialsForm.valid).toBeTruthy();
    expect(component.passwordStrength).toEqual('strong');
  });
});
