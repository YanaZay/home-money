import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { IUser } from '../../../shared/models/user.interface';
import { ActivatedRoute, Router } from '@angular/router';
import {delay, takeUntil} from 'rxjs/operators';
import { of, Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  @Output() public isAuth : EventEmitter<boolean> = new EventEmitter<boolean>();
  public form!: FormGroup;
  public done: boolean = false;
  public userError: boolean = false;
  public hide: boolean = true;
  public passwordError: boolean = false;
  private receivedUser: IUser | undefined;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
    this.route.queryParams.subscribe(params => {
      this.done = !!params.done;
    });
    of(this.done).pipe(delay(3000)).subscribe( () => {this.done = false});
  }

  public login(): void {
    if (this.form.valid) {
      const email = this.form.value.email;
      this.authService.checkUser(email)
        .pipe(takeUntil(this.destroy$))
        .subscribe( (data:IUser[]) => {
        this.receivedUser = data[0];
        if (this.receivedUser === undefined || this.receivedUser === null) {
          this.userError = true;
          of(this.userError).pipe(delay(3000)).subscribe( () => {this.userError = false});
          return
        }
        if (this.form.value.password !== this.receivedUser.password) {
          this.passwordError = true;
          of(this.passwordError).pipe(delay(3000)).subscribe( () => {this.passwordError = false});
          return;
        }
        if (this.form.value.password === this.receivedUser.password) {
          localStorage.setItem('user', JSON.stringify(this.receivedUser));
          this.router.navigate(['/page']);
        }
      });
    }
  }

  // public errorDelay(value: boolean): void {
  //   if () {
  //     this.userError = true;
  //     of(this.userError).pipe(delay(3000)).subscribe( () => {this.userError = false});
  //     return
  //   }
  //   if (this.passwordError == value) {
  //     this.passwordError = true;
  //     of(this.passwordError).pipe(delay(3000)).subscribe( () => {this.passwordError = false});
  //     return
  //   }
  // }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
