import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenKey = 'token';
  private readonly isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private readonly http: HttpClient, private readonly router: Router) {
  }

  login(email: string, password: string) {
    return this.http.post<{ token: string }>('http://localhost:8080/token', {email, password}).subscribe({
      next: (res) => {
        localStorage.setItem(this.tokenKey, res.token);
        this.isAuthenticatedSubject.next(true);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Login failed', err);
        alert('Invalid credentials');
      }
    });
  }

  register(data: { username: string; firstname: string; email: string; password: string }) {
    return this.http.post<{ token: string }>('http://localhost:8080/account', data).subscribe({
      next: (res) => {
        localStorage.setItem(this.tokenKey, res.token);
        this.isAuthenticatedSubject.next(true);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Registration failed', err);
        alert('Could not register');
      }
    });
  }

  isLoggedIn(): boolean {
    return this.hasToken();
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}
