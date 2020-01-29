import { Component, OnInit } from '@angular/core';
import {Validators,FormGroup, FormBuilder } from "@angular/forms";
import { Ilogin } from 'src/app/shared/model/user.register';
import { RegisterServices } from 'src/app/shared/services/register.services';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginbyuser: FormGroup;
  public submitted: boolean = false;
  constructor(private fb: FormBuilder, private reigsterServices: RegisterServices, private router: Router) { }

  ngOnInit() {
    this.loginbyuser = this.fb.group({
      "UserLogin": this.fb.group({
        "EmailId": ["", Validators.required],
        "Password": ["", Validators.required]
      })
    })
  };
  LoginUser(data: Ilogin) {
    this.submitted = true;
    if (!this.loginbyuser.valid) { return; }
    // console.log(data);
    this.reigsterServices.UserLogin(data).subscribe(item => {
      alert("login successful");
      this.router.navigateByUrl("/home");   
    })
  }


}
