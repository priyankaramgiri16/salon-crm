  import { Component, OnInit } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { RouterModule, Router } from '@angular/router';

  @Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './dashboard.html',
    styleUrls: ['./dashboard.css']
  })
  export class Dashboard implements OnInit {

    userName = '';
    showProfileMenu = false;

    customerCount = 0;
    appointmentCount = 0;
    serviceCount = 0;
    revenue = 0;

    constructor(private router: Router) {}

    ngOnInit(): void {

      const loggedIn =
        localStorage.getItem('loggedIn');

      if (loggedIn !== 'true') {

        this.router.navigate(['/']);
        return;

      }

      this.userName =
        localStorage.getItem('userName') || 'Admin';

      this.loadDashboardStats();
    }

    loadDashboardStats() {

      const customers =
        JSON.parse(localStorage.getItem('customers') || '[]');

      const appointments =
        JSON.parse(localStorage.getItem('appointments') || '[]');

      const services =
        JSON.parse(localStorage.getItem('services') || '[]');

      const bills =
        JSON.parse(localStorage.getItem('bills') || '[]');

      this.customerCount = customers.length;

      this.appointmentCount = appointments.length;

      this.serviceCount = services.length;

      this.revenue = bills.reduce(
        (total: number, bill: any) =>
          total + (bill.total || 0),
        0
      );
    }

    toggleProfile() {

      this.showProfileMenu =
        !this.showProfileMenu;
    }

    changePassword() {

      const currentPassword = prompt(
        'Enter Current Password'
      );

      const savedPassword =
        localStorage.getItem('adminPassword') || 'admin@16';

      if (currentPassword !== savedPassword) {

        alert('Current Password Incorrect');
        return;
      }

      const newPassword = prompt(
        'Enter New Password'
      );

      if (!newPassword) {
        return;
      }

      localStorage.setItem(
        'adminPassword',
        newPassword
      );

      alert('Password Changed Successfully');
    }

    logout() {

      localStorage.removeItem('loggedIn');
      localStorage.removeItem('userName');

      this.router.navigate(['/']);
    }

    logoutFromLogo() {

      if (confirm('Logout from Salon CRM?')) {

        localStorage.removeItem('loggedIn');
        localStorage.removeItem('userName');

        this.router.navigate(['/']);
      }
    }
  }