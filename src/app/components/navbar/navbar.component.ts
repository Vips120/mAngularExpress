import { Component, OnInit } from '@angular/core';
import { RegisterServices } from 'src/app/shared/services/register.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public currentUser;
  constructor(private registerUser: RegisterServices, private router: Router) { }

  ngOnInit() {
     this.registerUser.loggedInuser.subscribe(data => {
      alert(JSON.stringify(data));
      this.currentUser = data;
      console.log(this.currentUser);
    })
  };
  Logout() {
    this.registerUser.Logout();
    this.router.navigateByUrl("/login");
  }

}
