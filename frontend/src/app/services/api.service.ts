import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  private setHeaders() {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'});
    const token = localStorage.getItem('auth_token');
    if (token !== null) {
      headers = headers.set('Authorization', 'Token ' + token);
    }
    return headers;
  }

  get(path: string): Observable<any>{
    const url = environment.api_url + '/' + path;

    return this.http.get<any>(url, {headers: this.setHeaders()}).pipe(map((res: Response) => res), catchError((error: Response) => throwError(error)));
  }

  post(path: string, body: any): Observable<any>{
    const url = environment.api_url + '/' + path;
    return this.http.post<any>(url, body, {headers: this.setHeaders()}).pipe(map((res: Response) => res), catchError((error: Response) => throwError(error)));
  }

}
