import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { delay, takeUntil } from 'rxjs/operators';
import { of, Subject } from 'rxjs';

import { AuthService } from '../auth.service';
import { IUserResponse } from '../../../shared/models/userResponse.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  @Output() public isAuth : EventEmitter<boolean> = new EventEmitter<boolean>();
  public form!: FormGroup;
  public done: boolean = false;
  public hide: boolean = true;
  public errorMessage: string = '';
  private receivedUser: IUserResponse | undefined;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.buildForm();
  }

  public buildForm(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
      this.done = !!params.done;
    });
    of(this.done).pipe(delay(3000)).subscribe( () => {this.done = false});
  }

  public login(): void {
    if (this.form.valid) {
      const email = this.form.value.email;
      this.authService.checkUser(email)
        .pipe(takeUntil(this.destroy$))
        .subscribe( (data:IUserResponse[]) => {
        this.receivedUser = data[0];
        if (this.receivedUser === undefined || this.receivedUser === null) {
          this.delayError('No such user was found.')
          return
        }
        if (this.form.value.password !== this.receivedUser.password) {
          this.delayError('Wrong password.');
          return;
        }
        if (this.form.value.password === this.receivedUser.password) {
          localStorage.setItem('user', JSON.stringify(this.receivedUser));
          this.router.navigate(['/page']);
        }
      });
    }
  }

  public delayError(message: string): void {
    this.errorMessage = message;
    of(this.errorMessage).pipe(delay(3000)).subscribe( () => {
      this.errorMessage = '';
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
