import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {

  email = '';
  password = '';

  constructor(private router: Router) {}

  ngOnInit(): void {

    const loggedIn = localStorage.getItem('loggedIn');

    if (loggedIn === 'true') {
      this.router.navigate(['/dashboard']);
    }

  }

  login() {

    if (!this.email || !this.password) {

      alert('Please enter Email and Password');
      return;

    }

    const savedPassword =
      localStorage.getItem('adminPassword') || 'admin@16';

    if (
      this.email === 'admin@salon.com' &&
      this.password === savedPassword
    ) {

      localStorage.setItem('loggedIn', 'true');

      localStorage.setItem(
        'userName',
        this.email.split('@')[0]
      );

      this.router.navigate(['/dashboard']);

    } else {

      alert('Invalid Email or Password');

    }

  }
}