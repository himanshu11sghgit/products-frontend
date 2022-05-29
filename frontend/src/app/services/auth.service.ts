import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public currentUser: any;
    private userSubject: BehaviorSubject<any>;
    public user: Observable<any>;

    constructor(
        private apiService: ApiService,
    ) {
    }

    isAuthenticated() {
        const token = localStorage.getItem('auth_token');
        if(token && token != '') return true;
        return false;
    }


    clearData() {
        localStorage.clear();
    }
}
