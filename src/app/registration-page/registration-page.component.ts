import { Component } from '@angular/core';
import {AF} from "../../providers/af";
import {Router} from "@angular/router";
@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent {
  public error: any;
  constructor(private afService: AF, private router: Router) { }
	//registers the user and logs them in
  register(event, name, email, password) {
    event.preventDefault();
    this.afService.registerUser(email, password).then((user) => {
      this.afService.saveUserInfoFromForm(user.uid, name, email).then(() => {
        this.router.navigate(['']);
      })
        .catch((error) => {
          this.error = error;
        });
    })
      .catch((error) => {
        this.error = error;
        console.log(this.error);
      });

  }
  <div *ngIf="error" class="alert alert-warning" role="alert">
  <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
  <span class="sr-only">Error:</span>
  {{error}}
</div>
<div class="modal-dialog">
  <div class="registermodal-container">
    <h1>Register</h1><br>
    <form class="form-signin" (submit)="register($event, name.value, email.value, password.value)">
      <label for="name" class="sr-only">Name</label>
      <input #name type="text" id="name" class="form-control" placeholder="Name" required="">
      <label for="email" class="sr-only">Email address</label>
      <input #email type="email" id="email" class="form-control" placeholder="Email address" required="" autofocus="">
      <label for="inputPassword" class="sr-only">Password</label>
      <input #password type="password" id="inputPassword" class="form-control" placeholder="Password" required="">
      <br>
      <button  class="btn btn-md btn-primary btn-block" type="submit">Register</button>
    </form>
  </div
></div>
}