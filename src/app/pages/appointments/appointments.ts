import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './appointments.html',
  styleUrls: ['./appointments.css']
})
export class AppointmentsComponent implements OnInit {

  appointments: any[] = [];

  availableServices: string[] = [];

  newAppointment = {
    customer: '',
    phone: '',
    staff: '',
    service: '',
    date: '',
    time: '',
    notes: '',
    status: 'Pending'
  };

  ngOnInit(): void {

    const data = localStorage.getItem('appointments');

    if (data) {
      this.appointments = JSON.parse(data);
    }

    const selectedSlot = localStorage.getItem('selectedSlot');

    if (selectedSlot) {

      const slot = JSON.parse(selectedSlot);

      this.newAppointment.date = slot.date;
      this.newAppointment.time = slot.time;
      this.newAppointment.staff = slot.staff;

      this.loadServicesByStaff(slot.staff);

      localStorage.removeItem('selectedSlot');
    }
  }

  loadServicesByStaff(staffName: string) {

    if (staffName === 'Riya') {

      this.availableServices = [
        'Hair Cutting',
        'Hair Spa',
        'Hair Coloring',
        'Hair Styling'
      ];

    } else if (staffName === 'Pallavi') {

      this.availableServices = [
        'Facial',
        'Manicure',
        'Pedicure',
        'Waxing'
      ];

    } else if (staffName === 'Tejas') {

      this.availableServices = [
        'Hair Treatment',
        'Hair Smoothening',
        'Hair Spa'
      ];

    } else {

      this.availableServices = [];
    }

    this.newAppointment.service = '';
  }

  bookAppointment() {

    if (
      !this.newAppointment.customer ||
      this.newAppointment.phone.length !== 10 ||
      !this.newAppointment.service ||
      !this.newAppointment.date ||
      !this.newAppointment.time
    ) {
      alert('Please enter valid details');
      return;
    }

    this.appointments.push({
      id:
        this.appointments.length > 0
          ? Math.max(...this.appointments.map(x => x.id)) + 1
          : 1,
      ...this.newAppointment
    });

    this.saveAppointments();

    alert('Appointment Booked Successfully');

    this.newAppointment = {
      customer: '',
      phone: '',
      staff: '',
      service: '',
      date: '',
      time: '',
      notes: '',
      status: 'Pending'
    };

    this.availableServices = [];
  }

  editAppointment(appointment: any) {

    const newService = prompt(
      'Edit Service',
      appointment.service
    );

    if (newService) {

      appointment.service = newService;

      this.saveAppointments();
    }
  }

  viewAppointment(appointment: any) {

    alert(
`Appointment Details

Client: ${appointment.customer}
Phone: ${appointment.phone}
Staff: ${appointment.staff}
Service: ${appointment.service}
Date: ${appointment.date}
Time: ${appointment.time}
Status: ${appointment.status}
Notes: ${appointment.notes}`
    );
  }

  rescheduleAppointment(appointment: any) {

    const newDate = prompt(
      'Enter New Date (YYYY-MM-DD)',
      appointment.date
    );

    const newTime = prompt(
      'Enter New Time',
      appointment.time
    );

    if (newDate && newTime) {

      appointment.date = newDate;
      appointment.time = newTime;

      this.saveAppointments();

      alert('Appointment Rescheduled');
    }
  }

  shareAppointment(appointment: any) {

    const message =
`Salon Appointment

Client: ${appointment.customer}
Phone: ${appointment.phone}
Staff: ${appointment.staff}
Service: ${appointment.service}
Date: ${appointment.date}
Time: ${appointment.time}`;

    navigator.clipboard.writeText(message);

    alert(
      'Appointment copied to clipboard.\nReady to share with client or staff.'
    );
  }

  deleteAppointment(id: number) {

    if (confirm('Delete Appointment?')) {

      this.appointments =
        this.appointments.filter(
          x => x.id !== id
        );

      this.saveAppointments();

      alert('Appointment Deleted');
    }
  }

  generateBill(appointment: any) {

    localStorage.setItem(
      'selectedBillAppointment',
      JSON.stringify(appointment)
    );

    window.location.href = '/billing';
  }

  saveAppointments() {

    localStorage.setItem(
      'appointments',
      JSON.stringify(this.appointments)
    );

    const completedAppointment =
      this.appointments.find(
        x => x.status === 'Completed'
      );

    if (completedAppointment) {

      localStorage.setItem(
        'billAppointment',
        JSON.stringify(completedAppointment)
      );

    }
  }
}