import { HttpClient,HttpHeaders } from "@angular/common/http";
import { IRegister } from "../../shared/model/user.register";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({ providedIn: "root" })
export class RegisterServices {
    private Register_Endpoint = "http://localhost:4600/api/createnewuser";
    public headers: HttpHeaders;
    constructor(private http: HttpClient) { 
        this.headers = new HttpHeaders({ "Content-Type": "application/json" });
    };
    UserRegister(data: IRegister):Observable<IRegister> {
        return this.http.post<IRegister>(this.Register_Endpoint, JSON.stringify(data), { headers: this.headers });
    }

}