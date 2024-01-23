import { Injectable } from '@angular/core';
import { Observable, delay, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isloggedIn: boolean = false;
  redirectUrl: string;

  login(name: string, password: string): Observable<boolean> {
    const isloggedIn = (name == "pikachu" && password == "pikachu");

    return of(isloggedIn).pipe(
      delay(1000),
      tap(isloggedIn => this.isloggedIn = isloggedIn)
    );

  }

  logout() {
    this.isloggedIn = false;
  }
}
