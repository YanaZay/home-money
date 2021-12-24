import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

import { select, Store } from '@ngrx/store';

import { AuthService } from '../auth.service';
import { IUserResponse } from '../../../shared/models/userResponse.interface';
import { registerAction } from '../store/actions/register.action';
import { isSubmittingSelector } from '../store/selectors';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  // public done: boolean = false;
  public hide: boolean = true;
  public isSubmitting$!: Observable<boolean>;
  private receivedUser: IUserResponse | undefined;
  private destroy$: Subject<void> = new Subject<void>();

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
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]),
      user: new FormControl('', [Validators.required]),
      check: new FormControl (false, [Validators.requiredTrue])
    });
  }

  public registration(): void {
    if (this.form.valid) {
      const newUser = {...this.form.value};
      delete newUser.check;
      this.authService.addUser(newUser)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data:IUserResponse) => {
          this.receivedUser = data;
          // this.done = true;
          this.router.navigate(['/login'], {queryParams: {done: true}});
        }, error => console.log(error));

      this.store.dispatch(registerAction(newUser));
      this.authService.register(newUser)
        .subscribe((user: IUserResponse) => {
          console.log(user)
        });
    }
  }

  public isDisabled() {
    return !!(this.form.valid && this.isSubmitting$);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeValues() {
    this.isSubmitting$ = this.store
      .pipe(
        select(isSubmittingSelector)
      )
  }
}
