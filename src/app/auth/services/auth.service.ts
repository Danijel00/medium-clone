import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { RegisterRequestInterface } from '../types/registerRequest.interface'
import { map, Observable } from 'rxjs'
import { AuthResponseInterface } from '../types/authResponse.interface'
import { LoginRequestInterface } from '../types/loginRequest.interface'
import { CurrentUserInterface } from '../../shared/types/currentUser.interface'
import { environment } from '../../../environments/environment.development'
import { CurrentUserRequestInterface } from '../../shared/types/currentUserRequest.interface'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) { }

  getUser(response: AuthResponseInterface): CurrentUserInterface {
    return response.user
  }

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const fullUrl = `${environment.API_URL}/users`
    return this.http
      .post<AuthResponseInterface>(fullUrl, data)
      .pipe(map(this.getUser))
  }

  login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    const fullUrl = `${environment.API_URL}/users/login`
    return this.http
      .post<AuthResponseInterface>(fullUrl, data)
      .pipe(map(this.getUser))
  }

  getCurrentUser(): Observable<CurrentUserInterface> {
    const fullUrl = `${environment.API_URL}/user`
    return this.http.get<AuthResponseInterface>(fullUrl).pipe(map(this.getUser))
  }

  updateCurrentUser(
    currentUserRequest: CurrentUserRequestInterface
  ): Observable<CurrentUserInterface> {
    const fullUrl = `${environment.API_URL}/user`
    return this.http.put<AuthResponseInterface>(fullUrl, currentUserRequest)
      .pipe(map(this.getUser))
  }
}
