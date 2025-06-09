import {Component, inject, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {CardModule} from "primeng/card";
import {TabViewModule} from "primeng/tabview";
import {PasswordModule} from "primeng/password";
import {ButtonDirective} from "primeng/button";
import {FormsModule} from "@angular/forms";
import {AuthService} from "../auth.service";
import {InputTextModule} from "primeng/inputtext";

@Component({
  selector: 'app-login-register',
  standalone: true,
  imports: [
    CardModule,
    TabViewModule,
    PasswordModule,
    ButtonDirective,
    FormsModule,
    InputTextModule
  ],
  templateUrl: './login-register.component.html',
  styleUrl: './login-register.component.css'
})
export class LoginRegisterComponent implements OnInit {
  activeIndex = 0;

  loginData = {email: '', password: ''};
  registerData = {username: '', firstname: '', email: '', password: ''};


  protected authService = inject(AuthService);

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
    const token = this.authService.getToken();
    if (token) this.router.navigate(['/home']);
  }

  login() {
    /*this.http.post<{ token: string }>('/token', this.loginData).subscribe({
      next: res => {
        localStorage.setItem('jwt', res.token);
        this.router.navigate(['/home']);
      }
    });*/
    this.authService.login(this.loginData.email, this.loginData.password);
  }

  register() {
    /*this.http.post('/account', this.registerData).subscribe({
      next: () => {
        this.activeIndex = 0; // switch to login tab
      }
    });*/
    this.authService.register(this.registerData);
    this.activeIndex = 0;
  }
}
