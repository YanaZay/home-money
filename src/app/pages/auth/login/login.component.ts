import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { delay, takeUntil } from 'rxjs/operators';
import { of, Subject } from 'rxjs';

import { Store } from '@ngrx/store';

import { AuthService } from '../auth.service';
import { ICurrentUser } from '../../../shared/types/currentUser.interface';
import { loginAction } from '../store/actions/login.action';
import { ILoginRequest } from '../../../shared/types/loginRequest.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  @Output() public isAuth: EventEmitter<boolean> = new EventEmitter<boolean>();
  public form!: FormGroup;
  public done: boolean = false;
  public hide: boolean = true;
  public errorMessage: string = '';
  private destroy$: Subject<void> = new Subject<void>();
  private currentUser!: ICurrentUser;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  public ngOnInit(): void {
    this.buildForm();
  }

  public buildForm(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this.done = !!params.done;
      });
    of(this.done)
      .pipe(delay(3000))
      .subscribe(() => {
        this.done = false;
      });
  }

  public login(): void {
    if (this.form.valid) {
      const request: ILoginRequest = {
        email: this.form.value.email,
      };
      this.authService
        .checkUser(this.form.value.email)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: ICurrentUser[]) => {
          this.currentUser = data[0];
          if (this.currentUser === undefined || this.currentUser === null) {
            this.delayError('No such user was found.');
            return;
          }
          if (this.form.value.password !== this.currentUser.password) {
            this.delayError('Wrong password.');
            return;
          }
          if (this.form.value.password === this.currentUser.password) {
            this.store.dispatch(loginAction({ request }));
          }
        });
    }
  }

  public delayError(message: string): void {
    this.errorMessage = message;
    of(this.errorMessage)
      .pipe(delay(3000))
      .subscribe(() => {
        this.errorMessage = '';
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
