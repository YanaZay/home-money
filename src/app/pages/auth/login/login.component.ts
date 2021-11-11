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
  public hide: boolean = true;
  public userError: boolean = false;
  public passwordError: boolean = false;
  public errorMessage: string = '';
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
          this.errorDelay('No such user was found.')
          return
        }
        if (this.form.value.password !== this.receivedUser.password) {
          this.errorDelay('Wrong password.');
          return;
        }
        if (this.form.value.password === this.receivedUser.password) {
          localStorage.setItem('user', JSON.stringify(this.receivedUser));
          this.router.navigate(['/page']);
        }
      });
    }
  }

  public errorDelay(message: string): void {
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
