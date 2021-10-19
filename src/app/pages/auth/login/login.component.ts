import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { IUser } from '../../../user.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  public done: boolean = false;
  public userError: boolean = false;
  public hide: boolean = true;
  public passwordError: boolean = false;
  private receivedUser: IUser | undefined;

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
    setTimeout(() => {this.done = false}, 3000);
  }

  public login(): void {
    if (this.form.valid) {
      const email = this.form.value.email;
      this.authService.checkUser(email).subscribe( (data:IUser[]) => {
        this.receivedUser = data[0];
        if (this.receivedUser === undefined || this.receivedUser === null) {
          this.userError = true;
          setTimeout(() => {this.userError = false}, 5000);
          return
        }
        if (this.form.value.password !== this.receivedUser.password) {
          this.passwordError = true;
          setTimeout(() => {this.passwordError = false}, 5000);
          return;
        }
        if (this.form.value.password === this.receivedUser.password) {
          localStorage.setItem('user', JSON.stringify(this.receivedUser));
          this.router.navigate(['/page']);
        }
      });
    }
  }

  ngOnDestroy(): void {
  }
}
