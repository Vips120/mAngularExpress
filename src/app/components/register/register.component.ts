import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IRegister } from "../../shared/model/user.register";
import { RegisterServices } from 'src/app/shared/services/register.services';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public userForm: FormGroup;
  public submitted: boolean = false;
  constructor(private FB: FormBuilder, private userRegisterServices: RegisterServices) { }

  ngOnInit() {
    this.userForm = this.FB.group({
      "FirstName": ['', [Validators.required]],
      "LastName": ["", [Validators.required]],
      "Address": ["", [Validators.required]],
      "UserLogin": this.FB.group({
        "EmailId": ["", [Validators.required]],
        "Password": ["", [Validators.required]]
      })
    })
  };

  SubmitForm(data: IRegister) {
    this.submitted = true;
    if (!this.userForm.valid) {
      return;
   }
    console.log(data);
    this.userRegisterServices.UserRegister(data).subscribe(item => {
      alert("Registration done!")
      console.log(item);
    })

  }

}
