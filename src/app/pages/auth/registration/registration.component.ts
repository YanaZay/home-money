import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { IUser } from '../../../shared/models/user.interface';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  public done: boolean = false;
  public hide: boolean = true;
  private receivedUser: IUser | undefined;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  public ngOnInit(): void {
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
        .subscribe((data:IUser) => {
        this.receivedUser = data;
        this.done = true;
        this.router.navigate(['/login'], {queryParams: {done: true}});
      }, error => console.log(error));
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
