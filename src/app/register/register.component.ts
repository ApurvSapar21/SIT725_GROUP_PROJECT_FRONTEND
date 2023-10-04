import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  registrationData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(private router: Router) {}

  onRegister(form: NgForm) {
    if (form.valid) {
      // Implement your registration logic here
      // Example: this.userService.register(this.registrationData).subscribe(
      //   (response) => {
      //     // Registration successful, navigate to another page
      //     this.router.navigate(['/dashboard']);
      //   },
      //   (error) => {
      //     // Handle registration error
      //   }
      // );

      // Simulate navigation to another page after successful registration
      this.router.navigate(['/dashboard']);
    }
  }
}
