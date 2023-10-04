import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };

  constructor() {}

  onLogin(loginForm: any) {
    // Implement your login logic here.
    // Access user's email and password from this.loginData
    // Send a request to your authentication service, e.g., an HTTP POST request to your server
    // Handle the response accordingly, e.g., redirect to a dashboard on successful login
    console.log('Login form submitted.');
  }
}
