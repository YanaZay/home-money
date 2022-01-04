import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { select, Store } from '@ngrx/store';

import { AuthService } from '../auth.service';
import { registerAction } from '../store/actions/register.action';
import { isSubmittingSelector } from '../store/selectors';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  public form!: FormGroup;
  public hide: boolean = true;
  public isSubmitting$!: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store
  ) {}

  public ngOnInit(): void {
    this.buildForm();
    this.initializeValues();
  }

  public buildForm(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
      ]),
      user: new FormControl('', [Validators.required]),
      check: new FormControl(false, [Validators.requiredTrue]),
    });
  }

  public registration(): void {
    if (this.form.valid) {
      delete this.form.value.check;
      const request = { ...this.form.value };
      this.store.dispatch(registerAction({ request }));
    }
  }

  public isDisabled(): boolean {
    return !!(this.form.valid && this.isSubmitting$);
  }

  private initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
  }
}
