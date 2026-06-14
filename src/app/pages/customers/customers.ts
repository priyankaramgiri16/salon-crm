import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './customers.html',
  styleUrl: './customers.css'
})
export class Customers {

  customers: any[] = [
    {
      id: 1,
      name: 'Priya Sharma',
      mobile: '9876543210',
      email: 'priya@gmail.com'
    },
    {
      id: 2,
      name: 'Rahul Patil',
      mobile: '9123456780',
      email: 'rahul@gmail.com'
    }
  ];

  selectedCustomerId: number | null = null;

  newCustomer = {
    name: '',
    mobile: '',
    email: ''
  };

  constructor() {

    const savedCustomers = localStorage.getItem('customers');

    if (savedCustomers) {
      this.customers = JSON.parse(savedCustomers);
    }
  }

  addCustomer() {

    const nameRegex = /^[A-Za-z ]+$/;

    if (!this.newCustomer.name.trim()) {
      alert('Customer Name is required');
      return;
    }

    if (!nameRegex.test(this.newCustomer.name)) {
      alert('Name should contain only letters');
      return;
    }

    if (!/^\d{10}$/.test(this.newCustomer.mobile)) {
      alert('Mobile Number must be exactly 10 digits');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(this.newCustomer.email)) {
      alert('Enter a valid Email Address');
      return;
    }

    if (this.selectedCustomerId) {

      const index = this.customers.findIndex(
        customer => customer.id === this.selectedCustomerId
      );

      this.customers[index] = {
        id: this.selectedCustomerId,
        ...this.newCustomer
      };

      this.selectedCustomerId = null;

    } else {

      this.customers.push({
        id: this.customers.length > 0
        ? Math.max(...this.customers.map(c => c.id)) + 1
        : 1,
        ...this.newCustomer
      });
    }

    this.saveCustomers();

    this.newCustomer = {
      name: '',
      mobile: '',
      email: ''
    };
  }

  editCustomer(customer: any) {

    this.selectedCustomerId = customer.id;

    this.newCustomer = {
      name: customer.name,
      mobile: customer.mobile,
      email: customer.email
    };
  }

deleteCustomer(id: number) {

  if (confirm('Are you sure you want to delete this customer?')) {

    this.customers = this.customers.filter(
      customer => customer.id !== id
    );

    // Reassign IDs
    this.customers.forEach((customer, index) => {
      customer.id = index + 1;
    });

    this.saveCustomers();
  }
}

  saveCustomers() {

    localStorage.setItem(
      'customers',
      JSON.stringify(this.customers)
    );
  }
}