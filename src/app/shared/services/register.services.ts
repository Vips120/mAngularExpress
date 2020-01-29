import { HttpClient,HttpHeaders } from "@angular/common/http";
import { IRegister, Ilogin } from "../../shared/model/user.register";
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from "rxjs/operators";
@Injectable({ providedIn: "root" })
export class RegisterServices {
    private Register_Endpoint = "http://localhost:4600/api/createnewuser";
    private Login_ENDPOINT = "http://localhost:4600/api/auth";
    private LoggedIn_ENDPOINT = "http://localhost:4600/api/me";
    public headers: HttpHeaders;
    public loggin = new BehaviorSubject(JSON.parse(localStorage.getItem("currentuser")));
    public loggedInuser = this.loggin.asObservable();
    constructor(private http: HttpClient) { 
        this.headers = new HttpHeaders({ "Content-Type": "application/json" });
    };
    UserRegister(data: IRegister):Observable<IRegister> {
        return this.http.post<IRegister>(this.Register_Endpoint, JSON.stringify(data), { headers: this.headers });
    };
    UserLogin(data: Ilogin):Observable<Ilogin> {
        return this.http.post<Ilogin>(this.Login_ENDPOINT, JSON.stringify(data), { headers: this.headers }).pipe(map((item:any) => {
            if (item && item.token) {
                localStorage.setItem("usertoken", JSON.stringify(item.token));
             
            } else {
                return item;
            }
        }))
    };

    LoggedInUser() {
        let token = JSON.parse(localStorage.getItem("usertoken"));
        this.headers = new HttpHeaders({ "Content-Type": "application/json" , "x-auth-token": token });
        return this.http.get(this.LoggedIn_ENDPOINT, { headers: this.headers })
            .pipe(map((data: any) => {
                if (data && data._id) {
                    // alert(JSON.stringify(data));
                    localStorage.setItem("currentuser", JSON.stringify(data));
                    this.loggin.next(data);
                } else {
                    return data;
                    }
        }));
    };
    Logout() {
        localStorage.removeItem("currentuser");
        localStorage.removeItem("usertoken");
        this.loggin.next(null);
    
   }

}