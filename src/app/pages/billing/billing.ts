import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './billing.html',
  styleUrls: ['./billing.css']
})
export class Billing implements OnInit {

  appointment: any;

  amount = 0;
  tax = 0;
  discount = 100;
  total = 0;

  ngOnInit() {

    const billData =
      localStorage.getItem('selectedBillAppointment');

    if (billData) {

      this.appointment =
        JSON.parse(billData);

      this.calculateBill();
    }
  }

  calculateBill() {

    const services =
      JSON.parse(
        localStorage.getItem('services') || '[]'
      );

    const selectedService =
      services.find(
        (s: any) =>
          s.name === this.appointment.service
      );

    this.amount =
      selectedService?.price || 1000;

    this.tax =
      Math.round(this.amount * 0.18);

    this.total =
      this.amount +
      this.tax -
      this.discount;

    this.saveBill();
  }

  saveBill() {

    const bills =
      JSON.parse(
        localStorage.getItem('bills') || '[]'
      );

    const alreadyExists =
      bills.some(
        (bill: any) =>
          bill.customer === this.appointment.customer &&
          bill.date === this.appointment.date &&
          bill.time === this.appointment.time
      );

    if (!alreadyExists) {

      bills.push({

        customer:
          this.appointment.customer,

        service:
          this.appointment.service,

        staff:
          this.appointment.staff,

        amount:
          this.amount,

        tax:
          this.tax,

        discount:
          this.discount,

        total:
          this.total,

        date:
          this.appointment.date,

        time:
          this.appointment.time

      });

      localStorage.setItem(
        'bills',
        JSON.stringify(bills)
      );
    }
  }

  printBill() {
    window.print();
  }

  shareBill() {

    const text = `
Salon CRM Bill

Client: ${this.appointment.customer}
Service: ${this.appointment.service}
Staff: ${this.appointment.staff}

Amount: ₹${this.amount}
Tax: ₹${this.tax}
Discount: ₹${this.discount}

Total: ₹${this.total}
`;

    navigator.clipboard.writeText(text);

    alert('Bill copied for sharing');
  }

}