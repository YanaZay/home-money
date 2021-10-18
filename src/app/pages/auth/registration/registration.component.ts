import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { IUser } from '../../../user.interface';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public form!: FormGroup;
  public done: boolean = false;
  private receivedUser: IUser | undefined;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

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
      const newUser = {...this.form.value};
      delete newUser.check;
      this.authService.addUser(newUser).subscribe((data:IUser) => {
        this.receivedUser = data;
        this.done = true;
        this.router.navigate(['/login'], {queryParams: {done: true}});
      }, error => console.log(error));
    }
  }
}
