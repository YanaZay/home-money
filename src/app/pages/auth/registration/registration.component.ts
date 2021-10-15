import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public form!: FormGroup;

  constructor(
    // private authService: AuthService
  )
  {}

  public ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]),
      user: new FormControl('', [Validators.required]),
      check: new FormControl (false, [Validators.requiredTrue])
    });
  }

  public registration(): void {
    if (this.form.valid) {
      const user = {...this.form.value};
      delete user.check;
      // this.authService.postUser(user);
    }
  }
}
