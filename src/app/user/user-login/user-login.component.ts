import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/model/login';
import { AlertifyService } from 'src/app/Service/alertify.service';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  loginForm!: FormGroup;
  userSubmitted!: boolean;
  login!: Login;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private alertify: AlertifyService,
    private router : Router
  ) {}

  ngOnInit(): void {
    // this.registerationForm = new FormGroup(
    //   {
    //     userName: new FormControl(null, Validators.required),
    //     email: new FormControl(null, [Validators.required, Validators.email]),
    //     password: new FormControl(null, [
    //       Validators.required,
    //       Validators.minLength(8),
    //     ]),
    //     confirmPassword: new FormControl(null, Validators.required),
    //     mobile: new FormControl(null, [
    //       Validators.required,
    //       Validators.minLength(10),
    //     ]),
    //   },
    //   this.passwordMatchingValidator
    // );
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      userName: new FormControl(null, Validators.required),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  loginData(): Login {
    return (this.login = {
      userName: this.userName.value,
      password: this.password.value,
    });
  }
  //.....................................
  // Getter method for all forms controls
  //......................................

  get userName() {
    return this.loginForm.get('userName') as FormControl;
  }
  get password() {
    return this.loginForm.get('password') as FormControl;
  }

  onLogin() {
    console.log(this.loginForm);
    this.userSubmitted = true;
    if (this.loginForm.valid) {
      //this.login = Object.assign(this.login , this.loginForm.value);
      const token = this.authService.authUser(this.loginData());
      this.loginForm.reset();
      this.userSubmitted = false;
      if (token) {
        localStorage.setItem('token', token.userName);
        this.alertify.success('loggedin successfully');
        this.router.navigate(['/']);
      } else {
        this.alertify.error('Opps! check your credentials');
      }
    } else {
      this.alertify.error('Opps! please fill required fields');
    }
  }
}
