
import { ApplicationUserCreate } from './../models/account/application-user-create.model';
import { ApplicationUserLogin } from './../models/account/application-user-login.model';
import { HttpClient } from '@angular/common/http';
import { ApplicationUser } from './../models/account/application-user.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private currentUserSubject$: BehaviorSubject<ApplicationUser>;

  constructor(private http: HttpClient) {
    this.currentUserSubject$ = new BehaviorSubject<ApplicationUser>(
      JSON.parse(localStorage.getItem('blogLab-currentUser'))
    );
  }

  public isLoggedIn(){
    const currentUser= this.currentUserValue;
    const isLoggedIn= !!currentUser && !!currentUser.token;
    return isLoggedIn;
  }
  public givenUserIsLoggedIn(username: string) {
    return this.isLoggedIn() && this.currentUserValue.username === username;
  }

  login(model: ApplicationUserLogin): Observable<ApplicationUser> {
    return this.http.post(`${environment.webApi}/Account/login`, model).pipe(
      map((user: ApplicationUser) => {
        if (user) {
          localStorage.setItem('blogLab-currentUser', JSON.stringify(user));
          this.setCurrentUser(user);
        }
        return user;
      })
    );
  }

  public get currentUserValue():ApplicationUser{
    return this.currentUserSubject$.value;
  }


  setCurrentUser(user: ApplicationUser) {
    this.currentUserSubject$.next(user);
  }
  logout(){
    localStorage.removeItem('blogLab-currentUser');
    this.currentUserSubject$.next(null);
  }


  register(model: ApplicationUserCreate): Observable<ApplicationUser> {
    return this.http.post(`${environment.webApi}/Account/register`, model).pipe(
      map((user: ApplicationUser) => {
        if (user) {
          localStorage.setItem('blogLab-currentUser', JSON.stringify(user));
          this.setCurrentUser(user);
        }
        return user;
      })
    );
  }


}
